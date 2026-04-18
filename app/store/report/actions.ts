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

  // ====== by companies ======
  const getCompanies = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/report/company")
      .then((res) => {
        state.companiesResult.value = res.data.data;
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

  const getInvoices = (id: string) => {
    const axios = useApi();

    return axios
      .get("/report/company/invoices/" + id)
      .then((res) => {
        state.invoicesResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const getInvoiceItems = (id: string) => {
    const axios = useApi();

    return axios
      .get("/report/company/invoiceItems/" + id)
      .then((res) => {
        state.invoiceItemsResult.value = res.data.data;
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

    getCompanies,
    getInvoices,
    getInvoiceItems,
  };
}
