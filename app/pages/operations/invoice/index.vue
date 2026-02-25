<template>
  <div>
    <v-container class="tw:md:pe-0! tw:md:py-0!">
      <v-row
        class="tw-flex! tw:items-center! tw:bg-primary-dark tw:rounded-t-4xl! tw:p-3!"
      >
        <v-col cols="12" md="3">
          <div>
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
              <icon-document class="tw-text-color-reverse header-icon" />
              <div
                class="tw-text-color-reverse header-titlet tw:text-nowrap"
              >
                {{ langStore.label.title.manageInvocies }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
            >
              {{ langStore.label.description.manageInvocies }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="tw:flex tw:md:justify-end tw:items-center tw:gap-4"
            >
              <v-btn
                @click="toggleSubmitForm"
                color="white"
                rounded="pill"
                class="tw:h-10!"
              >
                <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
                  <icon-plus-circle class="tw:text-[18px] tw:2xl:text-[18px]" />
                  <div class="tw:text-[13px] tw:3xl:text-[15px]">
                    {{ langStore.label.button.createProduct }}
                  </div>
                </div>
              </v-btn>
              <v-btn
                @click="toggleFilter"
                color="white"
                rounded="pill"
                class="tw:h-10!"
              >
                <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
                  <icon-filter class="tw:text-[18px] tw:2xl:text-[18px]" />
                  <div class="tw:text-[13px] tw:3xl:text-[15px]">
                    {{ langStore.label.button.filter }}
                  </div>
                </div>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                variant="solo"
                density="compact"
                hide-details
                class="tw:text-[14px]!"
                bg-color="white"
                rounded="pill"
                :placeholder="langStore.label.form.search"
              >
                <template #append-inner>
                  <icon-magnify class="tw-text-color tw:text-[25px] tw:me-1!" />
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <!-- filter -->
        <transition name="toggle-slide">
          <v-col cols="12" v-show="showFilter">
            <div
              class="default-scroll tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-4 tw:gap-6"
            >
              <div class="tw:relative!">
                <label
                  v-if="filter.fromDate"
                  for="formDate"
                  class="tw:text-[11px] tw:absolute! tw:bg-primary-dark! tw:start-10 tw:-top-1.75 tw:z-10! tw-text-color-reverse"
                  >{{ langStore.label.form.fromDate }}</label
                >
                <date-picker
                  v-model="filter.fromDate"
                  id="formDate"
                  simple
                  :placeholder="langStore.label.form.fromDate"
                  format="jYYYY/jMM/jDD"
                  display-format="jYYYY/jMM/jDD"
                  class="default-scroll tw:text-gray-300! tw:text-[14px]! tw:text-center!"
                  clearable
                  color="#1d202e"
                />
              </div>
              <div class="tw:relative!">
                <label
                  v-if="filter.toDate"
                  for="toDate"
                  class="tw:text-[11px] tw:absolute! tw:bg-primary-dark! tw:start-10 tw:-top-1.75 tw:z-10! tw-text-color-reverse"
                  >{{ langStore.label.form.toDate }}</label
                >
                <date-picker
                  v-model="filter.toDate"
                  id="toDate"
                  simple
                  :placeholder="langStore.label.form.toDate"
                  format="jYYYY/jMM/jDD"
                  display-format="jYYYY/jMM/jDD"
                  class="default-scroll tw:text-gray-300! tw:text-[14px]! tw:text-center!"
                  clearable
                  color="#1d202e"
                />
              </div>
              <v-autocomplete
                item-title="text"
                item-value="value"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]! tw:text-white!"
                rounded="pill"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.status }}
                  </span>
                </template>
              </v-autocomplete>
              <v-autocomplete
                item-title="text"
                item-value="value"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]! tw:text-white!"
                rounded="pill"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.companyType }}
                  </span>
                </template>
              </v-autocomplete>
            </div>
          </v-col>
        </transition>
        <transition name="toggle-slide">
          <v-col cols="12" v-show="showSubmitForm">
            <v-row class="tw:flex tw:items-center!">
              <v-col cols="12" lg="3" 2xl="2">
                <div class="tw:relative!">
                  <label
                    v-if="invoiceForm.localDate"
                    for="date"
                    class="tw:text-[11px] tw:absolute! tw:bg-primary-dark! tw:start-10 tw:-top-1.75 tw:z-10! tw-text-color-reverse"
                  >
                    {{ langStore.label.form.date }}
                    <span class="tw:text-red-400 tw:text-[10px]">
                      ({{ langStore.label.caption.required }})
                    </span>
                  </label>
                  <date-picker
                    v-model="invoiceForm.localDate"
                    id="date"
                    simple
                    :placeholder="`${langStore.label.form.date} (${langStore.label.caption.required})`"
                    format="jYYYY/jMM/jDD"
                    display-format="jYYYY/jMM/jDD"
                    class="default-scroll tw:text-gray-300! tw:text-[14px]! tw:text-center!"
                    clearable
                    color="#1d202e"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="8" 2xl="9">
                <v-row class="tw:flex tw:items-center!">
                  <v-col cols="12" lg="2">
                    <div
                      class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:text-nowrap"
                    >
                      <icon-building
                        class="tw-text-color-reverse tw:text-[30px]"
                      />
                      <div
                        class="tw-text-color-reverse tw:text-[16px] tw:lg:text-[16px] tw:3xl:text-[20px]"
                      >
                        {{ langStore.label.form.company }}
                        <span class="tw:text-red-400 tw:text-[11px] tw:3xl:text-[13px]">
                          ({{ langStore.label.caption.required }})
                        </span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" lg="10">
                    <Swiper
                      class="tw:w-full!"
                      :modules="[Navigation, Pagination]"
                      :slides-per-view="'auto'"
                      :pagination="{
                        el: '.company-pagination-swiper',
                        clickable: false,
                      }"
                      :breakpoints="{
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
                        1280: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                        2160: {
                          slidesPerView: 4,
                          spaceBetween: 20,
                        },
                      }"
                      :key="invoicesSliderKey"
                    >
                      <SwiperSlide v-for="item in companies">
                        <div
                          @click="selectCompany(item.id)"
                          class="tw:cursor-pointer tw:flex tw:justify-center tw:itemd-center tw:gap-2 tw:text-[13px] tw:3xl:text-[15px]! tw:text-gray-300! tw:py-2.25! tw:3xl:py-1.75! tw:px-1! tw:border tw:border-gray-400 tw:rounded-full! tw:group tw:transiton tw:duration-200 tw:ease"
                          :class="{
                            'tw:bg-white tw:text-primary-dark!':
                              item.id === companyId,
                            'tw:hover:bg-gray-800!': item.id !== companyId,
                          }"
                        >
                          <icon-bank
                            v-if="item.type == CompanyType.legalEntity"
                            class="tw:text-gray-300! tw:text-[18px] tw:3xl:text-[20px] tw:transiton tw:duration-200 tw:ease"
                            :class="{
                              'tw:text-primary-dark!': item.id === companyId,
                            }"
                          />
                          <icon-user
                            v-if="item.type == CompanyType.individual"
                            class="tw:text-gray-300! tw:text-[18px] tw:3xl:text-[20px] tw:transiton tw:duration-200 tw:ease"
                            :class="{
                              'tw:text-primary-dark!': item.id === companyId,
                            }"
                          />
                          {{ item.name }}
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" lg="1">
                <div class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:3xl:gap-4">
                  <v-btn
                    @click="submitInvoice"
                    color="white"
                    class="tw:rounded-full! tw:w-9.5! tw:h-9.5! tw:min-w-0! tw:p-0!"
                    icon
                  >
                    <icon-check class="tw:text-[23px] tw:3xl:text-[25px]" />
                  </v-btn>
                  <v-btn
                    @click="showSubmitForm = false"
                    color="white"
                    class="tw:rounded-full! tw:w-9.5! tw:h-9.5! tw:min-w-0! tw:p-0!"
                    icon
                  >
                    <icon-close class="tw:text-[23px] tw:3xl:text-[25px]" />
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </transition>
      </v-row>
      <!-- table -->
      <v-row class="tw:rounded-b-4xl! tw:p-0!">
        <v-col cols="12" class="tw:p-0!">
          <v-card class="tw:rounded-b-4xl! tw:shadow-none!">
            <v-data-table-virtual
              :headers="tableHeader"
              :items="invoices"
              hide-default-footer
              fixed-header
              height="680"
              class="tw:bg-white! tw:dark:bg-primary-dark!"
            >
              <template #item="{ item, index }">
                <tr class="tw:my-2!">
                  <td>
                    <div
                      class="tw:bg-primary-dark tw:dark:bg-primary-light tw:text-primary-light tw:dark:text-primary-dark tw-text-[16px] tw:w-7 tw:h-7 tw:rounded-full tw:flex tw:justify-center tw:items-center"
                    >
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
                        class="tw:flex tw:justify-center tw:w-28.75! tw:gap-2 tw:py-0.75! tw:px-3! tw:border tw:border-gray-400 tw:dark:border-gray-500 tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-full"
                      >
                        <icon-bank
                          v-if="item.companyType == CompanyType.legalEntity"
                          class="tw-text-color-lighter tw:text-[17px]"
                        />
                        <icon-user
                          v-if="item.companyType == CompanyType.individual"
                          class="tw-text-color-lighter tw:text-[17px]"
                        />
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
                          item.status == Status.paid,
                        'tw:bg-gray-100 tw:dark:bg-gray-800 tw:border tw:border-gray-400 tw:dark:border-gray-500 tw-text-color-lighter':
                          item.status == Status.awaitingPayment,
                      }"
                    >
                      <icon-check-double
                        v-if="item.status == Status.paid"
                        class="tw:text-[20px]"
                      />
                      <icon-hourglass
                        v-if="item.status == Status.awaitingPayment"
                        class="tw:text-[15px]"
                      />
                      <div class="tw:text-[12px]">
                        {{
                          item.status == Status.paid
                            ? langStore.label.table.paid
                            : langStore.label.table.awaitingPayment
                        }}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <v-btn
                            @click="navigateToEdit(item.id)"
                            v-bind="props"
                            size="x-small"
                            variant="text"
                            rounded="pill"
                            class="tw:w-8! tw:h-8! tw:px-0!"
                          >
                            <icon-edit-box
                              class="tw-text-color-lighter tw:text-[23px]"
                            />
                          </v-btn>
                        </template>
                        <span class="tw:text-xs tw:p-2">{{
                          langStore.label.button.edit
                        }}</span>
                      </v-tooltip>
                      <v-menu>
                        <template #activator="{ props: menuProps }">
                          <v-tooltip location="top">
                            <template #activator="{ props: tooltipProps }">
                              <v-btn
                                v-bind="{ ...menuProps, ...tooltipProps }"
                                size="x-small"
                                variant="text"
                                rounded="pill"
                                class="tw:w-8! tw:h-8! tw:px-0!"
                              >
                                <icon-sync
                                  class="tw-text-color-lighter tw:text-[23px]"
                                />
                              </v-btn>
                            </template>
                            <span class="tw:text-xs tw:p-2">
                              {{ langStore.label.button.changeStatus }}
                            </span>
                          </v-tooltip>
                        </template>
                        <div
                          class="tw:bg-primary-dark! tw:dark:bg-background-dark tw:rounded-lg tw:min-w-37 tw:overflow-hidden tw:py-1!"
                        >
                          <div
                            @click="changeStatus('paid', item.id)"
                            class="tw:cursor-pointer tw:border tw:border-gray-600 tw:dark:border-gray-700"
                          >
                            <div
                              class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group"
                            >
                              <icon-check-double
                                class="tw:w-5 tw:h-5 tw:text-gray-200 tw:dark:text-gray-300 tw:group-hover:text-gray-100 tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
                              />
                              <div
                                class="tw:text-[12px] tw:text-gray-200 tw:dark:text-gray-300 tw:group-hover:text-gray-100 tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
                              >
                                {{ langStore.label.button.paid }}
                              </div>
                            </div>
                          </div>
                          <div
                            @click="changeStatus('awaitingPayment', item.id)"
                            class="tw:cursor-pointer tw:border tw:border-gray-600 tw:dark:border-gray-700"
                          >
                            <div
                              class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group"
                            >
                              <icon-hourglass
                                class="tw:w-4.5 tw:h-4.5 tw:text-gray-200 tw:dark:text-gray-300 tw:group-hover:text-gray-100 tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
                              />
                              <div
                                class="tw:text-[12px] tw:text-gray-200 tw:dark:text-gray-300 tw:group-hover:text-gray-100 tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
                              >
                                {{ langStore.label.button.awaitingPayment }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </v-menu>

                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <v-btn
                            @click="openDeleteModal(item.id)"
                            v-bind="props"
                            size="x-small"
                            variant="text"
                            rounded="pill"
                            class="tw:w-8! tw:h-8! tw:px-0!"
                          >
                            <icon-trash
                              class="tw-text-color-lighter tw:text-[23px]"
                            />
                          </v-btn>
                        </template>
                        <span class="tw:text-xs tw:p-2">{{
                          langStore.label.button.delete
                        }}</span>
                      </v-tooltip>
                    </div>
                  </td>
                </tr>
              </template>

              <template #no-data>
                <div
                  class="tw:h-full! tw:flex tw:justify-center tw:items-center tw:gap-2"
                >
                  <icon-row-chart
                    class="tw-text-color-lighter tw:text-[35px]"
                  />
                  <div
                    class="tw-text-color-lighter tw:text-[14px] tw:lg:text-[16px] tw:2xl:text-[18px] tw:text-nowrap"
                  >
                    {{ langStore.label.caption.noDataFound }}
                  </div>
                </div>
              </template>
            </v-data-table-virtual>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- delete modal -->
    <v-dialog v-model="deleteModal" max-width="400" class="blur-dialog">
      <v-card class="tw:rounded-2xl!">
        <v-card-text class="tw:p-3! tw:mt-4!">
          <v-row>
            <v-col cols="12">
              <div class="tw:text-center tw:text-[15px]">
                {{ langStore.label.description.deleteConfirm }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="tw:px-4!">
          <div
            class="tw:w-full tw:flex tw:justify-end tw:items-center tw:gap-1"
          >
            <v-btn
              @click="close"
              variant="plain"
              rounded="lg"
              class="tw-text-color py-0"
            >
              <div class="tw:text-[12px]">
                {{ langStore.label.button.cancel }}
              </div>
            </v-btn>
            <v-btn
              @click="confirmDelete"
              size=""
              rounded="lg"
              class="tw:border! tw:bg-error/15! tw:text-error! tw:border-error! tw:px-0! tw:py-1! tw:w-20"
            >
              <icon-button-loader
                v-if="loading"
                class="tw:text-[20px]! tw:me-2!"
              />
              <icon-check-double v-else class="tw:text-[20px] tw:me-2!" />
              <div class="tw:text-[12px]">
                {{ langStore.label.button.delete }}
              </div>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
// ======= Imports =======
// swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// stores
import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();
const { loadingBtn: loading } = storeToRefs(handlerStore);

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useDeopdownStore } from "~/store/dropdown";
const dropdownStore = useDeopdownStore();
const { companiesResult: companies } = storeToRefs(dropdownStore);

import { useOperationStore } from "~/store/operation";
const operationStore = useOperationStore();
const { invoicesResult: invoices, invoiceResult: invoice } =
  storeToRefs(operationStore);

// date
import moment from "jalali-moment";
const NowDate = moment().locale("fa").format("jYYYY/jMM/jDD");

// ======= enum & TS types and interface =======
enum CompanyType {
  legalEntity = 1,
  individual = 2,
}
enum Status {
  paid = 1,
  awaitingPayment = 2,
}
type StatusMode = "paid" | "awaitingPayment";

interface Filter {
  fromDate: string | null;
  toDate: string | null;
  status: Status | null;
  companyType: CompanyType | null;
}
interface InvoiceForm {
  localDate: string | null;
  companyId: string | null;
}
interface StatusForm {
  status: Status | null;
}

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.invoices);
});

