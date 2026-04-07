<template>
  <div class="tw:3xl:h-[755px]">
    <div
      class="tw:bg-primary-dark tw:rounded-t-4xl! tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
    >
      <div
        class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
      >
        <div>
          <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
            <icon-print class="tw-text-color-reverse header-icon" />
            <div class="tw-text-color-reverse header-title tw:text-nowrap">
              {{ langStore.label.title.printInvoice }}
            </div>
          </div>
          <div
            class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
          >
            {{ langStore.label.description.printInvoice }}
          </div>
        </div>
        <div
          class="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:mb-2!"
        >
          <v-btn
            color="white"
            class="tw:rounded-full! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
            icon
          >
            <icon-zoom-in class="tw:text-[23px] tw:3xl:text-[25px]" />
          </v-btn>
          <v-btn
            color="white"
            class="tw:rounded-full! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
            icon
          >
            <icon-zoom-out class="tw:text-[23px] tw:3xl:text-[25px]" />
          </v-btn>
          <v-btn color="white" rounded="pill" class="tw:h-9!">
            <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
              <icon-print class="tw:text-[22px]" />
              <div class="tw:text-[13px] tw:3xl:text-[15px]">
                {{ langStore.label.button.print }}
              </div>
            </div>
          </v-btn>
        </div>
      </div>
    </div>

    <div
      class="tw:h-full tw:rounded-b-4xl! tw:bg-white tw:dark:bg-primary-dark tw:p-6!"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// ====== Store ======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();
</script>
