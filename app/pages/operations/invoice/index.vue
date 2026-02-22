<template>
  <div>
    <v-container class="tw:md:pe-0! tw:md:py-0!">
      <v-row
        class="tw-flex! tw:items-center! tw:bg-primary-dark tw:rounded-t-4xl! tw:p-3!"
      >
        <v-col cols="12" md="3">
          <div>
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
              <icon-document class="tw-text-color-reverse tw:text-[32px]" />
              <div
                class="tw-text-color-reverse tw:text-[20px] tw:lg:text-[22px] tw:2xl:text-[25px] tw:text-nowrap"
              >
                {{ langStore.label.title.manageInvocies }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:text-justify tw:text-[14px]/6 tw:2xl:text-[15px]/5 tw:mt-2! tw:text-nowrap"
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
              <v-btn color="white" rounded="pill" class="tw:h-10!">
                <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
                  <icon-plus-circle class="tw:text-[18px] tw:2xl:text-[18px]" />
                  <div class="tw:text-[14px] tw:2xl:text-[15px]">
                    {{ langStore.label.button.createProduct }}
                  </div>
                </div>
              </v-btn>
              <v-btn
                @click="showFilter = !showFilter"
                color="white"
                rounded="pill"
                class="tw:h-10!"
              >
                <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
                  <icon-filter class="tw:text-[18px] tw:2xl:text-[18px]" />
                  <div class="tw:text-[14px] tw:2xl:text-[15px]">
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
      </v-row>
      <v-row class="tw:rounded-b-4xl! tw:p-0!">
        <v-col cols="12" class="tw:p-0!">
          <v-card class="tw:rounded-b-4xl! tw:shadow-none!">
            <v-data-table
              :headers="tableHeader"
              :items="invoices"
              hide-default-footer
              class="tw:bg-white! tw:dark:bg-primary-dark! tw:h-full"
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
                  <td class="tw-text-color tw:text-nowrap">
                    {{ item.invoiceNumber }}
                  </td>
                  <td class="tw-text-color tw:text-nowrap">
                    {{ item.localDate }}
                  </td>
                  <td class="tw-text-color tw:text-nowrap">
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
                      <icon-check
                        v-if="item.status == Status.paid"
                        class="tw:text-[17px]"
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
                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
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
                        <span class="tw:text-xs tw:p-2">{{
                          langStore.label.button.changeStatus
                        }}</span>
                      </v-tooltip>
                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <v-btn
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
                <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
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
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// ======= Imports =======
// stores
import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();
const { loadingBtn: loading } = storeToRefs(handlerStore);

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useDeopdownStore } from "~/store/dropdown";
const dropdownStore = useDeopdownStore();

import { useOperationStore } from "~/store/operation";
const operationStore = useOperationStore();
const { invoicesResult: invoices, invoiceResult: invoice } =
  storeToRefs(operationStore);

// ======= TS types and interface =======
enum CompanyType {
  legalEntity = 1,
  individual = 2,
}
enum Status {
  paid = 1,
  awaitingPayment = 2,
}

interface Filter {
  fromDate: string | null;
  toDate: string | null;
  status: Status | null;
  companyType: CompanyType | null;
}

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.invoices);
});

// ======= Data =======
// table
const tableHeader = ref<any>([
  {
    title: langStore.label.table.row,
    key: "row",
    align: "start",
  },
  {
    title: langStore.label.table.invoiceNumber,
    key: "invoiceNumber",
    align: "start",
  },
  {
    title: langStore.label.table.date,
    key: "localDate",
    align: "start",
  },
  {
    title: langStore.label.table.company,
    key: "companyName",
    align: "start",
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

// ======= Functions =======
// invoices
const loadInvoices = async () => {
  await operationStore.getInvoices();
};

// universal
const reloadData = () => {
  loadInvoices();
};

// ======= Lifecycle =======
onMounted(() => {
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
</style>
