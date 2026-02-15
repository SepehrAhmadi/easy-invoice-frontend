import { useApi } from "~/composables/useApi";
import type { useBaseState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type StateType = ReturnType<typeof useBaseState>;

export function useBaseActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  // ====== Company ======
  const getCompanies = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/company")
      .then((res) => {
        state.companiesResult.value = res.data.data.companies;
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

  const getCompany = (id: string) => {
    const axios = useApi();

    return axios
      .get("/company/" + id)
      .then((res) => {
        state.companyResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const addCompany = (value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    console.log("value", value);

    return axios
      .post("/company", value)
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

  const editCompany = (id: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/company/" + id, value)
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

  const deleteCompany = (id: string) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .delete("/company/" + id)
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

  // ====== Brand ======
  const getBrands = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/brand")
      .then((res) => {
        state.brandsResult.value = res.data.data.brands;
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
        }, 2000);
      });
  };

  const getBrand = (id: string) => {
    const axios = useApi();

    return axios
      .get("/brand/" + id)
      .then((res) => {
        state.brandResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  const addBrand = (value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .post("/brand", value)
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

  const editBrand = (id: string, value: any) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .put("/brand/" + id, value)
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

  const deleteBrand = (id: string) => {
    const axios = useApi();
    handlerStore.loadingBtn = true;
    handlerStore.postCheck = true;

    return axios
      .delete("/brand/" + id)
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
    getCompanies,
    getCompany,
    addCompany,
    editCompany,
    deleteCompany,

    getBrands,
    getBrand,
    addBrand,
    editBrand,
    deleteBrand,
  };
}
