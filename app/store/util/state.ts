import { ref } from "vue";

export function useUtilState() {
  const dashboardResult = ref<any>(null);
  const profileResult = ref<any>(null);

  return {
    dashboardResult,
    profileResult,
  };
}
