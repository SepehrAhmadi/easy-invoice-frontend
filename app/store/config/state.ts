import { ref } from "vue";

export function useConfigState() {
  const loginResult = ref<unknown>(null);
  const loading = ref<boolean>(false);

  return {
    loginResult,
    loading
  };
}
