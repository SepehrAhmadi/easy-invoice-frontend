// store/handler/state.ts
import { ref } from "vue";

export function useHandlerState() {
  const theme = ref<string | null>(null);

  const unauthorized = ref<boolean>(false);
  const forbidden = ref<boolean>(false);
  const redirectTo = ref<string | null>(null);

  const loading = ref<boolean>(false);
  const loadingBtn = ref<boolean>(false);
  const postCheck = ref<boolean>(false);

  const checkAlert = ref<0 | 1 | 2 | 3 | 4>(0);
  const successMessage = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const warningMessage = ref<string | null>(null);
  const infoMessage = ref<string | null>(null);

  return {
    theme,
    unauthorized,
    forbidden,
    redirectTo,
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
