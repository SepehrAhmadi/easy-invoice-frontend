<template>
  <div>
    <PageHeader :title="langStore.label.page.baseInfo" />
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
          <v-btn color="white" class="tw:rounded-full! tw:mt-3!">
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
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// slider keys
const companiesSliderKey = ref(1);

watch(
  () => langStore.currentLang,
  () => {
    companiesSliderKey.value += 1;
  },
);
</script>
