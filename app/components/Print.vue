<template>
  <div class="print-component tw:3xl:h-[755px]">
    <div
      class="print-component-header tw:bg-primary-dark tw:rounded-t-4xl! tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
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
            @click="zoomIn"
            color="white"
            class="tw:rounded-full! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
            icon
          >
            <icon-zoom-in class="tw:text-[23px] tw:3xl:text-[25px]" />
          </v-btn>
          <v-btn
            @click="zoomOut"
            color="white"
            class="tw:rounded-full! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
            icon
          >
            <icon-zoom-out class="tw:text-[23px] tw:3xl:text-[25px]" />
          </v-btn>
          <v-btn
            @click="triggerPrint"
            color="white"
            rounded="pill"
            class="tw:h-9!"
          >
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
      class="print-area tw:w-full! tw:h-full! tw:overflow-x-auto tw:xl:overflow-hidden tw:relative tw:rounded-b-4xl! tw:bg-white tw:dark:bg-primary-dark"
      :class="{ 'tw:overflow-auto!': scale > 1 }"
      style="padding: 20px"
    >
      <div
        class="inner-content-wrapper tw:h-full! tw:transition-transform tw:duration-200 tw:ease-in"
        :style="{ transform: `scale(${scale})` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ====== Store ======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

const scale = ref(1);

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 2);
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5);
};

const triggerPrint = () => {
  scale.value = 1;
  window.print();
};
</script>

<style>
@media print {
  .print-component {
    height: 210mm !important;
  }

  .print-component {
    visibility: hidden !important;
  }

  .print-area {
    padding: 0px !important;
  }

  .print-size-title {
    font-size: 15px !important;
  }
  .print-size-title > span {
    font-size: 13px !important;
  }

  .print-size-text {
    font-size: 10px !important;
  }
  .print-size-text > svg {
    font-size: 15px !important;
  }
  .print-size-text > span {
    font-size: 12px !important;
  }

  .print-size-heading {
    font-size: 10px !important;
  }

  .printk-size-body {
    font-size: 10px !important;
  }

  .print-size-footer {
    font-size: 11px !important;
  }

  .print-size-footer > .caption {
    font-size: 10px !important;
  }

  /* header and sidebar */
  .header-sidebar {
    display: none !important;
  }

  .invoice-detail {
    display: none !important;
  }

  .invoice-print-structure {
    padding: 10px !important;
  }

  /* reset default vuetify padding */
  .v-main {
    padding: 15px !important;
  }

  .print-area,
  .print-area * {
    visibility: visible !important;
  }
  .print-area {
    position: absolute;
    display: flex !important;
    justify-content: center !important;
    align-items: start !important;
    inset: 0;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
  }

  .inner-content-wrapper {
    transform: none !important;
    width: 100% !important;
    height: auto !important;
    overflow: hidden !important;
    padding: 0px !important;
  }

  @page {
    size: A4 portrait;
    margin: 0mm;
  }
}
</style>
