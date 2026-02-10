import { ref } from "vue";

export function useBaseState() {
  const companiesResult = ref<any[]>([]);
  const companyResult = ref<any>({});

  return {
    companiesResult,
    companyResult,
  };
}
