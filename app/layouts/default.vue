<template>
  <v-layout class="tw:h-screen">
    <app-header />

    <v-main class="tw:h-full">
      <div class="tw:relative!">
        <page-header :title="pageTitle" />
      </div>

      <div
        class="tw:h-full tw:overflow-y-auto tw:overflow-x-hidden custom-scroll tw:py-6!"
      >
        <!-- Page Content -->
        <div class="tw:md:me-8! tw:relative">
          <slot />
        </div>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
const route = useRoute();
const pageTitle = computed(() => route.meta.title as string);
</script>
