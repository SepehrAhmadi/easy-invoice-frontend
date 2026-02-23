import { ref } from "vue";

export function useOperationState() {
  const invoicesResult = ref<any[]>([]);
  const invoiceResult = ref<any>({});
  const invoiceMode = ref<'add' | 'edit' | null>(null)

  return {
    invoicesResult,
    invoiceResult,
    invoiceMode
  };
}
