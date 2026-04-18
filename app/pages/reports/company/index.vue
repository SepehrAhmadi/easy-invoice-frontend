<template>
  <div class="tw:flex tw:flex-col tw:min-h-full">
    <v-container fluid class="tw:md:pe-0! tw:md:py-0!">
      <v-row
        class="tw-flex! tw:items-center! tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:rounded-t-4xl! tw:p-3!">
        <v-col cols="12">
          <div
            class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3 tw:w-full">
            <div>
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-clipboard class="tw-text-color-reverse header-icon" />
                <div class="tw-text-color-reverse header-title tw:text-nowrap">
                  {{ langStore.label.title.reportByCompany }}
                </div>
                <transition name="fade">
                  <div class="tw-text-color-reverse tw:mx-1!" v-if="companyName">|</div>

                </transition>
                <transition name="fade">
                  <div v-if="companyName"
                    class="tw-text-color-reverse tw:text-[16px] tw:lg:text-[18px] tw:3xl:text-[20px]! tw:text-nowrap">
                    {{ companyName }}
                  </div>
                </transition>
                <transition name="fade">
                  <div v-if="invoiceNumber"
                    class="tw-text-color-reverse tw:text-[16px] tw:lg:text-[18px] tw:3xl:text-[20px]! tw:text-nowrap">
                    -
                  </div>
                </transition>
                <transition name="fade">

                  <div v-if="invoiceNumber"
                    class="tw-text-color-reverse tw:text-[16px] tw:lg:text-[18px] tw:3xl:text-[20px]! tw:text-nowrap">
                    {{ invoiceNumber }}
                  </div>
                </transition>
              </div>
              <div class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap">
                {{ langStore.label.description.reportByCompany }}
              </div>
            </div>
            <transition name="fade">
              <v-btn v-if="showInvoiceItemsTabel" @click="loadInvoices(companyId, 'prev')" rounded="pill"
                class="tw:px-4! tw:text-primary-dark! tw:group">
                <div class="tw:text-[14px]!">
                  {{ langStore.label.button.backToInvoice }}
                </div>
                <icon-arrow-left
                  class="tw:text-[20px]! tw:ms-1! tw:group-hover:-translate-x-1.5 tw:transition tw:duration-200" />
              </v-btn>
            </transition>
          </div>

        </v-col>
      </v-row>
      <v-row class="tw:bg-white! tw:dark:bg-primary-dark! tw:rounded-b-4xl! tw:p-6!">
        <v-col cols="12" md="4" xl="3" 2xl="3" class="tw:ps-0! tw:py-0!">
          <div
            class="tw:3xl:mb-2 tw:flex! tw:flex-col tw:justify-between tw:bg-primary-dark tw:dark:bg-background-dark tw:p-6! tw:rounded-4xl tw:3xl:h-[233px]!">
            <div class="tw:flex-1">
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                <icon-building class="tw-text-color-reverse header-icon" />
                <div class="tw-text-color-reverse header-title">
                  {{ langStore.label.title.companiesList }}
                </div>
              </div>
              <div class="tw:text-gray-400 tw:dark:text-gray-400 tw:text-justify header-desc tw:mt-3!">
                {{ langStore.label.description.companiesList }}
              </div>
            </div>
            <div class="tw:flex tw:flex-col tw:justify-center! tw:gap-2">
              <!-- paid invoices -->
              <div class="tw:flex tw:justify-between tw:items-center">
                <div class="tw:flex tw:justiyf-start tw:items-center tw:gap-1">
                  <div>
                    <icon-check-double class="tw-text-color-reverse tw:text-[20px]" />
                  </div>
                  <div class="tw:flex tw-text-color-reverse tw:text-[13px]/5">
                    {{ langStore.label.table.paid }} :
                  </div>
                  <div v-if="report?.totalPaidPrice > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color-reverse tw:text-[14px] tw:gap-1">
                    {{
                      report?.totalPaidPrice <= 0 ? "--" : separateNumber(report?.totalPaidPrice) }} <div
                      class="tw:text-[13px]">
                      {{ langStore.label.caption.rial }}
                  </div>
                </div>
              </div>
              <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                <div v-if="report?.paidInvoicesCount > 0"
                  class="tw:flex tw:justify-center tw:items-center tw-text-color-reverse tw:text-[14px] tw:gap-1">
                  {{ report?.paidInvoicesCount }}
                  <div class="tw:text-[13px]">
                    {{ langStore.label.caption.invoice }}
                  </div>
                </div>
              </div>
            </div>
            <!-- awaiting invoices -->
            <div class="tw:flex tw:justify-between tw:items-center">
              <div class="tw:flex tw:justiyf-start tw:items-center tw:gap-1">
                <div>
                  <icon-hourglass class="tw-text-color-reverse tw:text-[18px]" />
                </div>
                <div class="tw:flex tw-text-color-reverse tw:text-[13px]/5">
                  {{ langStore.label.table.awaitingPayment }} :
                </div>
                <div v-if="report?.totalAwaitingPrice > 0"
                  class="tw:flex tw:justify-center tw:items-center tw-text-color-reverse tw:text-[14px] tw:gap-1">
                  {{
                    report?.totalAwaitingPrice <= 0 ? "--" : separateNumber(report?.totalAwaitingPrice) }} <div
                    class="tw:text-[13px]">
                    {{ langStore.label.caption.rial }}
                </div>
              </div>
            </div>
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
              <div v-if="report?.awaitingInvoicesCount > 0"
                class="tw:flex tw:justify-center tw:items-center tw-text-color-reverse tw:text-[14px] tw:gap-1">
                {{ report?.awaitingInvoicesCount }}
                <div class="tw:text-[13px]">
                  {{ langStore.label.caption.invoice }}
                </div>
              </div>
            </div>
          </div>
          <!-- total invoices -->
          <div class="tw:flex tw:justify-between tw:items-center">
            <div class="tw:flex tw:justiyf-start tw:items-center tw:gap-1">
              <div>
                <icon-cash class="tw-text-color-reverse tw:text-[18px]" />
              </div>
              <div class="tw:flex tw-text-color-reverse tw:text-[13px]/5">
                {{ langStore.label.table.totalPrice }} :
              </div>
              <div v-if="report?.totalPrice > 0"
                class="tw:flex tw:justify-center tw:items-center tw-text-color-reverse tw:text-[14px] tw:gap-1 tw:font-semibold">
                {{
                  report?.totalPrice <= 0 ? "--" : separateNumber(report?.totalPrice) }} <div
                  class="tw:text-[13px] tw:font-normal">
                  {{ langStore.label.caption.rial }}
              </div>
            </div>
          </div>
          <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
            <div v-if="report?.invoicesCount > 0"
              class="tw:flex tw:justify-center tw:items-center tw-text-color-reverse tw:text-[14px] tw:gap-1 tw:font-semibold">
              {{ report?.invoicesCount }}
              <div class="tw:text-[13px] tw:font-normal">
                {{ langStore.label.caption.invoice }}
              </div>
            </div>
          </div>
  </div>
  </div>
  </div>
  </v-col>
  <v-col cols="12" md="8" xl="9" 2xl="9" class="tw:pe-0! tw:py-0!">
    <Swiper :modules="[Navigation, Pagination]" :slides-per-view="'auto'" :pagination="{
      el: '.companies-pagination-swiper',
      clickable: false,
    }" :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }" :key="companiesSliderKey" class="tw:items-stretch!">
      <SwiperSlide v-for="item in report?.companies as any[]" class="tw:h-auto!">
        <div class="tw:h-auto tw:flex">
          <div
            class="tw:h-full! tw:flex tw:flex-col tw:flex-1 tw:justify-between tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-4xl tw:p-6! tw:md:p-6! tw:min-h-45 tw:2xl:min-h-40 tw:max-h-full">
            <!-- information -->
            <div>
              <div
                class="tw:inline-flex tw:items-center tw:gap-1 tw:py-0.5! tw:px-3! tw:bg-white tw:dark:bg-primary-dark tw:rounded-full">
                <icon-bank v-if="item.companyType == CompanyType.legalEntity"
                  class="tw-text-color-lighter tw:text-[17px]" />
                <icon-user v-if="item.companyType == CompanyType.individual"
                  class="tw-text-color-lighter tw:text-[17px]" />
                <div class="tw-text-color-lighter tw:text-[13px]">
                  {{
                    item.companyType == CompanyType.legalEntity
                      ? langStore.label.table.legalEntity
                      : langStore.label.table.individual
                  }}
                </div>
              </div>
              <div class="tw-text-color tw:text-[20px]! tw:font-semibold tw:mt-1! tw:2xl:mt-1!">
                {{ item.companyName }}
              </div>
              <!-- paid invoces -->
              <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:mt-3!">
                <div class="tw:flex tw:justify-start tw:items-center">
                  <div>
                    <icon-check-double class="tw-text-color-lighter tw:text-[20px]" />
                  </div>
                  <div class="tw:flex tw-text-color-lighter tw:text-[13px]/5">
                    {{ langStore.label.table.paid }} :
                  </div>
                  <div v-if="item.totalPaidPrice > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color tw:text-[14px] tw:gap-1">
                    {{ separateNumber(item.totalPaidPrice) }}
                    <div class="tw:text-[13px]">
                      {{ langStore.label.caption.rial }}
                    </div>
                  </div>
                  <div v-else class="tw-text-color tw:text-[14px] tw:ms-1!">
                    ----
                  </div>
                </div>
                <div class="tw:flex tw:justify-start tw:items-center">
                  <div v-if="item.paidInvoicesCount > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color tw:text-[14px] tw:gap-1">
                    {{ item.paidInvoicesCount }}
                    <div class="tw:text-[13px]">
                      {{ langStore.label.caption.invoice }}
                    </div>
                  </div>
                  <div v-else class="tw-text-color tw:text-[14px]">
                    ----
                  </div>
                </div>
              </div>
              <!-- awaiting invoices -->
              <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:mt-2! tw:2xl:mt-2!">
                <div class="tw:flex tw:justify-start tw:items-center">
                  <div>
                    <icon-hourglass class="tw-text-color-lighter tw:text-[20px]" />
                  </div>
                  <div class="tw:flex tw-text-color-lighter tw:text-[13px]/5">
                    {{ langStore.label.table.awaitingPayment }} :
                  </div>
                  <div v-if="item.totalAwaitingPrice > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color tw:text-[14px] tw:gap-1">
                    {{ separateNumber(item.totalAwaitingPrice) }}
                    <div class="tw:text-[13px]">
                      {{ langStore.label.caption.rial }}
                    </div>
                  </div>
                  <div v-else class="tw-text-color tw:text-[14px] tw:ms-1!">
                    ----
                  </div>
                </div>
                <div class="tw:flex tw:justify-start tw:items-center">
                  <div v-if="item.awaitingInvoicesCount > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color tw:text-[14px] tw:gap-1">
                    {{ item.awaitingInvoicesCount }}
                    <div class="tw:text-[13px]">
                      {{ langStore.label.caption.invoice }}
                    </div>
                  </div>
                  <div v-else class="tw-text-color tw:text-[14px]">
                    ----
                  </div>
                </div>
              </div>
              <!-- total invoces -->
              <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:mt-2! tw:2xl:mt-2!">
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                  <div>
                    <icon-cash class="tw-text-color-lighter tw:text-[20px]" />
                  </div>
                  <div class="tw:flex tw-text-color-lighter tw:text-[13px]/5">
                    {{ langStore.label.table.totalPrice }} :
                  </div>
                  <div v-if="item.totalPrice > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color tw:text-[14px] tw:gap-1">
                    {{ separateNumber(item.totalPrice) }}
                    <div class="tw:text-[13px]">
                      {{ langStore.label.caption.rial }}
                    </div>
                  </div>
                  <div v-else class="tw-text-color tw:text-[14px] tw:ms-1!">
                    ----
                  </div>
                </div>
                <div class="tw:flex tw:justify-start tw:items-center">
                  <div v-if="item.invoicesCount > 0"
                    class="tw:flex tw:justify-center tw:items-center tw-text-color tw:text-[14px] tw:gap-1">
                    {{ item.invoicesCount }}
                    <div class="tw:text-[13px]">
                      {{ langStore.label.caption.invoice }}
                    </div>
                  </div>
                  <div v-else class="tw-text-color tw:text-[14px]">
                    ----
                  </div>
                </div>
              </div>
            </div>

            <!-- view detail -->
            <div @click="loadInvoices(item, 'new')" class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:lg:mt-3!">
              <v-btn size=" x-small" variant="outlined" rounded="pill"
                class="tw:px-0! tw:py-0.75! tw:2xl:py-0.75! tw:w-23">
                <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                  {{ langStore.label.button.viewDetail }}
                </div>
              </v-btn>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="companies-pagination-swiper tw:flex tw:justify-center tw:translate-y-3 tw:items-center"></div>
  </v-col>
  <v-col cols="12" class="tw:p-0! tw:pt-5!">
    <transition name="fade">
      <v-card v-if="showInvoicesTabel && invoices && invoices.length > 0" class="tw:shadow-none! tw:bg-transparent!">
        <v-data-table-virtual :headers="invoicesTableHeader" :items="invoices" hide-default-footer fixed-header
          height="430" class="tw:bg-primary-light! tw:dark:bg-background-dark! tw:rounded-4xl!">
          <template #item="{ item, index }">
            <tr class="tw:my-2!">
              <td>
                <div
                  class="tw:bg-primary-dark tw:dark:bg-primary-light tw:text-primary-light tw:dark:text-background-dark tw-text-[16px] tw:w-7 tw:h-7 tw:rounded-full tw:flex tw:justify-center tw:items-center">
                  {{ index + 1 }}
                </div>
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.invoiceNumber }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.localDate }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.companyName }}
              </td>
              <td class="tw:w-auto!">
                <div class="tw:flex tw:justify-center">
                  <div
                    class="tw:flex tw:justify-center tw:w-28.75! tw:gap-2 tw:py-0.75! tw:px-3! tw:border tw:border-gray-400 tw:dark:border-gray-500 tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-full">
                    <icon-bank v-if="item.companyType == CompanyType.legalEntity"
                      class="tw-text-color-lighter tw:text-[17px]" />
                    <icon-user v-if="item.companyType == CompanyType.individual"
                      class="tw-text-color-lighter tw:text-[17px]" />
                    <div class="tw-text-color-lighter tw:text-[12px]">
                      {{
                        item.companyType == CompanyType.legalEntity
                          ? langStore.label.table.legalEntity
                          : langStore.label.table.individual
                      }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="tw:flex tw:justify-center tw:items-center">
                <div
                  class="tw:flex tw:justify-center tw:items-center tw:w-37! tw:gap-2 tw:py-0.75! tw:px-3! tw:rounded-full"
                  :class="{
                    'tw:bg-success/10 tw:border tw:border-success/40 tw:text-success tw:dark:text-green-500':
                      item.paymentStatus == Status.paid,
                    'tw:bg-gray-100 tw:dark:bg-gray-800 tw:border tw:border-gray-400 tw:dark:border-gray-500 tw-text-color-lighter':
                      item.paymentStatus == Status.awaitingPayment,
                  }">
                  <icon-check-double v-if="item.paymentStatus == Status.paid" class="tw:text-[20px]" />
                  <icon-hourglass v-if="item.paymentStatus == Status.awaitingPayment" class="tw:text-[15px]" />
                  <div class="tw:text-[12px]">
                    {{
                      item.paymentStatus == Status.paid
                        ? langStore.label.table.paid
                        : langStore.label.table.awaitingPayment
                    }}
                  </div>
                </div>
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ separateNumber(item.totalPrice) }}
              </td>
              <td>
                <div class="tw:flex tw:justify-center tw:items-center">
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-btn @click="loadInvoiceItems(item)" v-bind="props" size="x-small" variant="text" rounded="pill"
                        class="tw:w-8! tw:h-8! tw:px-0!">
                        <icon-list class="tw-text-color-lighter tw:text-[23px]" />
                      </v-btn>
                    </template>
                    <span class="tw:text-xs tw:p-2">{{
                      langStore.label.button.viewDetail
                    }}</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </template>

          <template #no-data>
            <div class="tw:h-full! tw:flex tw:justify-center tw:items-center tw:gap-2">
              <icon-row-chart class="tw-text-color-lighter tw:text-[35px]" />
              <div class="tw-text-color-lighter tw:text-[14px] tw:lg:text-[16px] tw:2xl:text-[18px] tw:text-nowrap">
                {{ langStore.label.caption.noDataFound }}
              </div>
            </div>
          </template>
        </v-data-table-virtual>
      </v-card>
    </transition>
    <transition name="fade">
      <v-card v-if="showInvoiceItemsTabel && invoiceItems.length > 0" class="tw:rounded-4xl! tw:shadow-none!">
        <v-data-table-virtual :headers="invoiceItemsTableHeader" :items="invoiceItems" hide-default-footer fixed-header
          class="tw:bg-primary-light! tw:dark:bg-background-dark! tw:rounded-4xl!" height="430">
          <template #item="{ item, index }">
            <tr class="tw:my-2!">
              <td>
                <div
                  class="tw:bg-primary-dark tw:dark:bg-primary-light tw:text-primary-light tw:dark:text-primary-dark tw-text-[16px] tw:w-7 tw:h-7 tw:rounded-full tw:flex tw:justify-center tw:items-center">
                  {{ index + 1 }}
                </div>
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.localDate }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{
                  item.isEdit
                    ? langStore.label.table.edit
                    : langStore.label.table.design
                }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.categoryName }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.productName }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.brandName }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.packagingName }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.unitName }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.amount }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.unitCount }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.pageCount }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ separateNumber(item.singlePrice) }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ separateNumber(item.totalPrice) }}
              </td>
              <td class="tw-text-color tw:text-nowrap tw:text-center">
                {{ item.description }}
              </td>
            </tr>
          </template>

          <template #no-data>
            <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
              <icon-row-chart class="tw-text-color-lighter tw:text-[35px]" />
              <div class="tw-text-color-lighter tw:text-[14px] tw:lg:text-[16px] tw:2xl:text-[18px] tw:text-nowrap">
                {{ langStore.label.caption.noDataFound }}
              </div>
            </div>
          </template>
        </v-data-table-virtual>
      </v-card>
    </transition>
    <transition name="fade">
      <v-card v-if="!showInvoicesTabel && !showInvoiceItemsTabel"
        class="tw:rounded-2xl! tw:bg-primary-light! tw:dark:bg-background-dark! tw:p-6 tw:h-[430px]!">
        <div class="tw:h-full! tw:flex tw:justify-center tw:items-center tw:gap-2">
          <icon-row-chart class="tw-text-color-lighter tw:text-[35px]" />
          <div class="tw-text-color-lighter tw:text-[14px] tw:lg:text-[16px] tw:2xl:text-[18px] tw:text-nowrap">
            {{ langStore.label.caption.noDataFound }}
          </div>
        </div>
      </v-card>
    </transition>
  </v-col>
  </v-row>
  </v-container>
  </div>
