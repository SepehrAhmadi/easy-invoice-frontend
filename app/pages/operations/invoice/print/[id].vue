<template>
  <div class="tw:flex tw:flex-col tw:min-h-full">
    <v-container fluid class="tw:md:py-0! tw:md:pe-0! tw:h-full!">
      <v-row class="tw:h-full!">
        <v-col cols="12" xl="3" class="tw:h-full! tw:md:pt-0!">
          <div>
            <div
              class="tw:bg-primary-dark tw:rounded-t-4xl! tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
            >
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
              >
                <div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                  >
                    <icon-document class="tw-text-color-reverse header-icon" />
                    <div
                      class="tw-text-color-reverse header-title tw:text-nowrap"
                    >
                      {{ langStore.label.title.invoiceDetail }}
                    </div>
                  </div>
                  <div
                    class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
                  >
                    {{ langStore.label.description.invoiceDetail }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-b-4xl tw:p-5!"
          >
            <div
              class="tw:flex tw:flex-col tw:justify-between tw:items-start tw:gap-4 tw:xl:gap-6"
            >
              <!-- invoice number -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-file class="tw-text-color-lighter tw:text-[26px]" />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.invoiceNubmer }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.invoiceNumber }}
                </div>
              </div>
              <!-- invoice date -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-date
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.invoiceDate }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.localDate }}
                </div>
              </div>
              <!-- company -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-building
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.company }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.companyName }}
                </div>
              </div>
              <!-- company type -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-bank
                  v-if="printResult.companyType === 1"
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <icon-user
                  v-else-if="printResult.companyType === 2"
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.companyType }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{
                    printResult.companyType === 1
                      ? langStore.label.table.legalEntity
                      : langStore.label.table.individual
                  }}
                </div>
              </div>
              <!-- payment status -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-sync
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.paymentStatus }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{
                    printResult.paymentStatus === 1
                      ? langStore.label.table.paid
                      : langStore.label.table.awaitingPayment
                  }}
                </div>
              </div>
              <!-- count -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-calculator
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.count }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.count }}
                </div>
              </div>
              <!-- total Price -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-cash
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.table.totalPrice }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ separateNumber(printResult.totalPrice) }}
                </div>
                <div class="tw-text-color tw:text-[13px] tw:3xl:text-[15px]">
                  {{ langStore.label.caption.rial }}
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" xl="9" class="tw:h-full! tw:md:pt-0! tw:md:pe-0!">
          <Print>
            <div class="tw:flex tw:flex-col tw:justify-between tw:h-full!">
              <div>
                <h1>عنوان سند</h1>
                <p>این متن داخل کامپوننت چاپ میشه.</p>
                <div class="tw:text-justify">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nihil quaerat, ipsum exercitationem qui voluptatum, quibusdam
                  quasi provident, error facere architecto debitis tenetur
                  quisquam. Sit, quas fuga exercitationem consequatur excepturi,
                  quae asperiores consequuntur esse dicta hic corrupti
                  architecto tempora ipsa beatae earum! Eligendi sed
                  necessitatibus placeat sapiente accusamus sint
                </div>
              </div>
              <p>این متن داخل کامپوننت چاپ میشه.</p>
            </div>
          </Print>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// ====== Store ======
import { allowedVariants } from "vuetify/lib/labs/VVideo/VVideoControls.mjs";
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useOperationStore } from "~/store/operation";
const operationStore = useOperationStore();
const { printInvoiceResult: printResult } = storeToRefs(operationStore);

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.printInvoice);
});
const { separateNumber } = useSeparator();

// ====== Router & Route ======
const route = useRoute();

// ===== Lifecycle =====
onMounted(() => {
  if (route.params.id) {
    const id = route.params.id as string;
    operationStore.printInvoice(id);
  }
});
</script>
