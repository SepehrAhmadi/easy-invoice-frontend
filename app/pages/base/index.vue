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
            <SwiperSlide v-for="(item, index) in 3">
              <div
                class="tw:h-full! tw:flex tw:flex-col tw:justify-between tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:p-3! tw:md:p-6!"
              >
                <!-- information -->
                <div>
                  <div
                    class="tw:inline-flex tw:items-center tw:gap-2 tw:py-0.75! tw:px-3! tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-full"
                  >
                    <icon-bank class="tw-text-color-lighter tw:text-[17px]" />
                    <div class="tw-text-color-lighter tw:text-[13px]">
                      {{ langStore.label.table.legalEntity }}
                    </div>
                  </div>
                  <div
                    class="tw-text-color tw:text-[20px]! tw:font-semibold tw:mt-2!"
                  >
                    <!-- ZARAFSHAN FERTILIZER -->
                    تولیدات سم و کود زرافشان
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
                      تهران ، خیابان شریعتی ، خیبان خقوقی ، پلاک 73 ، واحد 2
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
                      021-77517395
                    </div>
                  </div>
                </div>

                <!-- actions -->
                <div class="tw:flex tw:justify-end tw:items-center tw:gap-2">
                  <v-btn
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
        </v-col>
      </v-row>
    </v-container>

    <!-- company modal -->
    <v-dialog v-model="campanyModal" max-width="800">
      <v-card class="tw:rounded-2xl!">
        <v-card-title
          class="tw:border-b-2 pa-0"
          :class="{
            'tw:border-success': modalMode === 'add',
            'tw:border-error': modalMode === 'edit',
          }"
        >
          <div class="tw:relative pa-2 px-4">
            <div class="text-center tw-text-color tw:text-[16px] tw:mt-2">
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
                  <span class="tw:text-[13px]">
                    {{ langStore.label.form.name }}
                  </span>
                  <span class="tw-text-require tw:text-[11px]">
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
                  <span class="tw:text-[13px]">
                    {{ langStore.label.form.phone }}
                  </span>
                  <span class="tw-text-require tw:text-[11px]">
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
                  <span class="tw:text-[13px]">
                    {{ langStore.label.form.address }}
                  </span>
                  <span class="tw-text-require tw:text-[11px]">
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
              <icon-check-double class="tw:text-[20px] tw:me-2!" />
              <div class="tw:text-[12px]">
                {{ langStore.label.button.save }}
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
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useBaseStore } from "~/store/base";
const baseStore = useBaseStore();

// swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ======= TS types and interface =======
// interface
type ModalMode = "add" | "edit";

enum CompanyType {
  legalEntity = 1,
  individual = 2,
}
interface CompanyForm {
  id: string | null;
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
// form
const companyForm = ref<CompanyForm>({
  id: null,
  type: CompanyType.legalEntity,
  name: null,
  address: null,
  phone: null,
});

// ======= Functions =======
const openCompanyModal = (mode: ModalMode) => {
  if (mode === "add") {
    modalMode.value = mode;
    campanyModal.value = true;
  } else if (mode === "edit") {
    modalMode.value = mode;
    campanyModal.value = true;
  }
};

const close = () => {
  campanyModal.value = false;
};

// ======= Watchers =======
watch(
  () => langStore.currentLang,
  () => {
    companiesSliderKey.value += 1;
  },
);

// ======= Lifecycle =======
onMounted(() => {
  baseStore.getCompanies();
});
</script>
