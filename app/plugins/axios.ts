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

  api.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
  );

  return {
    provide : {
        axios : api
    }
  }
});
