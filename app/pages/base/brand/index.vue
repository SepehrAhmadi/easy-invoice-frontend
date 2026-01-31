<template>
  <div>{{ langStore.label.page.brands }}</div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
