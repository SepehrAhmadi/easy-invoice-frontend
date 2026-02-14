<template>
  <div>
    <PageHeader :title="langStore.label.page.baseInfo" />

    <!-- companies -->
    <v-container class="tw:md:pe-0!">
      <v-row class="tw:flex tw:justify-center tw:itesm-center">
        <v-col
          cols="12"
          sm="4"
          md="3"
          class="tw:flex! tw:flex-col tw:justify-between tw:bg-primary-dark tw:dark:bg-primary-dark tw:p-6! tw:rounded-4xl"
        >
          <div class="tw:flex-1">
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
              <icon-building class="tw-text-color-reverse tw:text-[32px]" />
              <div class="tw-text-color-reverse tw:text-[25px]">
                {{ langStore.label.title.manageCompanies }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:dark:text-gray-400 tw:text-[15px]/5 tw:mt-3!"
            >
              {{ langStore.label.description.manageCompanies }}
            </div>
          </div>
          <v-btn
            @click="openCompanyModal('add')"
            color="white"
            class="tw:rounded-full! tw:mt-3!"
          >
            <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
              <icon-plus-circle class="tw:text-[20px]" />
              <div class="tw:text-[15px]">
                {{ langStore.label.button.createCompany }}
              </div>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="8" md="9" class="tw:py-0! tw:lg:ps-5!">
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="'auto'"
            :pagination="{
              el: '.companies-pagination-swiper',
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
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }"
            :key="companiesSliderKey"
          >
            <SwiperSlide v-for="item in companies">
              <div
                class="tw:h-full! tw:flex tw:flex-col tw:justify-between tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:p-3! tw:md:p-6!"
              >
                <!-- information -->
                <div>
                  <div
                    class="tw:inline-flex tw:items-center tw:gap-2 tw:py-0.75! tw:px-3! tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-full"
                  >
                    <icon-bank
                      v-if="item.type == 1"
                      class="tw-text-color-lighter tw:text-[17px]"
                    />
                    <icon-user
                      v-if="item.type == 2"
                      class="tw-text-color-lighter tw:text-[17px]"
                    />
                    <div class="tw-text-color-lighter tw:text-[13px]">
                      {{
                        item.type == 1
                          ? langStore.label.table.legalEntity
                          : langStore.label.table.individual
                      }}
                    </div>
                  </div>
                  <div
                    class="tw-text-color tw:text-[20px]! tw:font-semibold tw:mt-2!"
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-1 tw:mt-2!"
                  >
                    <icon-location
                      class="tw-text-color-lighter tw:text-[20px]"
                    />
                    <div class="tw-text-color-lighter tw:text-[13px]">
                      {{ langStore.label.table.address }} :
                    </div>
                    <div class="tw-text-color-lighter tw:text-[13px]">
                      {{ item.address }}
                    </div>
                  </div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-1 tw:mt-2!"
                  >
                    <icon-phone class="tw-text-color-lighter tw:text-[20px]" />
                    <div class="tw-text-color-lighter tw:text-[13px]">
                      {{ langStore.label.table.phone }} :
                    </div>
                    <div class="tw-text-color-lighter tw:text-[13px]">
                      {{ item.phone }}
                    </div>
                  </div>
                </div>

                <!-- actions -->
                <div class="tw:flex tw:justify-end tw:items-center tw:gap-2">
                  <v-btn
                    @click="openCompanyModal('edit', item.id)"
                    size=" x-small"
                    variant="outlined"
                    rounded="pill"
                    class="tw:px-0! tw:py-1! tw:w-23"
                  >
                    <icon-edit
                      class="tw-text-color-lighter tw:text-[15px] tw:me-2!"
                    />
                    <div class="tw-text-color-lighter tw:text-[12px]">
                      {{ langStore.label.button.edit }}
                    </div>
                  </v-btn>
                  <v-btn
                    @click="openDeleteModal(item.id)"
                    size=" x-small"
                    variant="outlined"
                    rounded="pill"
                    class="tw:px-0! tw:py-1! tw:w-23"
                  >
                    <icon-trash
                      class="tw-text-color-lighter tw:text-[17px] tw:me-2!"
                    />
                    <div class="tw-text-color-lighter tw:text-[12px]">
                      {{ langStore.label.button.delete }}
                    </div>
                  </v-btn>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            class="companies-pagination-swiper tw:translate-y-3 tw:flex tw:justify-center tw:items-center"
          ></div>
        </v-col>
      </v-row>
    </v-container>

    <!-- company modal -->
    <v-dialog v-model="campanyModal" max-width="800" class="blur-dialog">
      <v-card class="tw:rounded-2xl!">
        <v-card-title
          class="tw:border-b-2 pa-0"
          :class="{
            'tw:border-success': modalMode === 'add',
            'tw:border-warning': modalMode === 'edit',
          }"
        >
          <div class="tw:relative pa-2 px-4">
            <div class="text-center tw-text-color tw:text-[15px] tw:mt-2">
              <span v-if="modalMode === 'add'">{{
                langStore.label.header.addCompany
              }}</span>
              <span v-else-if="modalMode === 'edit'">{{
                langStore.label.header.editCompany
              }}</span>
            </div>
          </div>
          <div class="tw:absolute tw:top-3 tw:end-3">
            <v-tooltip location="top">
              <template #activator="{ props }">
                <icon-close
                  @click="close"
                  class="tw-text-color-lighter tw:text-[17px] tw:cursor-pointer"
                  v-bind="props"
                />
              </template>
              <span class="tw:text-xs tw:p-2">{{
                langStore.label.button.colseWindow
              }}</span>
            </v-tooltip>
          </div>
        </v-card-title>
        <v-card-text class="tw:p-3! tw:mt-2!">
          <v-row class="tw:p-1!">
            <v-col cols="12" md="6" lg="4"> </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                v-model="companyForm.name"
                type="text"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]!"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.name }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                v-model="companyForm.phone"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]!"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.phone }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="companyForm.address"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]!"
                rounded="lg"
                rows="1"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.address }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-textarea>
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
              @click="submitCompany"
              size=""
              rounded="lg"
              class="tw:border! tw:px-0! tw:py-1! tw:w-30"
              :class="{
                'tw:bg-success/15! tw:text-success!  tw:border-success!':
                  modalMode === 'add',
                'tw:bg-warning/15! tw:text-warning! tw:border-warning!':
                  modalMode === 'edit',
              }"
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
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

