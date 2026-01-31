<template>
  <v-layout class="tw:h-full!">
    <app-header />
    <v-main class="tw:h-full!">
      <div class="tw:p-6! tw:m-2! tw:mt-0.5! tw:me-6! tw:bg-white tw:dark:bg-primary-dark tw:rounded-2xl!">
        <slot />
      </div>
    </v-main>
  </v-layout>
</template>
