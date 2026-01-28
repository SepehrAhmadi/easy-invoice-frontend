import { defineStore } from "pinia";
import state from "./state";
import getters from "./getters/index";
import actions from "./actions";

export const useLanguageStore = defineStore("languageStore", {
  state,
  getters,
  actions,
});
