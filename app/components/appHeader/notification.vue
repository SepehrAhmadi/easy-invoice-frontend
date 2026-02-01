<template>
  <v-menu class="tw:relative tw:z-9999!">
    <template v-slot:activator="{ props }">
      <div
        class="tw:w-10 tw:h-10 tw:flex tw:justify-center tw:items-center tw:bg-white tw:dark:bg-gray-800 tw:border-3 tw:border-white tw:dark:border-gray-800 tw:rounded-full tw:overflow-hidden tw:hover:bg-gray-50 tw:hover:border-gray-50  tw:dark:hover:border-gray-800 tw:dark:hover:bg-primary-dark tw:transition tw:duration-200 tw:cursor-pointer"
        v-bind="props"
      >
        <icon-bell class="tw:text-[22px]" />
      </div>
    </template>
    <div
      class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:min-w-37 tw:max-w-65 tw:overflow-hidden tw:mt-3! tw:border tw:border-gray-200 tw:dark:border-gray-700"
    >
      <div
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:border-b tw:border-gray-200 tw:dark:border-gray-700"
      >
        <icon-circle class="tw:w-2.5 tw:h-2.5 tw:text-cyan-500 tw:dark:text-cyan-300 tw:me-1.5!" />
        <div class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300 tw:text-justify">
          {{ langStore.label.caption.notifMessage }}
        </div>
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
