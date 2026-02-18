<template></template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
const { setPageTitle } = usePageTitle();

watchEffect(() => {
  setPageTitle(langStore.label.page.dashboard);
});
</script>
