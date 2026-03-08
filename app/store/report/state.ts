import { ref } from "vue";

export function useReportState() {
  const packagingResult = ref<any[]>([]);
  const packagingDetailResult = ref<any>({});

  return {
    packagingResult,
    packagingDetailResult,
  };
}
