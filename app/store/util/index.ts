// index.ts
import { defineStore } from "pinia";
import { useUtilState } from "./state";
import { useUtilActions } from "./actions";

export const useUtilStore = defineStore("utilStore", () => {
  const state = useUtilState();
  const actions = useUtilActions(state);

  return {
    ...state,
    ...actions,
  };
});
