<template>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

// ======= TS types and interface =======
definePageMeta({
  title: langStore.label.page.dashboard,
});
</script>
