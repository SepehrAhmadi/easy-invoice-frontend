export const useApi = () => {
  const { $axios } = useNuxtApp();
  return $axios
};
