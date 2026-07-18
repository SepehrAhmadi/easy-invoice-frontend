import { ref } from "vue";

export function useNotificationState() {
  const notificationResult = ref<any[]>([]);
  const unreadCount = ref<number>(0);
  const showList = ref<boolean>(false);

  return {
    notificationResult,
    unreadCount,
    showList
  };
}