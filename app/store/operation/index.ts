import { defineStore } from "pinia";
import { useOperationState } from "./state";
import { useOperationActions } from "./actions";

export const useOperationStore = defineStore("operationStore", () => {
  const state = useOperationState();
  const actions = useOperationActions(state);

  return {
    ...state,
    ...actions,
  };
});
