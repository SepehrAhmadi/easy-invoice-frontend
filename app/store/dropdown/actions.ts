import { useApi } from "~/composables/useApi";
import type { useDropdownState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type StateType = ReturnType<typeof useDropdownState>;

export function useDropdownActions(state: StateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  const getUnits = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/dropdown/units")
      .then((res) => {
        state.unitsResult.value = res.data.data.units;
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

  const getPackagings = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/dropdown/packagings")
      .then((res) => {
        state.packagingsResult.value = res.data.data.packagings;
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

  const getCompanies= () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/dropdown/companies")
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

  return {
    getUnits,
    getPackagings,
    getCompanies
  };
}
