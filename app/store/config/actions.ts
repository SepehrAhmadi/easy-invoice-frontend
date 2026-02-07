// actions.ts
import { useApi } from "~/composables/useApi";
import type { useConfigState } from "./state";
import { useHandlerStore } from "../handler";

type StateType = ReturnType<typeof useConfigState>;

export function useConfigActions(state: StateType) {
  const handlerStore = useHandlerStore();

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
          // navigateTo("/");
          handlerStore.setSuccess(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
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