</template>

<script setup lang="ts">
// ====== Imports ======
// swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ====== Store ======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useReportStore } from "~/store/report";
const reportStore = useReportStore();
const { companiesResult: report, invoicesResult: invoices, invoiceItemsResult: invoiceItems } = storeToRefs(reportStore);

// ====== Composable ======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.reports);
});
const { separateNumber } = useSeparator();

// ======= TS types and interface =======
type LoadInvoiceType = "new" | "prev";

enum CompanyType {
  legalEntity = 1,
  individual = 2,
}
enum Status {
  paid = 1,
  awaitingPayment = 2,
}

// ======= Data =======
const companyId = ref<string | null>(null)
const companyName = ref<string | null>()
const invoiceNumber = ref<number | null>(null)
// slider keys
const companiesSliderKey = ref<number>(1);
// table
const showInvoicesTabel = ref<boolean>(false)
const showInvoiceItemsTabel = ref<boolean>(false)
const invoicesTableHeader = computed(() => [
  {
    title: langStore.label.table.row,
    key: "row",
    align: "start",
    sortable: false,
  },
  {
    title: langStore.label.table.invoiceNumber,
    key: "invoiceNumber",
    align: "center",
  },
  {
    title: langStore.label.table.date,
    key: "localDate",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.company,
    key: "companyName",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.companyType,
    key: "companyType",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.status,
    key: "status",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.totalPrice,
    key: "totalPrice",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.actions,
    key: "actions",
    align: "center",
    sortable: false,
  },
] as const);

