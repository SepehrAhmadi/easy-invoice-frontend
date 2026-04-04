// actions.ts
import { useApi } from "~/composables/useApi";
import type { useConfigState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type StateType = ReturnType<typeof useConfigState>;

export function useConfigActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  const login = (value: any) => {
    const axios = useApi();
    state.loading.value = true;
    return axios
      .post("/auth", value, { withCredentials: true })
      .then((res) => {
        state.loginResult.value = res.data;
        if (res.data.accessToken) {
          const token = res.data.accessToken;
          state.username.value = res.data.username;
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
          state.username.value = "";
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

  const getProfile = (username: string) => {
    const axios = useApi();

    return axios
      .get("/profile/" + username)
      .then((res) => {
        state.profileResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const editProfile = (id: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/profile/" + id, value)
      .then((res) => {
        handlerStore.setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      })
      .finally(() => {
        setTimeout(() => {
          handlerStore.postCheck = false;
          handlerStore.loadingBtn = false;
        }, 500);
      });
  };

  const changePassword = (id: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/profile/changePassword" + id, value)
      .then((res) => {
        handlerStore.setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      })
      .finally(() => {
        setTimeout(() => {
          handlerStore.postCheck = false;
          handlerStore.loadingBtn = false;
        }, 500);
      });
  };

  return {
    login,
    logout,

    getProfile,
    editProfile,
    changePassword,
  };
}
