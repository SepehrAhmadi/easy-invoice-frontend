import { ref } from "vue";

export function useNotificationState() {
  const notificationResult = ref<any[]>([]);

  return {
    notificationResult,
  };
}