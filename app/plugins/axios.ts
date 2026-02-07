import axios from "axios";
import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.request.use((request) => {
    return request;
  });

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

  api.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err),
  );

  return {
    provide: {
      axios: api,
    },
  };
});
