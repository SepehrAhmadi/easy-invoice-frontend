<template>
  <div>
    <v-container class="tw:md:pe-0! tw:md:py-0!">
      <v-row
        class="tw-flex! tw:items-center! tw:bg-primary-dark tw:rounded-t-4xl! tw:p-3!"
      >
        <v-col cols="12" md="3">
          <div>
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
              <icon-document-add
                v-if="operationStore.invoiceMode == 'add'"
                class="tw-text-color-reverse header-icon"
              />
              <icon-document-edit
                v-else-if="operationStore.invoiceMode == 'edit'"
                class="tw-text-color-reverse header-icon"
              />
              <div class="tw-text-color-reverse header-title tw:text-nowrap">
                {{
                  operationStore.invoiceMode == "add"
                    ? langStore.label.page.addInvoice
                    : langStore.label.page.editInvoice
                }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
            >
              {{ langStore.label.description.manageInvocies }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="2" xl="3" class="tw:hidden tw:2xl:block"></v-col>
        <v-col cols="12" md="7" xl="6">
          <div
            class="tw:w-full! tw:flex tw:justify-between tw:md:justify-end tw:items-start tw:md:items-center tw:gap-4!"
          >
            <transition name="fade" @after-leave="onFadeLeave">
              <div
                v-if="!showInvoiceFormExpand && !isAnimating"
                class="tw:w-full! tw:flex tw:justify-between tw:md:justify-end tw:items-start tw:md:items-center tw:gap-2"
              >
                <div
                  class="tw:flex tw:flex-col tw:md:flex-row tw:justify-center tw:items-start tw:md:items-center tw:gap-3"
                >
                  <div
                    class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                  >
                    <icon-date class="tw-text-color-reverse tw:text-[23px]" />
                    <div
                      class="tw-text-color-reverse tw:text-[14px] tw:text-nowrap"
                    >
                      {{ langStore.label.form.date }}:
                    </div>
                    <div
                      class="tw-text-color-reverse tw:text-[16px] tw:text-nowrap"
                    >
                      {{ invoice.localDate }}
                    </div>
                  </div>
                  <div
                    class="tw:hidden tw:md:block tw-text-color-reverse tw:text-[20px]"
                  >
                    |
                  </div>
                  <div
                    class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                  >
                    <icon-building
                      v-if="invoice.companyType == CompanyType.legalEntity"
                      class="tw-text-color-reverse tw:text-[23px]"
                    />
                    <icon-user
                      v-else-if="invoice.companyType == CompanyType.individual"
                      class="tw-text-color-reverse tw:text-[23px]"
                    />
                    <div
                      class="tw-text-color-reverse tw:text-[14px] tw:text-nowrap"
                    >
                      {{
                        invoice.companyType == CompanyType.legalEntity
                          ? langStore.label.form.company
                          : langStore.label.form.fullName
                      }}:
                    </div>
                    <div
                      class="tw-text-color-reverse tw:text-[16px] tw:text-nowrap"
                    >
                      {{ invoice.companyName }}
                    </div>
                  </div>
                </div>
                <v-btn
                  @click="openInvoiceForm()"
                  color="white"
                  class="tw:rounded-full! tw:text-primary-dark! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
                  icon
                >
                  <icon-edit class="tw:text-[20px]" />
                </v-btn>
              </div>
            </transition>
            <transition name="expand-btn" @after-leave="onExpandLeave">
              <v-row v-if="showInvoiceFormExpand" class="tw:px-0!">
                <v-col cols="12" md="5" class="tw:md:px-1.5!">
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
                <v-col cols="12" md="5" class="tw:md:px-1.5!">
                  <v-autocomplete
                    v-model="invoiceForm.companyId"
                    :items="dropdownStore.companiesOptions"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="tw:text-[14px] tw:text-white!"
                    rounded="pill"
                  >
                    <template #label>
                      <span class="tw:text-[12px]">
                        {{ langStore.label.form.company }}
                      </span>
                      <span class="tw:text-red-200 tw:text-[10px]">
                        ({{ langStore.label.caption.required }})
                      </span>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                  lg="2"
                  class="tw:flex tw:justify-end tw:md:justify-start tw:items-center tw:gap-2 tw:md:px-1.5!"
                >
                  <v-btn
                    @click="submitInvoice"
                    color="white"
                    class="tw:rounded-full! tw:text-primary-dark! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
                    icon
                  >
                    <icon-check class="tw:text-[20px]" />
                  </v-btn>
                  <v-btn
                    @click="toggleInvoice('close')"
                    color="white"
                    class="tw:rounded-full! tw:text-primary-dark! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
                    icon
                  >
                    <icon-close class="tw:text-[20px]" />
                  </v-btn>
                </v-col>
              </v-row>
            </transition>
            <BackBtn class="tw:hidden! tw:lg:block!" />
          </div>
        </v-col>
        <v-col cols="12">
          <v-row class="tw:items-center tw:mt-1!">
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-radio-group
                v-model="invoiceItemForm.isEdit"
                inline
                density="compact"
                hide-details
                class="tw:flex! tw:justify-center! tw:items-center! tw:gap-3! tw:w-full!"
              >
                <v-radio :value="false" class="tw:text-gray-300! tw:ms-5!">
                  <template #label>
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <div class="tw:text-gray-300! tw:text-[12px]">
                        {{ langStore.label.form.design }}
                      </div>
                    </div>
                  </template>
                </v-radio>
                <v-radio :value="true" class="tw:text-gray-300! tw:ms-5!">
                  <template #label>
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <div class="tw:text-gray-300! tw:text-[12px]">
                        {{ langStore.label.form.edit }}
                      </div>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <div class="tw:relative!">
                <label
                  v-if="invoiceItemForm.localDate"
                  for="date"
                  class="tw:text-[11px] tw:absolute! tw:bg-primary-dark! tw:start-10 tw:-top-1.75 tw:z-10! tw-text-color-reverse"
                >
                  {{ langStore.label.form.date }}
                  <span class="tw:text-red-400 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </label>
                <date-picker
                  v-model="invoiceItemForm.localDate"
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
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-autocomplete
                v-model="product"
                :items="dropdownStore.productsOptions"
                return-object
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
                    {{ langStore.label.form.product }}
                  </span>
                  <span class="tw:text-red-300! tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-autocomplete
                v-model="invoiceItemForm.categoryId"
                :items="dropdownStore.categoriesOptions"
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
                    {{ langStore.label.form.category }}
                  </span>
                  <span class="tw:text-red-300! tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-autocomplete
                v-model="invoiceItemForm.brandId"
                :items="dropdownStore.brandsOptions"
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
                    {{ langStore.label.form.brand }}
                  </span>
                  <span class="tw:text-red-300! tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-autocomplete
                v-model="invoiceItemForm.packagingId"
                :items="dropdownStore.packagingsOptions"
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
                    {{ langStore.label.form.packaging }}
                  </span>
                  <span class="tw:text-red-300! tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-autocomplete
                v-model="invoiceItemForm.unitId"
                :items="dropdownStore.unitsOptions"
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
                    {{ langStore.label.form.unit }}
                  </span>
                  <span class="tw:text-red-300! tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-text-field
                v-model="invoiceItemForm.amount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white! centred-input"
                rounded="pill"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.amount }}
                  </span>
                  <span class="tw:text-red-300 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-text-field
                v-model="invoiceItemForm.unitCount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white! centred-input"
                rounded="pill"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.unitCount }}
                  </span>
                  <span class="tw:text-red-300 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-text-field
                v-model="invoiceItemForm.pageCount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white! centred-input"
                rounded="pill"
                @update:modelValue="calTotalPrice"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.pageCount }}
                  </span>
                  <span class="tw:text-red-300 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-text-field
                v-model="invoiceItemForm.singlePrice"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white! centred-input"
                rounded="pill"
                @update:modelValue="calTotalPrice"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.singlePrice }}
                  </span>
                  <span class="tw:text-red-300 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
                <template #append-inner>
                  <div class="tw:text-[13px] tw:text-gray-400">
                    {{ langStore.label.caption.rial }}
                  </div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="3" xl="2">
              <v-text-field
                v-model="invoiceItemForm.totalPrice"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white! centred-input"
                rounded="pill"
                readonly
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.totalPrice }}
                  </span>
                </template>
                <template #append-inner>
                  <div class="tw:text-[13px] tw:text-gray-400">
                    {{ langStore.label.caption.rial }}
                  </div>
                </template>
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              class="tw:flex tw:justify-end tw:items-center tw:gap-3"
            >
              <v-btn
                @click="resetFields('invoiceItemForm')"
                color="gray"
                class="tw:rounded-full! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
                variant="outlined"
                icon
              >
                <icon-refresh class="tw:text-[20px]" />
              </v-btn>
              <v-btn
                @click="submitInvoiceItem('add')"
                rounded="pill"
                color="white"
                class="tw:px-0! tw:py-1! tw:w-30"
              >
                <icon-button-loader
                  v-if="loading"
                  class="tw:text-[23px]! tw:me-2!"
                />
                <icon-check-double v-else class="tw:text-[23px] tw:me-2!" />
                <div class="tw:text-[12px]">
                  {{ langStore.label.button.save }}
                </div>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="tw:rounded-b-4xl! tw:p-0!">
        <v-col cols="12" class="tw:p-0!">
          <v-card class="tw:rounded-b-4xl! tw:shadow-none!">
            <v-data-table-virtual
              :headers="tableHeader"
              :items="invoiceItems"
              hide-default-footer
              fixed-header
              class="tw:bg-white! tw:dark:bg-primary-dark!"
              height="600"
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
                  <td>
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <v-btn
                            @click="getInvoiceItem(item.id)"
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
const {
  invoiceResult: invoice,
  invoiceItemsResult: invoiceItems,
  invoiceItemResult: invoiceItem,
} = storeToRefs(operationStore);

