<template>
  <div>{{ langStore.label.page.reportByPackaging }}</div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
