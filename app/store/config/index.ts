// index.ts
import { defineStore } from "pinia";
import { useConfigState } from "./state";
import { useConfigActions } from "./actions";

export const useConfigStore = defineStore("configStore", () => {
  const state = useConfigState();
  const actions = useConfigActions(state);

  return {
    ...state,
    ...actions,
  };
});