// date
import moment from "jalali-moment";
const NowDate = moment().locale("fa").format("jYYYY/jMM/jDD");

// ======= enum & TS types and interface =======
type SubmitMode = "add" | "edit";

enum CompanyType {
  legalEntity = 1,
  individual = 2,
}
interface InvoiceForm {
  localDate: string | null;
  companyId: string | null;
}
interface InvoiceItemForm {
  isEdit: boolean;
  localDate: string | null;
  productId: string | null;
  categoryId: string | null;
  brandId: string | null;
  packagingId: string | null;
  unitId: string | null;
  amount: number | null;
  unitCount: number | null;
  pageCount: number | null;
  singlePrice: number | null;
  totalPrice: number | null;
}

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(
    operationStore.invoiceMode == "add"
      ? langStore.label.page.addInvoice
      : langStore.label.page.editInvoice,
  );
});
const { separateNumber } = useSeparator();

// ======= Rotue and Router =======
const route = useRoute();

// ======= Data =======
// invoice animation
const showInvoiceFormExpand = ref(false);
const isAnimating = ref(false);
// modal
const deleteModal = ref<boolean>(false);
// form
const product = ref<any>(null);
const invoiceForm = ref<InvoiceForm>({
  localDate: null,
  companyId: null,
});
const invoiceItemId = ref<string>("");
const invoiceItemForm = ref<InvoiceItemForm>({
  isEdit: false,
  localDate: NowDate,
  productId: null,
  categoryId: null,
  brandId: null,
  packagingId: null,
  unitId: null,
  amount: null,
  unitCount: 1,
  pageCount: 1,
  singlePrice: null,
  totalPrice: null,
});
// table
const tableHeader = ref<any>([
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
    title: langStore.label.table.actions,
    key: "actions",
    align: "center",
    sortable: false,
  },
]);

