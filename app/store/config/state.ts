// state.ts
import { ref } from "vue";

export function useConfigState() {
  const configState = ref<unknown>(null);
  
  return {
    configState,
  };
}
