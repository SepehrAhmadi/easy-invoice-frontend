import { ref } from "vue";

export function useReportState() {
  const packagingResult = ref<any[]>([]);
  const packagingDetailResult = ref<any>(null);

  const companiesResult = ref<any>(null);
  const invoicesResult = ref<any[]>([]);
  const invoiceItemsResult = ref<any[]>([]);

  return {
    packagingResult,
    packagingDetailResult,

    companiesResult,
    invoicesResult,
    invoiceItemsResult,
  };
}
