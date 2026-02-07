// store/handler/state.ts
import { ref } from "vue";

export function useHandlerState() {
  const theme = ref<string | null>(null);

  const loading = ref(false);
  const loadingBtn = ref(false);
  const postCheck = ref(false);

  const checkAlert = ref<0 | 1 | 2 | 3 | 4>(0);
  const successMessage = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const warningMessage = ref<string | null>(null);
  const infoMessage = ref<string | null>(null);

  return {
    theme,
    loading,
    loadingBtn,
    postCheck,
    checkAlert,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
  };
}
