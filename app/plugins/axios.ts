import axios from "axios";

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

  // Get accessToken with refresh API (runs only once)
  let isRefreshing = false;
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error.response?.status;
      if (
        (status == 401 || status == 403) &&
        !isRefreshing &&
        !error.config.url.includes("/refresh")
      ) {
        isRefreshing = true;
        try {
          const res = await api.get("/refresh", { withCredentials: true });
          isRefreshing = false;
          useCookie("token").value = res.data.accessToken;
          return api(error.config);
        } catch (e) {
          isRefreshing = false;
          useCookie("token").value = null;
          navigateTo("/auth");
          return Promise.reject(e);
        }
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
