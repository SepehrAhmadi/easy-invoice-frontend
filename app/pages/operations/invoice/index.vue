<template>
  <div>{{ langStore.label.page.invoices }}</div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
