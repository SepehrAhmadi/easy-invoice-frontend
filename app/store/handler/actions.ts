// store/handler/actions.ts
import { useRouter, navigateTo } from "#imports";
import { useLanguageStore } from "~/store/language";
import type { useHandlerState } from "./state";

type StateType = ReturnType<typeof useHandlerState>;

export function useHandlerActions(state: StateType) {
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

  // --- API handlers ---
  const successPOSTHandler = (data: any) => {
    const langStore = useLanguageStore();
    console.log("data :", data);
    if (data.status === 200) {
      setSuccess(data.data.message);
      state.postCheck.value = true;

      setTimeout(() => {
        state.postCheck.value = false;
      }, 800);

      if (data.redirect) {
        setTimeout(async () => {
          await navigateTo(data.redirect);
        }, 2500);
      }
    } else if (data.message) {
      setError(data.data.message);
      state.postCheck.value = false;
    } else {
      setError(langStore.alert.error.unknownPost);
      state.postCheck.value = false;
    }
  };

  const successPOSTHandlerSilent = (data: any) => {
    const langStore = useLanguageStore();

    if (data.status === 200) {
      if (data.redirect) {
        setTimeout(async () => {
          await navigateTo(data.redirect);
        }, 2500);
      }
    } else if (data.data.message) {
      setError(data.data.message);
    } else {
      setError(langStore.alert.error.serverError);
    }
  };

  const errorPOSTHandler = (data: any) => {
    const langStore = useLanguageStore();
    state.postCheck.value = false;

    if (data.status === 403) {
      setError(langStore.alert.error.accessDenied);
    } else if (data.status === 401) {
      setError(langStore.alert.error.unauthorized);
    } else if (data.message) {
      setError(data.message);
    } else {
      setError(langStore.alert.error.serverError);
    }
  };

  const errorGETHandler = (data: any) => {
    const langStore = useLanguageStore();
    const router = useRouter();

    state.postCheck.value = false;

    if (data.response?.status === 403) {
      router.push("/errors/page403");
    } else if (data.response?.status === 401) {
      setError(langStore.alert.error.unauthorized);
    } else if (data.response?.data?.message) {
      setError(data.response.data.message);
    } else {
      setError(langStore.alert.error.serverError);
    }
  };

  return {
    setLoadingBtn,
    setSuccess,
    setError,
    setWarning,
    setInfo,
    clearMessages,
    successPOSTHandler,
    successPOSTHandlerSilent,
    errorPOSTHandler,
    errorGETHandler,
  };
}
