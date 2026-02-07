import { defineStore } from "pinia";
import { useHandlerState } from "./state";
import { useHandlerGetters } from "./getters";
import { useHandlerActions } from "./actions";

export const useHandlerStore = defineStore("handlerStore", () => {
  const state = useHandlerState();
  const getters = useHandlerGetters(state);
  const actions = useHandlerActions(state);

  return {
    ...state,
    ...getters,
    ...actions,
  };
});