// ======= Functions =======
// invocie form animation
const toggleInvoice = (type: "open" | "close") => {
  if (type === "open") {
    isAnimating.value = true;
    showInvoiceFormExpand.value = false;
  } else if (type === "close") {
    isAnimating.value = true;
    showInvoiceFormExpand.value = false;
    resetFields("invoiceForm");
  }
};
const onFadeLeave = () => {
  showInvoiceFormExpand.value = true;
  isAnimating.value = false;
};
const onExpandLeave = () => {
  isAnimating.value = false;
};

// invoice
const loadInvoice = () => {
  const id = route.params.id as string;
  if (id) {
    operationStore.getInvoice(id);
  }
};
const loadInvoiceItems = () => {
  const id = route.params.id as string;
  if (id) {
    operationStore.getInvoiceItems(id);
  }
};
const openInvoiceForm = () => {
  if (!showInvoiceFormExpand.value) {
    toggleInvoice("open");
  }
};
const submitInvoice = () => {
  if (invoiceForm.value.companyId && invoiceForm.value.localDate) {
    operationStore.editInvoice(invoice.value.id, invoiceForm.value);
  } else {
    handlerStore.setError(langStore.alert.error.requiredFields);
  }
};
const getInvoiceItem = (id: string) => {
  invoiceItemId.value = id;

  operationStore.getInvoiceItem(invoice.value.id, id);
};
const submitInvoiceItem = (mode?: SubmitMode) => {
  if (mode && mode === "add") {
    console.log("add mode : ", mode);
    if (
      invoiceItemForm.value.localDate &&
      invoiceItemForm.value.productId &&
      invoiceItemForm.value.categoryId &&
      invoiceItemForm.value.brandId &&
      invoiceItemForm.value.packagingId &&
      invoiceItemForm.value.unitId &&
      invoiceItemForm.value.amount &&
      invoiceItemForm.value.unitCount &&
      invoiceItemForm.value.pageCount &&
      invoiceItemForm.value.singlePrice
    ) {
      operationStore.addInvoiceItem(invoice.value.id, invoiceItemForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  } else if (!mode || mode === "edit") {
    console.log("edit mode : ", mode);
    if (
      invoiceItemForm.value.localDate &&
      invoiceItemForm.value.productId &&
      invoiceItemForm.value.categoryId &&
      invoiceItemForm.value.brandId &&
      invoiceItemForm.value.packagingId &&
      invoiceItemForm.value.unitId &&
      invoiceItemForm.value.amount &&
      invoiceItemForm.value.unitCount &&
      invoiceItemForm.value.pageCount &&
      invoiceItemForm.value.singlePrice
    ) {
      operationStore.editInvoiceItem(
        invoice.value.id,
        invoiceItemId.value,
        invoiceItemForm.value,
      );
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  }
};
const openDeleteModal = (id: string) => {
  invoiceItemId.value = id;
  deleteModal.value = true;
};
const confirmDelete = () => {
  operationStore.deleteInvoiceItem(invoice.value.id, invoiceItemId.value);
};
const calTotalPrice = () => {
  const price = invoiceItemForm.value.singlePrice ?? 0;
  const count = invoiceItemForm.value.pageCount ?? 1;

  invoiceItemForm.value.totalPrice = price * count;
};

// universal
const reloadData = async () => {
  loadInvoice();
  loadInvoiceItems();
  close();
};
const resetFields = (mode?: "invoiceItemForm" | "invoiceForm") => {
  if (mode === "invoiceItemForm") {
    product.value = null;
    invoiceItemId.value = "";
    invoiceItemForm.value = {
      isEdit: false,
      localDate: NowDate,
      productId: null,
      categoryId: null,
      brandId: null,
      packagingId: null,
      unitId: null,
      amount: null,
      unitCount: 1,
      pageCount: 1,
      singlePrice: null,
      totalPrice: null,
    };

    return;
  }
  if (mode === "invoiceForm") {
    invoiceForm.value = {
      localDate: null,
      companyId: null,
    };
    return;
  }

  product.value = null;
  invoiceItemId.value = "";
  invoiceItemForm.value = {
    isEdit: false,
    localDate: NowDate,
    productId: null,
    categoryId: null,
    brandId: null,
    packagingId: null,
    unitId: null,
    amount: null,
    unitCount: 1,
    pageCount: 1,
    singlePrice: null,
    totalPrice: null,
  };
  invoiceForm.value = {
    localDate: null,
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
      if (showInvoiceFormExpand.value) {
        toggleInvoice("close");
      }
      resetFields();
    }
  },
);
watch(showInvoiceFormExpand, (val) => {
  invoiceForm.value.localDate = invoice.value.localDate;
  invoiceForm.value.companyId = invoice.value.companyId;
});
watch(product, (val) => {
  if (val) {
    invoiceItemForm.value.productId = product.value.value;

    invoiceItemForm.value.brandId = product.value.brandId;
    invoiceItemForm.value.packagingId = product.value.packagingId;
    invoiceItemForm.value.unitId = product.value.unitId;
    invoiceItemForm.value.amount = product.value.unitAmount;
  }
});
watch(invoiceItem, (val) => {
  if (val) {
    invoiceItemForm.value.isEdit = !!val.isEdit;
    invoiceItemForm.value.localDate = val.localDate;
    invoiceItemForm.value.productId = val.productId;
    product.value =
      dropdownStore.productsOptions.find(
        (item) => item.value === val.productId,
      ) || null;
    invoiceItemForm.value.categoryId = val.categoryId;
    invoiceItemForm.value.brandId = val.brandId;
    invoiceItemForm.value.packagingId = val.packagingId;
    invoiceItemForm.value.unitId = val.unitId;
    invoiceItemForm.value.amount = val.amount;
    invoiceItemForm.value.unitCount = val.unitCount;
    invoiceItemForm.value.pageCount = val.pageCount;
    invoiceItemForm.value.singlePrice = val.singlePrice;

    invoiceItemForm.value.totalPrice = val.singlePrice * val.pageCount;
  }
});

// ======= Lifecycle =======
onMounted(() => {
  dropdownStore.getPackagings();
  dropdownStore.getUnits();
  dropdownStore.getCompanies();
  dropdownStore.getBrands();
  dropdownStore.getProducts();
  dropdownStore.getCategories();
  loadInvoice();
});
</script>

<style scoped>
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

/* expand from button (LEFT side) */
/* expand button */
/* expand enter */
html[dir="rtl"] .expand-btn-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

html[dir="ltr"] .expand-btn-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.expand-btn-enter-active {
  transition: all 250ms ease;
}

.expand-btn-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* expand leave */
.expand-btn-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.expand-btn-leave-active {
  transition: all 350ms ease;
}

html[dir="rtl"] .expand-btn-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

html[dir="ltr"] .expand-btn-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