const invoiceItemsTableHeader = computed(() => [
  {
    title: langStore.label.table.row,
    key: "row",
    align: "start",
    sortable: false,
  },
  {
    title: langStore.label.table.date,
    key: "localDate",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.type,
    key: "type",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.categoty,
    key: "categotyName",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.product,
    key: "productName",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.brand,
    key: "brandName",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.packaging,
    key: "packagingName",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.unit,
    key: "unitName",
    align: "center",
    sortable: false,
  },
  {
    title: langStore.label.table.amount,
    key: "amount",
    align: "center",
  },
  {
    title: langStore.label.table.unitCount,
    key: "unitCount",
    align: "center",
  },
  {
    title: langStore.label.table.pageCount,
    key: "pageCount",
    align: "center",
  },
  {
    title: langStore.label.table.singlePrice,
    key: "singlePrice",
    align: "center",
  },
  {
    title: langStore.label.table.totalPrice,
    key: "totalPrice",
    align: "center",
  },
  {
    title: langStore.label.table.description,
    key: "description",
    align: "center",
  },
] as const);

// ====== Functions ======
const loadReport = () => {
  reportStore.getCompanies();
};
const loadInvoices = (item: any, type: LoadInvoiceType) => {

  if (type === "new") {
    companyId.value = item.companyId
    companyName.value = item.companyName
    invoiceNumber.value = null
  } else if (type === "prev") {
    invoiceNumber.value = null
  }

  reportStore.getInvoices(companyId.value as string);
};
const loadInvoiceItems = (item: any) => {
  invoiceNumber.value = item.invoiceNumber
  reportStore.getInvoiceItems(item.id as string)
}

// ======= Watcher =======
watch(
  () => langStore.currentLang,
  () => {
    companiesSliderKey.value += 1;
  },
);
watch(invoices, (val) => {
  if (!val) return;
  showInvoicesTabel.value = true
  showInvoiceItemsTabel.value = false
});
watch(invoiceItems, (val) => {
  if (!val) return;
  showInvoiceItemsTabel.value = true
  showInvoicesTabel.value = false
});

// ====== Lifecycle ======
onMounted(() => {
  loadReport();
});
</script>

<style scoped>
/* swiper */
:deep(.swiper-pagination-bullet) {
  width: 8px !important;
  height: 8px !important;
  border-radius: 999px !important;
  margin-inline: 3px !important;
  background-color: #1d202e !important;
}

:deep(.dark .swiper-pagination-bullet) {
  background-color: white !important;
}

/* fade button */
.fade-enter-active {
  transition: opacity 150ms ease;
}

.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
