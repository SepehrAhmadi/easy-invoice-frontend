import axios from "axios";
import { useHandlerStore } from "~/store/handler";
import { useLanguageStore } from "~/store/language";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const langStore = useLanguageStore();
  const handlerStore = useHandlerStore();

  if (process.client) {
    langStore.initLang?.();
  }

  const api = axios.create({
    baseURL: config.public.API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // change Accept-Language value depend site language
  api.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = langStore.currentLang;
    config.headers["Authorization"] = "Bearer " + useCookie("token").value;
    return config;
  });

  // get access token and handle redirects , difrrent status codes
  interface FailedRequest {
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }
  let isRefreshing = false;
  let failedQueue: FailedRequest[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else if (token) {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (
        status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth") &&
        !originalRequest.url.includes("/logout") &&
        !originalRequest.url.includes("/refresh")
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await axios.get(
              `${config.public.API_URL}refresh`,
              {
                withCredentials: true,
              },
            );

            const newToken = data.accessToken;

            useCookie("token").value = newToken;
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            processQueue(null, newToken);

            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          } catch (err) {
            processQueue(err, null);
            useCookie("token").value = null;
            handlerStore.setUnauthorized();
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }

      if (status === 403) {
        handlerStore.setForbidden();
      }

      if (error.response?.data?.redirect) {
        handlerStore.setRedirect(error.response.data.redirect);
      }

      return Promise.reject(error);
    },
  );

  return {
    provide: {
      axios: api,
    },
  };
});
