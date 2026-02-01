<template>
  <v-layout class="pa-0 ma-0">
    <v-main class="pa-0 ma-0 tw:h-screen! tw:flex">
      <transition name="page" mode="out-in">
        <slot />
      </transition>
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
