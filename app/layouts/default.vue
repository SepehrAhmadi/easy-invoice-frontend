<template>
  <v-layout class="tw:h-full!">
    <app-header />
    <v-main class="tw:h-full!">
      <div
        class="tw:m-2! tw:mt-0.5! tw:me-6! tw:bg-white tw:dark:bg-primary-dark tw:rounded-2xl! tw:relative"
      >
        <transition name="page" mode="out-in">
          <slot />
        </transition>
      </div>
    </v-main>
  </v-layout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
