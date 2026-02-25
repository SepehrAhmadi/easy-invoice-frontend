import { ref } from "vue";

export function useBaseState() {
  const companiesResult = ref<any[]>([]);
  const companyResult = ref<any>({});

  const brandsResult = ref<any[]>([]);
  const brandResult = ref<any>({});

  const categoriesResult = ref<any[]>([]);
  const categoryResult = ref<any>({});

  const productsResult = ref<any[]>([]);
  const productResult = ref<any>({});

  return {
    companiesResult,
    companyResult,
    brandsResult,
    brandResult,
    categoriesResult,
    categoryResult,
    productsResult,
    productResult,
  };
}
