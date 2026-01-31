<template>
  <div
    class="tw:hidden tw:md:block tw:-translate-y-12.5 tw:relative tw:z-99999! tw:w-75"
  >
    <h1 class="tw:text-[25px] tw:text-gray-700 tw:dark:text-gray-300">
      {{ props.title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>
