import { useApi } from "~/composables/useApi";
import type { useReportState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type StateType = ReturnType<typeof useReportState>;

export function useReportActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  // ====== by packaging ======
  const getPackaging = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/report/packaging")
      .then((res) => {
        state.packagingResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      })
      .finally(() => {
        setTimeout(() => {
          handlerStore.loading = false;
        }, 500);
      });
  };

  const getPackagingDetail = (id: string) => {
    const axios = useApi();

    return axios
      .get("/report/packaging/" + id)
      .then((res) => {
        state.packagingDetailResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  return {
    getPackaging,
    getPackagingDetail,
  };
}
