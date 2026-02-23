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
                class="tw-text-color-reverse tw:text-[35px]"
              />
              <icon-document-edit
                v-else-if="operationStore.invoiceMode == 'edit'"
                class="tw-text-color-reverse tw:text-[35px]"
              />
              <div
                class="tw-text-color-reverse tw:text-[20px] tw:lg:text-[22px] tw:2xl:text-[25px] tw:text-nowrap"
              >
                {{
                  operationStore.invoiceMode == "add"
                    ? langStore.label.page.addInvoice
                    : langStore.label.page.editInvoice
                }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:text-justify tw:text-[14px]/6 tw:2xl:text-[15px]/5 tw:mt-2! tw:text-nowrap"
            >
              {{ langStore.label.description.manageInvocies }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="9" xl="3" class="tw:hidden tw:2xl:block"></v-col>
        <v-col cols="12" md="9" xl="6">
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
            <v-col cols="12" md="6" lg="2">
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
            <v-col cols="12" md="6" lg="2">
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
            <v-col cols="12" md="6" lg="2">
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
            <v-col cols="12" md="6" lg="2">
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
            <v-col cols="12" md="6" lg="2">
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
            <v-col cols="12" md="6" lg="2">
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
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="invoiceItemForm.amount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white!"
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
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="invoiceItemForm.unitCount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white!"
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
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="invoiceItemForm.pageCount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white!"
                rounded="pill"
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
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="invoiceItemForm.singlePrice"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white!"
                rounded="pill"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.singlePrice }}
                  </span>
                  <span class="tw:text-red-300 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="invoiceItemForm.totalPrice"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]! tw:text-white!"
                rounded="pill"
                readonly
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.totalPrice }}
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              lg="2"
              class="tw:flex tw:justify-end tw:items-center tw:gap-3"
            >
              <v-btn
                color="gray"
                class="tw:rounded-full! tw:w-9! tw:h-9! tw:min-w-0! tw:p-0!"
                variant="outlined"
                icon
              >
                <icon-refresh class="tw:text-[20px]" />
              </v-btn>
              <v-btn
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
const { invoiceResult: invoice } = storeToRefs(operationStore);

// date
import moment from "jalali-moment";
const NowDate = moment().locale("fa").format("jYYYY/jMM/jDD");

// ======= enum & TS types and interface =======
type submitMode = "add" | "edit";

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

// ======= Rotue and Router =======
const route = useRoute();

// ======= Data =======
// invoice animation
const showInvoiceFormExpand = ref(false);
const isAnimating = ref(false);
// form
const product = ref<any>(null);
const invoiceForm = ref<InvoiceForm>({
  localDate: null,
  companyId: null,
});
const invoiceItemId = ref<string | null>(null);
const invoiceItemForm = ref<InvoiceItemForm>({
  isEdit: false,
  localDate: NowDate,
  productId: null,
  brandId: null,
  packagingId: null,
  unitId: null,
  amount: null,
  unitCount: 1,
  pageCount: 1,
  singlePrice: null,
  totalPrice: null,
});

// ======= Functions =======
// invocie form animation
const toggleInvoice = (type: "open" | "close") => {
  if (type === "open") {
    isAnimating.value = true;
    showInvoiceFormExpand.value = false;
  } else if (type === "close") {
    isAnimating.value = true;
    showInvoiceFormExpand.value = false;
    resetFields();
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
const submitInvoiceItem = () => {
  if(
    invoiceItemForm.value.localDate &&
    invoiceItemForm.value.productId &&
    invoiceItemForm.value.brandId &&
    invoiceItemForm.value.packagingId &&
    invoiceItemForm.value.unitId &&
    invoiceItemForm.value.amount &&
    invoiceItemForm.value.unitCount &&
    invoiceItemForm.value.pageCount &&
    invoiceItemForm.value.singlePrice
  ){

  }else { 
    handlerStore.setError(langStore.alert.error.requiredFields);
  }
}

// product

// universal
const reloadData = async () => {
  loadInvoice();
};
const resetFields = () => {
  invoiceForm.value = {
    localDate: null,
    companyId: null,
  };
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

// ======= Lifecycle =======
onMounted(() => {
  dropdownStore.getPackagings();
  dropdownStore.getUnits();
  dropdownStore.getCompanies();
  dropdownStore.getBrands();
  dropdownStore.getProducts();
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
  transform: translateX(-100%);
}
html[dir="ltr"] .expand-btn-enter-from {
  opacity: 0;
  transform: translateX(100%);
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
  transform: translateX(-100%);
}
html[dir="ltr"] .expand-btn-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
