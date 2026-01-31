<template>
  <div>{{ langStore.label.page.products }}</div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
