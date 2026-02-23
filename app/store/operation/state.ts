import { ref } from "vue";

export function useOperationState() {
  const invoicesResult = ref<any[]>([]);
  const invoiceResult = ref<any>({});
  const invoiceMode = ref<"add" | "edit" | null>(null);

  const invoiceItemsResult = ref<any[]>([]);
  const invoiceItemResult = ref<any>({});

  return {
    invoicesResult,
    invoiceResult,
    invoiceMode,

    invoiceItemsResult,
    invoiceItemResult,
  };
}
