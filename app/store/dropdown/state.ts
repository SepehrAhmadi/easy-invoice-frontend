import { ref } from "vue";

export function useDropdownState() {
  const unitsResult = ref<any[]>([]);
  const packagingsResult = ref<any[]>([]);
  const companiesResult = ref<any[]>([]);

  return {
    unitsResult,
    packagingsResult,
    companiesResult,
  };
}
