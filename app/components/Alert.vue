<template>
  <v-snackbar
    v-model="toast"
    :timeout="config.timeout"
    :color="config.color"
    location="bottom end"
    variant="tonal"
    class="tw:-translate-y-1.25"
    :class="
      langStore.currentLang === 'en'
        ? 'tw:-translate-x-1.25'
        : 'tw:translate-x-1.25'
    "
  >
    <div
      class="tw:flex tw:translate-y-2 tw:justify-end tw:items-center tw:w-full"
      :class="
        langStore.currentLang === 'en'
          ? 'tw:translate-x-2'
          : 'tw:-translate-x-2'
      "
    >
      <button
        @click="toast = false"
        class="tw:p-0! tw:hover:opacity-75 tw:transition-opacity tw:duration-100"
      >
        <icon-close class="tw:text-[17px]" />
      </button>
    </div>

    <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
      <icon-check-circle v-if="type === 1" class="tw:text-[23px]" />
      <icon-close-circle v-else-if="type === 2" class="tw:text-[23px]" />
      <icon-danger v-else-if="type === 3" class="tw:text-[23px]" />
      <icon-info-circle v-else-if="type === 4" class="tw:text-[23px]" />
      <div class="tw:text-[15px]">
        {{ config.message }}
      </div>
    </div>
  </v-snackbar>
</template>

<script setup>
import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

const toast = ref(false);
const type = ref(1);
const config = computed(() => {
  const base = {
    1: {
      type: "success",
      timeout: 5000,
      color: "#059212",
      message: handlerStore.successMessage,
    },
    2: {
      type: "error",
      timeout: 5000,
      color: "#AA2B1D",
      message: handlerStore.errorMessage,
    },
    3: {
      type: "warning",
      timeout: 5000,
      color: "#FF7F11",
      message: handlerStore.warningMessage,
    },
    4: {
      type: "info",
      timeout: 5000,
      color: "#1581BF",
      message: handlerStore.infoMessage,
    },
  };
  return base[type.value];
});

watch(
  () => handlerStore.checkAlert,
  (val) => {
    if (val) {
      type.value = val;
      toast.value = true;
    }
  },
);

watch(
  () => toast.value,
  (val) => {
    if (val === false) {
      handlerStore.clearMessages();
    }
  },
);
</script>

<style scoped>
:deep(.v-overlay__content.v-snackbar__wrapper) {
  border-radius: 10px !important;
  backdrop-filter: blur(7px) !important;
}

:deep(.v-snackbar__content) {
  padding-top: 0px !important;
}
</style>
