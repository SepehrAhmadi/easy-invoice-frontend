import { defineStore } from "pinia";
import { useNotificationState } from "./state";
import { useNotificationActions } from "./actions";

export const useNotificationStore = defineStore("notificationStore", () => {
  const state = useNotificationState();
  const actions = useNotificationActions(state);

  return {
    ...state,
    ...actions,
  };
});
