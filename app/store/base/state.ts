import { ref } from "vue";

export function useBaseState() {
  const companiesResult = ref<any[]>([]);
  const companyResult = ref<any>({});

  const brandsResult = ref<any[]>([]);
  const brandResult = ref<any>({});

  const productsResult = ref<any[]>([]);
  const productResult = ref<any>({});

  return {
    companiesResult,
    companyResult,
    brandsResult,
    brandResult,
    productsResult,
    productResult,
  };
}
