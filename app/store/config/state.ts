import { ref } from "vue";

export function useConfigState() {
  const loginResult = ref<any>(null);
  const loading = ref<boolean>(false);

  const username = ref<string>("");

  const profileResult = ref<any>(null);

  return {
    loginResult,
    loading,
    username,
    profileResult,
  };
}
