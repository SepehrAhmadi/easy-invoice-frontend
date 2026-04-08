<template>
  <div class="tw:flex tw:flex-col tw:min-h-full">
    <v-container fluid class="tw:md:pe-0! tw:md:py-0!">
      <v-row class="tw:h-full">
        <v-col cols="12" md="4" xl="3" class="tw:md:py-0!">
          <div
            class="tw:bg-primary-dark tw:rounded-4xl tw:flex tw:flex-col tw:justify-between tw:items-center tw:p-6!"
          >
            <div class="tw:flex tw:flex-col tw:items-center tw:gap-1">
              <icon-money-receive
                class="tw-text-color-reverse tw:text-[50px] tw:3xl:text-[70px]"
              />
              <div
                class="tw-text-color-reverse tw:text-[14px] tw:3xl:text-[16px]"
              >
                {{ langStore.label.title.invoiceTotalPrice }}
              </div>
              <div
                class="tw-text-color-reverse tw:text-[22px] tw:3xl:text-[25px] tw:font-semibold"
              >
                {{ separateNumber(dashboard?.totalPrice) }}
                <span
                  class="tw-text-color-reverse tw:text-[13px] tw:3xl:text-[15px]"
                >
                  {{ langStore.label.caption.rial }}
                </span>
              </div>
            </div>

            <div
              class="tw:flex tw:justify-between tw:items-center tw:w-full tw:mt-6!"
            >
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                <icon-check-double
                  class="tw-text-color-reverse tw:text-[20px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-reverse tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.title.paid }}
                </div>
              </div>

              <div
                class="tw-text-color-reverse tw:text-[16px] tw:3xl:text-[18px] tw:font-semibold"
              >
                {{ separateNumber(dashboard?.paidTotalPrice) }}
                <span
                  class="tw-text-color-reverse tw:text-[12px] tw:3xl:text-[15px]"
                >
                  {{ langStore.label.caption.rial }}
                </span>
              </div>
            </div>
            <div
              class="tw:flex tw:justify-between tw:items-center tw:w-full tw:mt-2!"
            >
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                <icon-hourglass
                  class="tw-text-color-reverse tw:text-[18px] tw:3xl:text-[22px]"
                />
                <div
                  class="tw-text-color-reverse tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.title.awaitingPayment }}
                </div>
              </div>

              <div
                class="tw-text-color-reverse tw:text-[16px] tw:3xl:text-[18px] tw:font-semibold"
              >
                {{ separateNumber(dashboard?.awaitingPaymentTotalPrice) }}
                <span
                  class="tw-text-color-reverse tw:text-[12px] tw:3xl:text-[15px]"
                >
                  {{ langStore.label.caption.rial }}
                </span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="8" xl="9" class="tw:md:py-0!">
          <div
            class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:grow! tw:w-full! tw:overflow-hidden"
          >
            <!-- section header -->
            <div
              class="tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
            >
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
              >
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                  <icon-building class="tw-text-color-reverse tw:text-[25px]" />
                  <div class="tw-text-color-reverse tw:[18px]">
                    {{ langStore.label.title.invoiceAmountsByCompany }}
                  </div>
                </div>
                <v-btn color="white" rounded="pill" class="tw:h-8!">
                  <div
                    class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                  >
                    <div class="tw:text-[12px] tw:3xl:text-[14px]">
                      {{ langStore.label.button.seeReport }}
                    </div>
                  </div>
                </v-btn>
              </div>
            </div>
            <!-- list -->
            <div
              class="tw:flex tw:flex-col tw:gap-5 tw:py-3! tw:px-3! tw:lg:px-6! tw:overflow-auto tw:h-[350px] tw:md:h-[180px] tw:3xl:h-[210px]"
            >
              <div
                v-for="item in dashboard?.valueByCompany"
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-2 tw:sm:gap-4"
              >
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                  <icon-bank
                    v-if="item.companyType === 1"
                    class="tw-text-color tw:text-[18px] tw:3xl:text-[22px]"
                  />
                  <icon-user
                    v-else-if="item.companyType === 2"
                    class="tw-text-color tw:text-[18px] tw:3xl:text-[22px]"
                  />
                  <div class="tw-text-color tw:text-[14px] tw:3xl:text-[15px]">
                    {{ item.companyName }}
                  </div>
                  <div class="tw-text-color tw:text-[14px] tw:mx-1!">|</div>
                  <div class="tw-text-color tw:text-[14px]">
                    {{ item.count }} {{ langStore.label.caption.invoice }}
                  </div>
                </div>

                <div class="tw-text-color tw:text-[15px]">
                  {{ separateNumber(item.totalPrice) }}
                  <span class="tw:text-[12px]">
                    {{ langStore.label.caption.rial }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="tw:h-fullt tw:mt-10!">
        <v-col cols="12" md="8" xl="9" class="tw:md:py-0!">
          <div
            class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:grow! tw:w-full! tw:overflow-hidden"
          >
            <!-- section header -->
            <div
              class="tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
            >
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
              >
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                  <icon-type class="tw-text-color-reverse tw:text-[30px]" />
                  <div class="tw-text-color-reverse tw:[18px]">
                    {{ langStore.label.title.invoicesStatus }}
                  </div>
                </div>
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                  <v-btn
                    @click="changeInvoiceStatus('awaiting')"
                    color="white"
                    rounded="pill"
                    :variant="invoiceStatus === 'paid' ? 'flat' : 'outlined'"
                    class="tw:h-8!"
                  >
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                    >
                      <div class="tw:text-[12px] tw:3xl:text-[14px]">
                        {{ langStore.label.button.paid }}
                      </div>
                    </div>
                  </v-btn>
                  <v-btn
                    @click="changeInvoiceStatus('paid')"
                    color="white"
                    rounded="pill"
                    :variant="
                      invoiceStatus === 'awaiting' ? 'flat' : 'outlined'
                    "
                    class="tw:h-8!"
                  >
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                    >
                      <div class="tw:text-[12px] tw:3xl:text-[14px]">
                        {{ langStore.label.button.awaitingPayment }}
                      </div>
                    </div>
                  </v-btn>
                </div>
              </div>
            </div>
            <!-- list -->
            <div
              class="tw:flex tw:flex-col tw:gap-5 tw:py-3! tw:px-3! tw:lg:px-6! tw:overflow-auto tw:h-[350px] tw:md:h-[180px] tw:3xl:h-[210px]"
            >
              <div
                v-if="invoiceStatus === 'awaiting'"
                v-for="item in dashboard?.invoicesByPaymentStatus
                  ?.awatintPayment"
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-2 tw:sm:gap-4"
              >
                <div
                  class="tw:flex tw:flex-col tw:md:flex-row tw:justify-start tw:items-start tw:md:items-center tw:gap-2 tw:md:gap-4"
                >
                  <div
                    class="tw:bg-gray-100 tw:dark:bg-gray-800 tw:border tw:border-gray-400 tw:dark:border-gray-500 tw-text-color-lighter tw:rounded-full tw:p-0.5! tw:px-1!"
                  >
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <icon-date class="tw:text-[17px]" />
                      <div class="tw:text-[14px]">
                        {{ item.localDate }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                  >
                    <icon-bank
                      v-if="item.companyType === 1"
                      class="tw-text-color tw:text-[18px] tw:3xl:text-[22px]"
                    />
                    <icon-user
                      v-else-if="item.companyType === 2"
                      class="tw-text-color tw:text-[18px] tw:3xl:text-[22px]"
                    />
                    <div
                      class="tw-text-color tw:text-[14px] tw:3xl:text-[15px]"
                    >
                      {{ item.companyName }}
                    </div>
                    <div class="tw-text-color tw:text-[14px] tw:mx-1!">|</div>
                    <div class="tw-text-color tw:text-[14px]">
                      {{ item.invoiceNumber }}
                    </div>
                  </div>
                </div>

                <div class="tw-text-color tw:text-[15px]">
                  {{ separateNumber(item.totalPrice) }}
                  <span class="tw:text-[12px]">
                    {{ langStore.label.caption.rial }}
                  </span>
                </div>
              </div>
              <div
                v-if="invoiceStatus === 'paid'"
                v-for="item in dashboard?.invoicesByPaymentStatus?.paid"
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-2 tw:sm:gap-4"
              >
                <div
                  class="tw:flex tw:flex-col tw:md:flex-row tw:justify-start tw:items-start tw:md:items-center tw:gap-2 tw:md:gap-4"
                >
                  <div
                    class="tw:bg-gray-100 tw:dark:bg-gray-800 tw:border tw:border-gray-400 tw:dark:border-gray-500 tw-text-color-lighter tw:rounded-full tw:p-0.5! tw:px-1!"
                  >
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <icon-date class="tw:text-[17px]" />
                      <div class="tw:text-[14px]">
                        {{ item.localDate }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                  >
                    <icon-bank
                      v-if="item.companyType === 1"
                      class="tw-text-color tw:text-[18px] tw:3xl:text-[22px]"
                    />
                    <icon-user
                      v-else-if="item.companyType === 2"
                      class="tw-text-color tw:text-[18px] tw:3xl:text-[22px]"
                    />
                    <div
                      class="tw-text-color tw:text-[14px] tw:3xl:text-[15px]"
                    >
                      {{ item.companyName }}
                    </div>
                    <div class="tw-text-color tw:text-[14px] tw:mx-1!">|</div>
                    <div class="tw-text-color tw:text-[14px]">
                      {{ item.invoiceNumber }}
                    </div>
                  </div>
                </div>

                <div class="tw-text-color tw:text-[15px]">
                  {{ separateNumber(item.totalPrice) }}
                  <span class="tw:text-[12px]">
                    {{ langStore.label.caption.rial }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4" xl="3" class="tw:md:py-0!">
          <div
            class="tw:bg-primary-dark tw:rounded-4xl tw:flex tw:flex-col tw:justify-between tw:items-center tw:p-6!"
          >
            <div class="tw:flex tw:flex-col tw:items-center tw:gap-1">
              <icon-file-check
                class="tw-text-color-reverse tw:text-[50px] tw:3xl:text-[70px]"
              />
              <div
                class="tw-text-color-reverse tw:text-[14px] tw:3xl:text-[16px]"
              >
                {{ langStore.label.title.recordedInvoices }}
              </div>
              <div
                class="tw-text-color-reverse tw:text-[22px] tw:3xl:text-[25px] tw:font-semibold"
              >
                {{ dashboard?.invoicesCount }}
                <span
                  class="tw-text-color-reverse tw:text-[13px] tw:3xl:text-[15px]"
                >
                  {{ langStore.label.caption.invoice }}
                </span>
              </div>
            </div>

            <div
              class="tw:flex tw:justify-between tw:items-center tw:w-full tw:mt-6!"
            >
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                <icon-check-double
                  class="tw-text-color-reverse tw:text-[20px] tw:3xl:text-[25px]"
                />
                <div
                  class="tw-text-color-reverse tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.title.paid }}
                </div>
              </div>

              <div
                class="tw-text-color-reverse tw:text-[16px] tw:3xl:text-[18px] tw:font-semibold"
              >
                {{ dashboard?.paidInvoicesCount }}
                <span
                  class="tw-text-color-reverse tw:text-[12px] tw:3xl:text-[15px]"
                >
                  {{ langStore.label.caption.invoice }}
                </span>
              </div>
            </div>
            <div
              class="tw:flex tw:justify-between tw:items-center tw:w-full tw:mt-2!"
            >
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                <icon-hourglass
                  class="tw-text-color-reverse tw:text-[18px] tw:3xl:text-[22px]"
                />
                <div
                  class="tw-text-color-reverse tw:text-[14px] tw:3xl:text-[16px]"
                >
                  {{ langStore.label.title.awaitingPayment }}
                </div>
              </div>

              <div
                class="tw-text-color-reverse tw:text-[16px] tw:3xl:text-[18px] tw:font-semibold"
              >
                {{ dashboard?.awaitingPaymentInvoicesCount }}
                <span
                  class="tw-text-color-reverse tw:text-[12px] tw:3xl:text-[15px]"
                >
                  {{ langStore.label.caption.invoice }}
                </span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// ====== Store ======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useUtilStore } from "~/store/util";
const utilStore = useUtilStore();
const { dashboardResult: dashboard } = storeToRefs(utilStore);

// ====== Composables ======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.dashboard);
});
const { separateNumber } = useSeparator();

// ======= TS types and interface =======
type InvoiceStatus = "paid" | "awaiting";

// ======= Data =======
const invoiceStatus = ref<InvoiceStatus>("awaiting");

// ======= Functions =======
const changeInvoiceStatus = (type: InvoiceStatus) => {
  if (type == "paid") {
    invoiceStatus.value = "awaiting";
  } else if (type == "awaiting") {
    invoiceStatus.value = "paid";
  }
};

// ====== Lifecycle ======
onMounted(() => {
  utilStore.getDashboard();
});
</script>
