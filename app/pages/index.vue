<template>
  <div>
    <PageHeader :title="langStore.label.page.dashboard" />

    <div class="tw:p-4!">
      <v-btn @click="showToast">show toast</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();

const showToast = () => {
  handlerStore.setSuccess("show toast for test v-snackbar");
  console.log("click toast");
};
</script>
