<template>
  <div
    class="tw:hidden tw:md:block tw:absolute! tw:-top-12.5 tw:start-3.5 tw:z-99999! tw:w-75"
  >
    <Transition name="slide-down" mode="out-in">
      <h1
        :key="pageTitle"
        class="tw:text-[23px] tw:text-gray-700 tw:dark:text-gray-300"
      >
        {{ pageTitle }}
      </h1>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { pageTitle } = usePageTitle();
</script>

<style scoped>
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-leave-active {
  transition: all 0.3s ease-in;
}
</style>
