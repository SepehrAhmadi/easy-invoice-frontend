import { useApi } from "~/composables/useApi";
import type { useNotificationState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type stateType = ReturnType<typeof useNotificationState>;

export function useNotificationActions(state: stateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  // ====== get notifications ======
  const getNotifications = () => {
    const axios = useApi();
    handlerStore.loading = true;

    return axios
      .get("/notification")
      .then((res) => {
        state.notificationResult.value = res.data.data.notifications;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      })
      .finally(() => {
        handlerStore.loading = false;
      });
  };

  // ====== connect notifications ======
  const connectNotification = () => {
    const { $socket } = useNuxtApp();

    if (!$socket.connected) {
      $socket.connect();
    }

    $socket.off("notification");

    $socket.on("notification", (notification) => {
      console.log("New notification received:", notification);
      if (Array.isArray(state.notificationResult.value)) {
        state.notificationResult.value.unshift(notification);
      }
    });

    $socket.on("connect", () => {
      console.log("Socket connected");
    });

    $socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  return {
    getNotifications,
    connectNotification
  };
}
