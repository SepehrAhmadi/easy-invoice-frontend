<template>
  <v-menu class="tw:relative tw:z-9999!">
    <template v-slot:activator="{ props }">
      <div
        class="tw:w-10 tw:h-10 tw:flex tw:justify-center tw:items-center tw:bg-white tw:border-3 tw:border-white tw:rounded-full tw:overflow-hidden tw:hover:bg-gray-100 tw:transition tw:duration-200 tw:cursor-pointer"
        v-bind="props"
      >
        <icon-bell class="tw:text-[22px]"/>
      </div>
    </template>
    <div
      class="tw:bg-white tw:rounded-lg tw:min-w-37 tw:max-w-65 tw:overflow-hidden tw:mt-1! tw:border tw:border-gray-200"
    >
      <div
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:border-b tw:border-gray-200"
      >
        <icon-circle class="tw:w-2.5 tw:h-2.5 tw:text-cyan-500 tw:me-1!" />
        <div class="tw:text-[12px] tw:text-gray-700 tw:me-1!">
          Lorem ipsum dolor sit amet, consectetur
        </div>
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
// pictures
import avatar from "~/assets/image/default-avatar.png";
</script>
