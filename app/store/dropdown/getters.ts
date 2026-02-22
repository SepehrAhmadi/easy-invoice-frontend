import type { useDropdownState } from "./state";
import { computed } from "vue";

type Item = { id: any; name: string; type?: string };

export function useDropdownGetters(state: ReturnType<typeof useDropdownState>) {
  // units
  const unitsOptions = computed(() =>
    state.unitsResult.value.map((item: Item) => ({
      value: item.id,
      text: item.name,
    })),
  );
  // packagings
  const packagingsOptions = computed(() =>
    state.packagingsResult.value.map((item: Item) => ({
      value: item.id,
      text: item.name,
      type: item.type,
    })),
  );

  // companies
  const companiesOptions = computed(() =>
    state.companiesResult.value.map((item: Item) => ({
      value: item.id,
      text: item.name,
      type: item.type,
    })),
  );

  return {
    unitsOptions,
    packagingsOptions,
    companiesOptions,
  };
}