// ======= Data =======
// slider keys
const invoicesSliderKey = ref<number>(1);
// table
const tableHeader = ref<any>([
  {
    title: langStore.label.table.row,
    key: "row",
    align: "start",
    sortable : "false",
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
    title: langStore.label.table.actions,
    key: "actions",
    align: "center",
    sortable: false,
  },
]);
// filter
const showFilter = ref<boolean>(false);
const filter = ref<Filter>({
  fromDate: null,
  toDate: null,
  status: null,
  companyType: null,
});
// form
const showSubmitForm = ref<boolean>(false);
const companyId = ref<string>("");
const invoiceId = ref<string>("");
const invoiceForm = ref<InvoiceForm>({
  localDate: NowDate,
  companyId: null,
});
const statusForm = ref<StatusForm>({
  status: null,
});
// modal
const deleteModal = ref<boolean>(false);

// ======= Functions =======
// filter
const toggleFilter = () => {
  showFilter.value = !showFilter.value;
  showSubmitForm.value = false;
};
// invoices
const toggleSubmitForm = () => {
  showSubmitForm.value = !showSubmitForm.value;
  showFilter.value = false;
};
const loadInvoices = async () => {
  await operationStore.getInvoices();
};
const selectCompany = (id: string) => {
  companyId.value = id;
};
const submitInvoice = () => {
  invoiceForm.value.companyId = companyId.value;

  if (invoiceForm.value.companyId && invoiceForm.value.localDate) {
    operationStore.addInvoice(invoiceForm.value);
  } else {
    handlerStore.setError(langStore.alert.error.requiredFields);
  }
};
const navigateToEdit = (id: string) => {
  navigateTo({ name: "operations-invoice-id", params: { id: id } });
  operationStore.invoiceMode = "edit";
};
const changeStatus = (mode: StatusMode, id: string) => {
  if (mode == "paid") {
    statusForm.value.status = Status.paid;
    operationStore.changeInvoiceStatus(id, statusForm.value);
  } else if (mode == "awaitingPayment") {
    statusForm.value.status = Status.awaitingPayment;
    operationStore.changeInvoiceStatus(id, statusForm.value);
  }
};
const openDeleteModal = (id: string) => {
  invoiceId.value = id;
  deleteModal.value = true;
};
const confirmDelete = () => {
  operationStore.deleteInvoice(invoiceId.value);
};
// universal
const reloadData = () => {
  loadInvoices();
};
const resetFields = () => {
  companyId.value = "";
  invoiceId.value = "";
  invoiceForm.value = {
    localDate: NowDate,
    companyId: null,
  };
};
const close = () => {
  deleteModal.value = false;
};
// ======= Watchers =======
watch(
  () => handlerStore.postCheck,
  (val, oldVal) => {
    if (oldVal === true && val === false) {
      reloadData();
      close();
      resetFields();
    }
  },
);
watch(
  () => langStore.currentLang,
  () => {
    invoicesSliderKey.value += 1;
  },
);

// ======= Lifecycle =======
onMounted(() => {
  dropdownStore.getCompanies();
  reloadData();
});
</script>

<style scoped>
.toggle-slide-enter-active,
.toggle-slide-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.toggle-slide-enter-from,
.toggle-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.toggle-slide-enter-to,
.toggle-slide-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}

/* swiper */
:deep(.swiper-pagination-bullet) {
  width: 8px !important;
  height: 8px !important;
  border-radius: 999px !important;
  margin-inline: 3px !important;
  background-color: #ff0000 !important;
}

:deep(.dark .swiper-pagination-bullet) {
  background-color: rgb(255, 0, 0) !important;
}
</style>
