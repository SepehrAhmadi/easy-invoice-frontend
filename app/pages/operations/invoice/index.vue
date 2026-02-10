  <template>
    <PageHeader :title="langStore.label.page.invoices" />
  </template>

  <script setup lang="ts">
  import { useLanguageStore } from "~/store/language";
  const langStore = useLanguageStore();
  </script>
