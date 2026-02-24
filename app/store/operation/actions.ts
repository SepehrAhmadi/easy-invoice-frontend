import { useApi } from "~/composables/useApi";
import type { useOperationState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type StateType = ReturnType<typeof useOperationState>;

export function useOperationActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  // ====== Invoice ======
  const getInvoices = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/operation/invoice")
      .then((res) => {
        state.invoicesResult.value = res.data.data.invoices;
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

  const getInvoice = (id: string) => {
    const axios = useApi();

    return axios
      .get("/operation/invoice/" + id)
      .then((res) => {
        state.invoiceResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const addInvoice = (value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    console.log("value", value);

    return axios
      .post("/operation/invoice", value)
      .then((res) => {
        state.invoiceMode.value = "add";
        navigateTo({
          name: "operations-invoice-id",
          params: { id: res.data.id },
        });
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

  const editInvoice = (id: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/operation/invoice/" + id, value)
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

  const deleteInvoice = (id: string) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .delete("/operation/invoice/" + id)
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

  const changeInvoiceStatus = (id : string ,value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    console.log("value", value);

    return axios
      .post(`/operation/invoice/${id}/status`, value)
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

  // ====== Invoice ======
  const getInvoiceItems = (invoiceId: string) => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get(`/operation/invoice/${invoiceId}/items`)
      .then((res) => {
        state.invoiceItemsResult.value = res.data.data.invoiceItems;
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

  const getInvoiceItem = (invoiceId: string, itemId: string) => {
    const axios = useApi();

    return axios
      .get(`/operation/invoice/${invoiceId}/items/${itemId}`)
      .then((res) => {
        state.invoiceItemResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const addInvoiceItem = (invoiceId: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    console.log("value", value);

    return axios
      .post(`/operation/invoice/${invoiceId}/items`, value)
      .then((res) => {
        state.invoiceMode.value = "add";
        navigateTo({
          name: "operations-invoice-id",
          params: { id: res.data.id },
        });
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

  const editInvoiceItem = (invoiceId: string, itemId: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put(`/operation/invoice/${invoiceId}/items/${itemId}`, value)
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

  const deleteInvoiceItem = (invoiceId: string, itemId: string) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .delete(`/operation/invoice/${invoiceId}/items/${itemId}`)
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
    getInvoices,
    getInvoice,
    addInvoice,
    editInvoice,
    deleteInvoice,
    changeInvoiceStatus,

    getInvoiceItems,
    getInvoiceItem,
    addInvoiceItem,
    editInvoiceItem,
    deleteInvoiceItem,
  };
}
