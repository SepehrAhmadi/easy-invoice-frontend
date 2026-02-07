// store/handler/getters.ts
import { computed } from "vue";
import type { useHandlerState } from "./state";

type StateType = ReturnType<typeof useHandlerState>;

export function useHandlerGetters(state: StateType) {
  const isLoadingBtn = computed(() => state.loadingBtn.value);
  const isPostCheck = computed(() => state.postCheck.value);

  return {
    isLoadingBtn,
    isPostCheck,
  };
}
