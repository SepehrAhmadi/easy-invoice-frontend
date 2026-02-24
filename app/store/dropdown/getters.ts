import type { useDropdownState } from "./state";
import { computed } from "vue";

export function useDropdownGetters(state: ReturnType<typeof useDropdownState>) {
  // units
  const unitsOptions = computed(() =>
    state.unitsResult.value.map((item: any) => ({
      value: item.id,
      text: item.name,
    })),
  );
  // packagings
  const packagingsOptions = computed(() =>
    state.packagingsResult.value.map((item: any) => ({
      value: item.id,
      text: item.name,
      type: item.type,
    })),
  );
  // companies
  const companiesOptions = computed(() =>
    state.companiesResult.value.map((item: any) => ({
      value: item.id,
      text: item.name,
      type: item.type,
    })),
  );
  // brands
  const brandsOptions = computed(() =>
    state.brandsResult.value.map((item: any) => ({
      value: item.id,
      text: item.name,
    })),
  );
  // products
  const productsOptions = computed(() =>
    state.productsResult.value.map((item: any) => ({
      value: item.id,
      text: item.name,
      brandId: item.brandId,
      packagingId: item.packagingId,
      unitId: item.unitId,
      unitAmount: item.unitAmount,
    })),
  );

  return {
    unitsOptions,
    packagingsOptions,
    companiesOptions,
    brandsOptions,
    productsOptions,
  };
}
