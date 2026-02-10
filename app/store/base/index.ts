import { defineStore } from "pinia";
import { useBaseState } from "./state";
import { useBaseActions } from "./actions";

export const useBaseStore = defineStore("baseStore", () => {
  const state = useBaseState();
  const actions = useBaseActions(state);

  return {
    ...state,
    ...actions,
  };
});
