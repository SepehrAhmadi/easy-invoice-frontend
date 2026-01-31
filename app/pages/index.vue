<template>
  <div>dashboard</div>
  <div>{{ langStore.label.page.home }}</div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