import { useBaseStore } from "~/store/base";
const baseStore = useBaseStore();
const { companiesResult: companies, companyResult: company } =
  storeToRefs(baseStore);

// swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { label } from "~/store/language/getters/staticLabel";

// ======= TS types and interface =======
// interface
type ModalMode = "add" | "edit";

enum CompanyType {
  legalEntity = 1,
  individual = 2,
}
interface CompanyForm {
  name: string | null;
  type: CompanyType;
  address: string | null;
  phone: number | null;
}

// ======= Data =======
// slider keys
const companiesSliderKey = ref<number>(1);
// modal
const modalMode = ref<ModalMode | null>(null);
const campanyModal = ref<boolean>(false);
const deleteModal = ref<boolean>(false);
// form
const companyId = ref<string>("");
const companyForm = ref<CompanyForm>({
  type: CompanyType.legalEntity,
  name: null,
  address: null,
  phone: null,
});

// ======= Functions =======
const openCompanyModal = (mode: ModalMode, id?: string) => {
  modalMode.value = mode;

  if (mode === "add") {
    campanyModal.value = true;
    return;
  }

  if (mode === "edit" && id) {
    companyId.value = id;
    baseStore.getCompany(id);
    campanyModal.value = true;
  }
};
const submitCompany = () => {
  if (modalMode.value === "add") {
    if (
      companyForm.value.type &&
      companyForm.value.name &&
      companyForm.value.address &&
      companyForm.value.phone
    ) {
      baseStore.addCompany(companyForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  } else if (modalMode.value === "edit") {
    if (
      companyForm.value.type &&
      companyForm.value.name &&
      companyForm.value.address &&
      companyForm.value.phone
    ) {
      baseStore.editCompany(companyId.value, companyForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  }
};
const openDeleteModal = (id: string) => {
  companyId.value = id;
  deleteModal.value = true;
  console.log("delete");
};
const confirmDelete = () => {
  baseStore.deleteCompany(companyId.value);
};
const reloadData = async () => {
  await baseStore.getCompanies();
};
const resetFields = () => {
  companyId.value = "";
  companyForm.value = {
    type: CompanyType.legalEntity,
    name: null,
    address: null,
    phone: null,
  };
};
const close = () => {
  campanyModal.value = false;
  deleteModal.value = false;
  resetFields();
};

// ======= Watchers =======
watch(
  () => handlerStore.postCheck,
  (val, oldVal) => {
    if (oldVal === true && val === false) {
      reloadData();
      close();
    }
  },
);
watch(company, (val) => {
  if (!val) return;

  console.log("company watcher", val);

  companyForm.value.type = val.type;
  companyForm.value.name = val.name;
  companyForm.value.address = val.address;
  companyForm.value.phone = val.phone;
});
watch(
  () => langStore.currentLang,
  () => {
    companiesSliderKey.value += 1;
  },
);

// ======= Lifecycle =======
onMounted(() => {
  reloadData();
});
</script>
