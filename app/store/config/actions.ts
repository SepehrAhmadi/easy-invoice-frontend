// actions.ts
import { useApi } from "~/composables/useApi";
import type { useConfigState } from "./state";

type StateType = ReturnType<typeof useConfigState>;

export function useConfigActions(state: StateType) {
  const login = (value: unknown) => {
    const axios = useApi();

    state.loading.value = true;
    return axios
      .post("/auth", value)
      .then((res) => {
        state.loginResult.value = res.data;
        if (res.data.accessToken) {
          const token = res.data.accessToken;
          useCookie("token").value = token;
          navigateTo("/");
        }
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
  };
}
