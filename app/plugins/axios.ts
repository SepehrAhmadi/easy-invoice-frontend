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
    return config;
  });

  // get access token and handle redirects , difrrent status codes
  let isRefreshing = false;
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config;

      // Get accessToken with refresh API if get status 401 (runs only once)
      if (
        status == 401 &&
        !isRefreshing &&
        !originalRequest._retry &&
        !error.config.url.includes("/auth") &&
        !error.config.url.includes("/logout") &&
        !error.config.url.includes("/refresh")
      ) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const res = await api.get("/refresh", { withCredentials: true });
          isRefreshing = false;
          useCookie("token").value = res.data.accessToken;
          return api(error.config);
        } catch (e) {
          isRefreshing = false;
          useCookie("token").value = null;
          handlerStore.setUnauthorized();
          return Promise.reject(e);
        }
      }

      // if get status 403 redirect to 403 page
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
