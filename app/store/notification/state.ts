import { ref } from "vue";

export function useNotificationState() {
  const notificationResult = ref<any[]>([]);
  const widgetNotificationsResult = ref<any[]>([]);
  const unreadCount = ref<number>(0);

  return {
    notificationResult,
    widgetNotificationsResult,
    unreadCount,
  };
}