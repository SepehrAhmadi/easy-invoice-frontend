import { ref } from "vue";

export function useDropdownState() {
  const unitsResult = ref<any[]>([]);
  const packagingsResult = ref<any[]>([]);

  return {
    unitsResult,
    packagingsResult,
  };
}
