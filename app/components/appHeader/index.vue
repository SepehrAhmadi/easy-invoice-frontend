<template>
  <div>
    <v-app-bar color="transparetn" class="tw:px-4.5!">
      <button
        icon
        variant="text"
        @click="rail = !rail"
        class="tw:bg-black! tw:hover:bg-black/80! tw:group tw:p-2! tw:rounded-full"
      >
        <icon-dashboard class="tw:text-[25px] tw:text-white" />
      </button>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      width="250"
      rail-width="70"
    >
      <div
        class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-3 tw:m-4! tw:mt-1!"
      >
        <div
          v-for="(item, index) in 4"
          class="tw:relative tw:flex tw:justify-between tw:items-center tw:gap-3 tw:cursor-pointer tw:group tw:w-full tw:py-2.5! tw:px-2.5!"
          :class="{
            'tw:bg-white tw:rounded-lg tw:border-b tw:border-gray-300':
              index == 0 && !rail,
          }"
        >
          <div class="tw:flex tw:justify-center tw:items-center tw:gap-3">
            <icon-home
              class="tw:text-[25px] tw:text-gray-600! tw:group-hover:text-gray-900! tw:transition tw:duration-150"
            />
            <transition name="slide-text">
              <div
                class="tw:text-gray-600! tw:group-hover:text-gray-900! tw:transition tw:duration-150 tw:text-[16px]"
                v-if="!rail"
              >
                Dashboard
              </div>
            </transition>
          </div>
          <div class="tw:flex tw:justify-center tw:items-center">
            <icon-arrow-down
              v-if="!rail"
              class="tw:text-[17px] tw:text-gray-600! tw:group-hover:text-gray-900! tw:transition tw:duration-150"
            />
          </div>

          <!-- active icon when slider in minimum size -->
          <icon-circle
            class="tw:hidden tw:text-[6px] tw:text-gray-600! tw:absolute tw:top-5 tw:left-0"
            :class="{
              'tw:md:block!': index == 0 && rail,
            }"
          />
        </div>
      </div>
    </v-navigation-drawer>

    <!-- toggle theme -->
    <div
      class="tw:fixed tw:bottom-5 tw:left-5 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3 tw:py-1.5! tw:px-1! tw:bg-white tw:rounded-full tw:z-999!"
    >
      <div
        @click="toggleTheme('light')"
        class="tw:w-8! tw:h-8! tw:flex tw:justify-center tw:items-center tw:bg-primary-light tw:rounded-full tw:cursor-pointer tw:hover:bg-gray-200 tw:transition tw:duration-100"
      >
        <icon-sun class="tw:w-5! tw:h-5! tw:text-gray-700" />
      </div>

      <div
        @click="toggleTheme('dark')"
        class="tw:w-8! tw:h-8! tw:flex tw:justify-center tw:items-center tw:bg-primary-light tw:rounded-full tw:cursor-pointer tw:hover:bg-gray-200 tw:transition tw:duration-100"
      >
        <icon-moon class="tw:w-5! tw:h-5! tw:text-gray-700" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// vuetify
import { useTheme } from "vuetify";
const theme = useTheme();

const drawer = ref(true);
const rail = ref(false);

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

<style>
/* change vuetify components style */
.v-app-bar.v-toolbar {
  box-shadow: none !important;
}

.v-navigation-drawer--left,
.v-navigation-drawer--right {
  border: none !important;
}

/* slide-text transition */
.slide-text-enter-active,
.slide-text-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    color 0.2s;
}

.slide-text-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-text-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-text-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-text-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
