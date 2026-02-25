import { ref } from "vue";

export function useDropdownState() {
  const unitsResult = ref<any[]>([]);
  const packagingsResult = ref<any[]>([]);
  const companiesResult = ref<any[]>([]);
  const brandsResult = ref<any[]>([]);
  const productsResult = ref<any[]>([]);
  const categoriesResult = ref<any[]>([]);

  return {
    unitsResult,
    packagingsResult,
    companiesResult,
    brandsResult,
    productsResult,
    categoriesResult,
  };
}
