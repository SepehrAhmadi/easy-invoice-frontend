import { useApi } from "~/composables/useApi";
import type { useNotificationState } from "./state";
import { useHandlerStore } from "../handler";
import { useLanguageStore } from "../language";

type stateType = ReturnType<typeof useNotificationState>;

export function useNotificationActions(state: stateType) {
  const handlerStore = useHandlerStore();
  const langStore = useLanguageStore();

  // ====== get notifications ======
  const getNotifications = async (filter = "") => {
    const axios = useApi();

    return axios
      .get("/notification" + filter)
      .then((res) => {
        state.notificationResult.value = res.data.data.notifications;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  // ====== get unread count ======
  const getUnreadCount = async () => {
    const axios = useApi();

    return axios
      .get("/notification/unreadCount")
      .then((res) => {
        state.unreadCount.value = res.data.unreadCount;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
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
      if (Array.isArray(state.notificationResult.value)) {
        console.log("notification :", notification);
        state.notificationResult.value.unshift(notification);
        state.unreadCount.value += 1;
      }
    });

    $socket.on("connect", () => {
      console.log("Socket connected");
    });

    $socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  // ====== read notification ======
  const readNotification = async (id: string) => {
    const axios = useApi();

    return axios
      .post(`/notification/${id}/read`)
      .then(() => {
        state.unreadCount.value -= 1;
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.message || langStore.alert.error.serverError;
        handlerStore.setError(message);
      });
  };

  return {
    getNotifications,
    connectNotification,
    readNotification,
    getUnreadCount,
  };
}
