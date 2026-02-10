// actions.ts
import { useApi } from "~/composables/useApi";
import type { useConfigState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type StateType = ReturnType<typeof useConfigState>;

export function useConfigActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  const login = (value: unknown) => {
    const axios = useApi();
    state.loading.value = true;
    return axios
      .post("/auth", value, { withCredentials: true })
      .then((res) => {
        state.loginResult.value = res.data;
        if (res.data.accessToken) {
          const token = res.data.accessToken;
          useCookie("token").value = token;
          navigateTo("/");
          handlerStore.setSuccess(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      })
      .finally(() => {
        state.loading.value = false;
      });
  };

  const logout = () => {
    const axios = useApi();
    state.loading.value = true;
    return axios
      .get("/logout", { withCredentials: true })
      .then(() => {
        if (useCookie("token").value) {
          useCookie("token").value = null;
        }
        navigateTo("/auth");
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      })
      .finally(() => {
        state.loading.value = false;
      });
  };

  return {
    login,
    logout,
  };
}
