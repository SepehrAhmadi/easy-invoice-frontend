import { ref } from "vue";

export function useBaseState() {
  const companiesResult = ref<unknown>(null);
  const companyResult = ref<unknown>(null);

  return {
    companiesResult,
    companyResult,
  };
}
