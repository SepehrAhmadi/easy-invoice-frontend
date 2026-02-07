// store/handler/actions.ts
import type { useHandlerState } from "./state";

type StateType = ReturnType<typeof useHandlerState>;

export function useHandlerActions(state: StateType) {
  // --- auth helpres ---
  const setUnauthorized = () => {
    state.unauthorized.value = true;
  };

  const setForbidden = () => {
    state.forbidden.value = true;
  };

  const setRedirect = (path: string) => {
    state.redirectTo.value = path;
  };

  const clearFlags = () => {
    state.unauthorized.value = false;
    state.forbidden.value = false;
  };

  // --- helpers ---
  const setLoadingBtn = (status: boolean) => {
    state.loadingBtn.value = status;
  };

  const setSuccess = (message: string) => {
    console.log("success action run");
    state.checkAlert.value = 1;
    state.successMessage.value = message;
    state.errorMessage.value = null;
    state.warningMessage.value = null;
    state.infoMessage.value = null;
    state.checkAlert.value = 1;
  };

  const setError = (message: string) => {
    console.log("error action run");
    state.checkAlert.value = 2;
    state.errorMessage.value = message;
    state.successMessage.value = null;
    state.warningMessage.value = null;
    state.infoMessage.value = null;
  };

  const setWarning = (message: string) => {
    state.checkAlert.value = 3;
    state.warningMessage.value = message;
    state.successMessage.value = null;
    state.errorMessage.value = null;
    state.infoMessage.value = null;
  };

  const setInfo = (message: string) => {
    state.checkAlert.value = 4;
    state.infoMessage.value = message;
    state.successMessage.value = null;
    state.errorMessage.value = null;
    state.warningMessage.value = null;
  };

  const clearMessages = () => {
    state.checkAlert.value = 0;
    state.successMessage.value = null;
    state.errorMessage.value = null;
    state.warningMessage.value = null;
    state.infoMessage.value = null;
  };

  return {
    setUnauthorized,
    setForbidden,
    setRedirect,
    clearFlags,
    setLoadingBtn,
    setSuccess,
    setError,
    setWarning,
    setInfo,
    clearMessages,
  };
}
