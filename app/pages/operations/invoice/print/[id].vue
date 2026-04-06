<template>
  <div class="tw:flex tw:justify-center tw:items-start tw:relative">
    <div class="tw:w-[210mm] tw:min-h-[297mm]">
      {{ printResult }}
    </div>
  </div>
</template>

<script setup lang="ts">
// ====== Store ======
import { useOperationStore } from "~/store/operation";
const operationStore = useOperationStore();
const { printInvoiceResult: printResult } = storeToRefs(operationStore);

// ====== Router & Route ======
const route = useRoute();

// ===== Lifecycle =====
onMounted(() => {
  if (route.params.id) {
    const id = route.params.id as string;
    operationStore.printInvoice(id);
  }
});
</script>
