// actions.ts
import { useApi } from "~/composables/useApi";
import type { useUtilState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";
import { useConfigStore } from "../config";

type StateType = ReturnType<typeof useUtilState>;

export function useUtilActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();
  const configStore = useConfigStore();
  const { drawer } = useEditProfile();

  const getDashboard = () => {
    const axios = useApi();

    return axios
      .get("/dashboard")
      .then((res) => {
        state.dashboardResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const getProfile = () => {
    const axios = useApi();

    return axios
      .get("/profile")
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

  const editProfile = (value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/profile", value, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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

  const changePassword = (value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/profile/changePassword", value)
      .then((res) => {
        handlerStore.setSuccess(res.data.message);
        drawer.value = false;
        configStore.logout();
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

  const deleteAvatar = () => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .delete("/profile/deleteAvatar")
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
    getDashboard,
    getProfile,
    editProfile,
    changePassword,
    deleteAvatar,
  };
}
