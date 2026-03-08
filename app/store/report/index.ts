import { defineStore } from "pinia";
import { useReportState } from "./state";
import { useReportActions } from "./actions";

export const useReportStore = defineStore("reportStore", () => {
  const state = useReportState();
  const actions = useReportActions(state);

  return {
    ...state,
    ...actions,
  };
});
