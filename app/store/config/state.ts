import { ref } from "vue";

export function useConfigState() {
  const loginResult = ref<any>(null);
  const loading = ref<boolean>(false);

  const username = ref<string | null>(null);

  return {
    loginResult,
    loading,
  };
}
