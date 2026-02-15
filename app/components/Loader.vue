<template>
  <transition name="slide-down">
    <div
      v-if="handlerStore.loading"
      class="tw:fixed tw:inset-0  tw:backdrop-blur-xs tw:flex tw:items-center tw:justify-center tw:z-9999999!"
    >
      <div class="tw:flex tw:flex-col tw:items-center tw:space-y-4">
        <!-- Spinner -->
        <icon-button-loader class="tw:text-[150px] tw:text-primary-dark tw:dark:text-primary-light" />
        <!-- متن Loading -->
        <span
          class="tw:text-[18px] tw:md:text-[23px] tw:text-primary-dark tw:dark:text-primary-light tw:font-semibold tw:mt-3!"
        >
          {{ langStore.label.caption.loading }}
        </span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();
</script>

<style scoped>
/* Transition classes for Vue <transition> */
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-enter-active {
  transition: all 0.4s ease-out;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-leave-active {
  transition: all 0.4s ease-in;
}
</style>
