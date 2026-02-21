import { ref } from "vue";

export function useOperationState() {
  const invoicesResult = ref<any[]>([]);
  const invoiceResult = ref<any>({});

  return {
    invoicesResult,
    invoiceResult,
  };
}
