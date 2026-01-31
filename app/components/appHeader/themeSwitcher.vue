<template>
  <div
    class="tw:fixed tw:bottom-5 tw:hidden tw:md:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3 tw:py-1.5! tw:px-1! tw:bg-white tw:dark:bg-primary-dark tw:rounded-full tw:z-999!"
    :class="{
      'tw:right-5': langStore.currentLang == 'fa',
      'tw:left-5': langStore.currentLang == 'en',
    }"
  >
    <div
      @click="toggleTheme('light')"
      class="tw:w-8! tw:h-8! tw:flex tw:justify-center tw:items-center tw:rounded-full tw:cursor-pointer tw:hover:bg-gray-200 tw:dark:hover:bg-gray-700 tw:transition tw:duration-100"
      :class="{ 'tw:bg-gray-200 tw:dark:bg-gray-700 ': !isDark }"
    >
      <icon-sun class="tw:w-5! tw:h-5! tw:text-gray-700 tw:dark:text-gray-300" />
    </div>

    <div
      @click="toggleTheme('dark')"
      class="tw:w-8! tw:h-8! tw:flex tw:justify-center tw:items-center tw:rounded-full tw:cursor-pointer tw:hover:bg-gray-200 tw:dark:hover:bg-gray-700 tw:transition tw:duration-100"
      :class="{ 'tw:bg-gray-200 tw:dark:bg-gray-700 ': isDark }"
    >
      <icon-moon class="tw:w-5! tw:h-5! tw:text-gray-700 tw:dark:text-gray-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

const isDark = ref(false);

const toggleTheme = (mode: "light" | "dark") => {
  if (mode == "light") {
    isDark.value = false;
  } else if (mode == "dark") {
    isDark.value = true;
  }
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDark.value);
  theme.global.name.value = isDark.value ? "dark" : "light";
};
</script>
