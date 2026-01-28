// actions.ts
import type { useConfigState } from "./state";

type StateType = ReturnType<typeof useConfigState>;

export function useConfigActions(state: StateType) {
  function clearConfig() {
    state.configState.value = null;
  }

  return {
    clearConfig,
  };
}
