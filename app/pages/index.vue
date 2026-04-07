<template>
</template>

<script setup lang="ts">
// ====== Store ======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useUtilStore } from "~/store/util";
const utilStore = useUtilStore();
const { dashboardResult: dashboard } = storeToRefs(utilStore);

// ====== Composables ======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.dashboard);
});

// ====== Lifecycle ======
onMounted(() => {
  utilStore.getDashboard();
});
</script>
