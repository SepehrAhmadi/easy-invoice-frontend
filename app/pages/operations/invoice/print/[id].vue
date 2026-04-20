<template>
  <div class="tw:flex tw:flex-col tw:min-h-full">
    <v-container fluid class="tw:md:py-0! tw:md:pe-0! tw:h-full!">
      <v-row class="tw:h-full!">
        <v-col cols="12" xl="3" class="invoice-detail tw:h-full! tw:md:pt-0!">
          <div>
            <div
              class="tw:bg-primary-dark tw:rounded-t-4xl! tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!">
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3">
                <div>
                  <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                    <icon-document class="tw-text-color-reverse header-icon" />
                    <div class="tw-text-color-reverse header-title tw:text-nowrap">
                      {{ langStore.label.title.invoiceDetail }}
                    </div>
                  </div>
                  <div class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap">
                    {{ langStore.label.description.invoiceDetail }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-b-4xl tw:p-5!">
            <div class="tw:flex tw:flex-col tw:justify-between tw:items-start tw:gap-4 tw:xl:gap-6">
              <!-- invoice number -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-file class="tw-text-color-lighter tw:text-[26px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
                  {{ langStore.label.table.invoiceNubmer }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.invoiceNumber }}
                </div>
              </div>
              <!-- invoice date -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-date class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
                  {{ langStore.label.table.invoiceDate }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.localDate }}
                </div>
              </div>
              <!-- company -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-building class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
                  {{ langStore.label.table.company }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.companyName }}
                </div>
              </div>
              <!-- company type -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-bank v-if="printResult.companyType === 1"
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <icon-user v-else-if="printResult.companyType === 2"
                  class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
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
                <icon-sync class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
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
                <icon-calculator class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
                  {{ langStore.label.table.count }}:
                </div>
                <div class="tw-text-color tw:text-[14px] tw:3xl:text-[16px]">
                  {{ printResult.count }}
                </div>
              </div>
              <!-- total Price -->
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-cash class="tw-text-color-lighter tw:text-[22px] tw:3xl:text-[25px]" />
                <div class="tw-text-color-lighter tw:text-[14px] tw:3xl:text-[16px]">
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
            <div
              class="invoice-print-structure tw:h-full! tw:inline-block tw:lg:flex tw:flex-col tw:justify-start tw:mb-2! tw:md:mb-0!">
              <!-- invoice header -->
              <div class="print-size-title tw:flex tw:justify-center tw-text-color tw:text-[18px]">
                {{ langStore.label.caption.invoice }}
                {{ printResult.companyName }}
                <span class="tw:text-[16px] tw:mx-2!"> |</span>
                {{ printResult.invoiceNumber }}
              </div>
              <!-- date -->
              <div
                class="print-size-text tw:flex tw:justify-start tw:items-center tw:gap-1 tw-text-color tw:text-[15px] tw:lg:text-[16px] tw:mt-2! tw:md:mt-0!">
                <icon-date class="tw:text-[18px] tw:lg:text-[20px]" />
                {{ langStore.label.table.date }} :
                <span class="tw:text-[15px] tw:lg:text-[16px]">{{
                  printResult.localDate
                }}</span>
              </div>

              <!-- table -->
              <div class="tw:mt-3!">
                <table style="width: 100%">
                  <thead class="tw:border-x tw:border-t">
                    <tr class="tw:w-full tw:bg-gray-100! tw:dark:bg-transparent!">
                      <th
                        class="print-size-heading tw:w-[5%] tw:border-e tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ langStore.label.table.row }}
                      </th>
                      <th
                        class="print-size-heading tw:w-[40%] tw:border-e tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ langStore.label.table.product }}
                      </th>
                      <th
                        class="print-size-heading tw:w-[5%] tw:border-e tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ langStore.label.table.count }}
                      </th>
                      <th
                        class="print-size-heading tw:w-[12%] tw:border-e tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ langStore.label.table.singlePrice }}
                      </th>
                      <th
                        class="print-size-heading tw:w-[12%] tw:border-e tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ langStore.label.table.totalPrice }}
                      </th>
                      <th
                        class="print-size-heading tw:w-[26%] tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ langStore.label.table.description }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="tw:border">
                    <tr v-for="(item, index) in normalizedPrintResult">
                      <th
                        class="print-size-body tw:w-[5%] tw:border-e tw:border-b tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ (index as number) + 1 }}
                      </th>
                      <th
                        class="print-size-body tw:w-[40%] tw:border-e tw:border-b tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ item.prroduntDisplayName }}
                      </th>
                      <th
                        class="print-size-body tw:w-[5%] tw:border-e tw:border-b tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ item.pageCount }}
                      </th>
                      <th
                        class="print-size-body tw:w-[12%] tw:border-e tw:border-b tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap! tw:tracking-wider">
                        {{ separateNumber(item.singlePrice) }}
                      </th>
                      <th
                        class="print-size-body tw:w-[12%] tw:border-e tw:border-b tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap! tw:tracking-wider">
                        {{ separateNumber(item.totalPrice) }}
                      </th>
                      <th
                        class="print-size-body tw:w-[26%] tw:border-b tw:py-1! tw:px-2! tw-text-color tw:text-[14px] tw:text-nowrap!">
                        {{ item.description }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- total price -->
              <div
                class="table-footer tw:w-full tw:flex tw:bg-gray-100! tw:dark:bg-transparent! tw:border tw:border-t-0">
                <div
                  class="price-by-word print-size-footer tw:flex tw:justify-start tw:items-center tw:gap-1 tw:w-[67.32%] tw:lg:w-[62%] tw:text-[15px] tw:text-nowrap! tw:font-semibold tw:py-2!">
                  <div class="caption tw:text-[14px] tw:font-normal tw:ps-4!">
                    {{ langStore.label.table.price }} :
                  </div>
                </div>
                <div
                  class="total-price print-size-footer tw:flex tw:justify-center tw:items-center tw:gap-1 tw:border-s  tw:w-[11.92%] tw:lg:w-[12%] tw:text-[15px] tw:text-nowrap! tw:font-semibold tw:py-2! tw:px-2!">
                  {{ separateNumber(printResult.totalPrice) }}
                  <div class="caption tw:text-[13px] tw:font-normal">
                    {{ langStore.label.caption.rial }}
                  </div>
                </div>
                <div class="blank-space tw:w-[20.3%] tw:lg:w-[26%] tw:border-s tw:py-2!"></div>
              </div>
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

// ======= Computeds =======
const normalizedPrintResult = computed(() => {
  const items = printResult.value.invoiceItems || [];
  console.log("print items : ", items);
  const emptyCount = Math.max(0, 10 - items.length);

  const emptyRows = Array.from({ length: emptyCount }, () => ({}));

  return [...items, ...emptyRows];
});

// ===== Lifecycle =====
onMounted(() => {
  if (route.params.id) {
    const id = route.params.id as string;
    operationStore.printInvoice(id);
  }
});
</script>
