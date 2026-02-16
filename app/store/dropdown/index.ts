import { defineStore } from "pinia";
import { useDropdownState } from "./state";
import { useDropdownActions } from "./actions";
import { useDropdownGetters } from "./getters";

export const useDeopdownStore = defineStore("dropdownStore", () => {
  const state = useDropdownState();
  const actions = useDropdownActions(state);
  const getters = useDropdownGetters(state);

  return {
    ...state,
    ...actions,
    ...getters,
  };
});
