<template>
  <div class="tw:flex tw:flex-col tw:min-h-full">
    <!-- companies -->
    <v-container fluid class="tw:md:pe-0! tw:md:py-0!">
      <v-row class="tw:flex tw:justify-center tw:itesm-center">
        <v-col
          cols="12"
          sm="4"
          md="3"
          class="tw:3xl:mb-2 tw:flex! tw:flex-col tw:justify-between tw:bg-primary-dark tw:dark:bg-primary-dark tw:p-6! tw:rounded-4xl"
        >
          <div class="tw:flex-1">
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
              <icon-building class="tw-text-color-reverse header-icon" />
              <div
                class="tw-text-color-reverse header-title"
              >
                {{ langStore.label.title.manageCompanies }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:dark:text-gray-400 tw:text-justify header-desc tw:mt-3!"
            >
              {{ langStore.label.description.manageCompanies }}
            </div>
          </div>
          <v-btn
            @click="openCompanyModal('add')"
            color="white"
            class="tw:rounded-full! tw:mt-3! tw:h-10!"
          >
            <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
              <icon-plus-circle class="tw:text-[18px] tw:2xl:text-[20px]" />
              <div class="tw:text-[14px] tw:2xl:text-[15px]">
                {{ langStore.label.button.createCompany }}
              </div>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="8" md="9" class="tw:px-0! tw:py-0! tw:lg:ps-5!">
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
            class="tw:items-stretch!"
          >
            <SwiperSlide v-for="item in companies" class="tw:h-auto!">
              <div class="tw:h-auto tw:flex">
                <div
                  class="tw:h-full! tw:flex tw:flex-col tw:flex-1 tw:justify-between tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:p-6! tw:md:p-6! tw:min-h-45 tw:2xl:min-h-40 tw:max-h-full"
                >
                  <!-- information -->
                  <div>
                    <div
                      class="tw:inline-flex tw:items-center tw:gap-2 tw:py-0.75! tw:px-3! tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-full"
                    >
                      <icon-bank
                        v-if="item.type == CompanyType.legalEntity"
                        class="tw-text-color-lighter tw:text-[17px]"
                      />
                      <icon-user
                        v-if="item.type == CompanyType.individual"
                        class="tw-text-color-lighter tw:text-[17px]"
                      />
                      <div class="tw-text-color-lighter tw:text-[13px]">
                        {{
                          item.type == CompanyType.legalEntity
                            ? langStore.label.table.legalEntity
                            : langStore.label.table.individual
                        }}
                      </div>
                    </div>
                    <div
                      class="tw-text-color tw:text-[20px]! tw:font-semibold tw:mt-1! tw:2xl:mt-2!"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class="tw:flex tw:justify-start tw:items-start tw:gap-1 tw:mt-2!"
                    >
                      <span>
                        <icon-location
                          class="tw-text-color-lighter tw:text-[20px]"
                        />
                      </span>
                      <span
                        class="tw:flex tw-text-color-lighter tw:text-[13px]/5"
                      >
                        {{ langStore.label.table.address }} : {{ item.address }}
                      </span>
                    </div>
                    <div
                      class="tw:flex tw:justify-start tw:items-center tw:gap-1 tw:mt-2! tw:2xl:mt-2!"
                    >
                      <icon-phone
                        class="tw-text-color-lighter tw:text-[20px]"
                      />
                      <div class="tw-text-color-lighter tw:text-[13px]">
                        {{ langStore.label.table.phone }} :
                      </div>
                      <div class="tw-text-color-lighter tw:text-[13px]">
                        {{ item.phone }}
                      </div>
                    </div>
                  </div>

                  <!-- actions -->
                  <div
                    class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:mt-4!"
                  >
                    <v-btn
                      @click="openCompanyModal('edit', item.id)"
                      size=" x-small"
                      variant="outlined"
                      rounded="pill"
                      class="tw:px-0! tw:py-0.75! tw:2xl:py-0.75! tw:w-23"
                    >
                      <icon-edit
                        class="tw-text-color-lighter tw:text-[15px] tw:me-2!"
                      />
                      <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                        {{ langStore.label.button.edit }}
                      </div>
                    </v-btn>
                    <v-btn
                      @click="openDeleteModal('comapny', item.id)"
                      size=" x-small"
                      variant="outlined"
                      rounded="pill"
                      class="tw:px-0! tw:py-0.75! tw:2xl:py-0.75! tw:w-23"
                    >
                      <icon-trash
                        class="tw-text-color-lighter tw:text-[17px] tw:me-2!"
                      />
                      <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                        {{ langStore.label.button.delete }}
                      </div>
                    </v-btn>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            class="companies-pagination-swiper tw:flex tw:justify-center tw:translate-y-3 tw:items-center"
          ></div>
        </v-col>
      </v-row>
    </v-container>

    <!-- brands and products -->
    <v-container fluid class="tw:md:pe-0! tw:my-5!">
      <v-row class="tw:h-full!">
        <!-- brands -->
        <v-col
          cols="12"
          2xl="6"
          class="tw:w-full! tw:px-0!  tw:2xl:ps-0! tw:flex"
        >
          <div
            class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:overflow-hidden tw:grow!"
          >
            <!-- section header -->
            <div
              class="tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
            >
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
              >
                <div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                  >
                    <icon-checkmark
                      class="tw-text-color-reverse header-icon"
                    />
                    <div
                      class="tw-text-color-reverse header-title tw:text-nowrap"
                    >
                      {{ langStore.label.title.manageBrands }}
                    </div>
                  </div>
                  <div
                    class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
                  >
                    {{ langStore.label.description.manageBrands }}
                  </div>
                </div>
                <div>
                  <transition name="fade" @after-leave="onBrandFadeLeave">
                    <v-btn
                      v-if="!showBrandFormExpand && !isBrandAnimating"
                      @click="openBrandForm('add')"
                      color="white"
                      rounded="pill"
                      class="tw:h-10!"
                    >
                      <div
                        class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                      >
                        <icon-plus-circle
                          class="tw:text-[18px] "
                        />
                        <div class="tw:text-[13px] tw:3xl:text-[15px]">
                          {{ langStore.label.button.createBrand }}
                        </div>
                      </div>
                    </v-btn>
                  </transition>
                  <transition
                    name="expand-btn"
                    @after-leave="onBrandExpandLeave"
                  >
                    <div
                      v-if="showBrandFormExpand"
                      class="tw:flex tw:justify-start tw:items-center tw:gap-3"
                    >
                      <v-text-field
                        v-model="brandForm.name"
                        type="text"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="tw:text-[14px]! tw:w-50! tw:text-white!"
                        rounded="pill"
                      >
                        <template #label>
                          <span class="tw:text-[12px]">
                            {{ langStore.label.form.name }}
                          </span>
                          <span class="tw:text-red-300 tw:text-[10px]">
                            ({{ langStore.label.caption.required }})
                          </span>
                        </template>
                      </v-text-field>
                      <v-btn
                        @click="submitBrand"
                        color="white"
                        class="tw:rounded-full! tw:w-9.5! tw:h-9.5! tw:min-w-0! tw:p-0!"
                        icon
                      >
                        <icon-check class="tw:text-[23px] tw:3xl:text-[25px]" />
                      </v-btn>
                      <v-btn
                        @click="toggleBrand('close')"
                        color="white"
                        class="tw:rounded-full! tw:w-9.5! tw:h-9.5! tw:min-w-0! tw:p-0!"
                        icon
                      >
                        <icon-close class="tw:text-[23px] tw:3xl:text-[25px]" />
                      </v-btn>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <!-- list -->
            <div
              class="tw:w-full! tw:flex tw:flex-col tw:justify-start tw:items-start tw:py-2! tw:px-4! tw:2xl:px-6! tw:lg:h-86 tw:3xl:h-105 tw:overflow-auto"
            >
              <div
                v-for="(item, index) in brands"
                :key="item.id"
                class="tw:w-full! tw:flex tw:justify-between tw:items-start tw:my-3! tw:3xl:my-4!"
              >
                <div class="tw:flex tw:items-center tw:gap-3">
                  <div
                    class="tw:bg-primary-dark tw:dark:bg-primary-light tw:text-primary-light tw:dark:text-primary-dark tw-text-[16px] tw:w-7 tw:h-7 tw:rounded-full tw:flex tw:justify-center tw:items-center"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="tw-text-color tw:text-[16px] tw:3xl:text-[17px]">
                    {{ item.name }}
                  </div>
                </div>
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-btn
                        @click="openBrandForm('edit', item.id)"
                        v-bind="props"
                        size="x-small"
                        variant="text"
                        rounded="pill"
                        class="tw:w-8! tw:h-8! tw:px-0!"
                      >
                        <icon-edit
                          class="tw-text-color-lighter tw:text-[20px]"
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
                        @click="openDeleteModal('brand', item.id)"
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
              </div>
            </div>
          </div>
        </v-col>
        <!-- category -->
        <v-col
          cols="12"
          2xl="6"
          class="tw:w-full! tw:px-0! tw:2xl:pe-0! tw:flex"
        >
          <div
            class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:overflow-hidden tw:grow!"
          >
            <!-- section header -->
            <div
              class="tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
            >
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
              >
                <div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                  >
                    <icon-tag
                      class="tw-text-color-reverse header-icon"
                    />
                    <div
                      class="tw-text-color-reverse header-title tw:text-nowrap"
                    >
                      {{ langStore.label.title.manageCategories }}
                    </div>
                  </div>
                  <div
                    class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
                  >
                    {{ langStore.label.description.manageCategories }}
                  </div>
                </div>
                <div>
                  <transition name="fade" @after-leave="onCategoryFadeLeave">
                    <v-btn
                      v-if="!showCategoryFormExpand && !isCategoryAnimating"
                      @click="openCategoryForm('add')"
                      color="white"
                      rounded="pill"
                      class="tw:h-10!"
                    >
                      <div
                        class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                      >
                        <icon-plus-circle
                          class="tw:text-[18px] "
                        />
                        <div class="tw:text-[13px] tw:3xl:text-[15px]">
                          {{ langStore.label.button.createCategory }}
                        </div>
                      </div>
                    </v-btn>
                  </transition>
                  <transition
                    name="expand-btn"
                    @after-leave="onCategoryExpandLeave"
                  >
                    <div
                      v-if="showCategoryFormExpand"
                      class="tw:flex tw:justify-start tw:items-center tw:gap-3"
                    >
                      <v-text-field
                        v-model="categoryForm.name"
                        type="text"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="tw:text-[14px]! tw:w-50! tw:text-white!"
                        rounded="pill"
                      >
                        <template #label>
                          <span class="tw:text-[12px]">
                            {{ langStore.label.form.name }}
                          </span>
                          <span class="tw:text-red-300 tw:text-[10px]">
                            ({{ langStore.label.caption.required }})
                          </span>
                        </template>
                      </v-text-field>
                      <v-btn
                        @click="submitCategory"
                        color="white"
                        class="tw:rounded-full! tw:w-9.5! tw:h-9.5! tw:min-w-0! tw:p-0!"
                        icon
                      >
                        <icon-check class="tw:text-[23px] tw:3xl:text-[25px]" />
                      </v-btn>
                      <v-btn
                        @click="toggleCategory('close')"
                        color="white"
                        class="tw:rounded-full! tw:w-9.5! tw:h-9.5! tw:min-w-0! tw:p-0!"
                        icon
                      >
                        <icon-close class="tw:text-[23px] tw:3xl:text-[25px]" />
                      </v-btn>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <!-- list -->
            <div
              class="tw:w-full! tw:flex tw:flex-col tw:justify-start tw:items-start tw:py-2! tw:px-4! tw:2xl:px-6! tw:lg:h-86 tw:3xl:h-105 tw:overflow-auto"
            >
              <div
                v-for="(item, index) in categories"
                :key="item.id"
                class="tw:w-full! tw:flex tw:justify-between tw:items-start tw:my-3! tw:3xl:my-4!"
              >
                <div class="tw:flex tw:items-center tw:gap-3">
                  <div
                    class="tw:bg-primary-dark tw:dark:bg-primary-light tw:text-primary-light tw:dark:text-primary-dark tw-text-[16px] tw:w-7 tw:h-7 tw:rounded-full tw:flex tw:justify-center tw:items-center"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="tw-text-color tw:text-[16px] tw:3xl:text-[17px]">
                    {{ item.name }}
                  </div>
                </div>
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-btn
                        @click="openCategoryForm('edit', item.id)"
                        v-bind="props"
                        size="x-small"
                        variant="text"
                        rounded="pill"
                        class="tw:w-8! tw:h-8! tw:px-0!"
                      >
                        <icon-edit
                          class="tw-text-color-lighter tw:text-[20px]"
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
                        @click="openDeleteModal('category', item.id)"
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
              </div>
            </div>
          </div>
        </v-col>
        <!-- products -->
        <v-col cols="12" class="tw:w-full! tw:px-0! tw:2xl:px-0! tw:flex">
          <div
            class="w:overflow-hidden tw:bg-white tw:dark:bg-primary-dark tw:rounded-4xl tw:grow!"
          >
            <!-- sections header -->
            <div
              class="tw:bg-primary-dark tw:rounded-t-4xl tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark tw:p-4! tw:2xl:px-6!"
            >
              <div
                class="tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-start tw:md:items-center tw:gap-5 tw:sm:gap-3"
              >
                <div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                  >
                    <icon-box class="tw-text-color-reverse header-icon" />
                    <div
                      class="tw-text-color-reverse header-title tw:text-nowrap"
                    >
                      {{ langStore.label.title.manageProducts }}
                    </div>
                  </div>
                  <div
                    class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
                  >
                    {{ langStore.label.description.manageProducts }}
                  </div>
                </div>
                <div
                  class="tw:flex tw:justify-start tw:items-center tw:gap-4 tw:w-full tw:lg:w-auto"
                >
                  <v-btn
                    @click="openProductModal('add')"
                    color="white"
                    rounded="pill"
                    class="tw:h-10!"
                  >
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                    >
                      <icon-plus-circle
                        class="tw:text-[18px]"
                      />
                      <div class="tw:text-[13px] tw:3xl:text-[15px]">
                        {{ langStore.label.button.createProduct }}
                      </div>
                    </div>
                  </v-btn>
                  <v-text-field
                    v-model="searchProduct"
                    type="text"
                    variant="solo"
                    density="compact"
                    hide-details
                    class="tw:text-[14px]! tw:lg:w-90! tw:flex-1"
                    bg-color="white"
                    rounded="pill"
                    :placeholder="langStore.label.form.searchByName"
                  >
                    <template #append-inner>
                      <icon-magnify
                        class="tw-text-color tw:text-[25px] tw:me-1!"
                      />
                    </template>
                  </v-text-field>
                </div>
              </div>
            </div>
            <!-- list -->
            <div
              class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:xl:grid-cols-3 tw:content-start tw:p-2! tw:my-0! tw:lg:h-86 tw:3xl:h-105 tw:overflow-auto"
            >
              <div
                v-for="item in filteredProducts"
                :key="item.id"
                class="tw:bg-primary-light tw:dark:bg-background-dark tw:rounded-4xl tw:p-4! tw:h-36.75 tw:m-2!"
              >
                <div
                  class="tw:w-full! tw:flex tw:justify-start tw:items-center tw:gap-2"
                >
                  <!-- icon type -->
                  <div
                    class="tw:bg-primary-dark tw:rounded-full tw:w-20 tw:h-16 tw:flex tw:items-center tw:justify-center"
                  >
                    <img
                      :src="getPackagingIcon(item.packagingType)"
                      class="tw:w-12 tw:h-12"
                    />
                  </div>

                  <div class="tw:w-full! tw:flex tw:flex-col tw:gap-1">
                    <!-- name -->
                    <div class="tw-text-color tw:font-semibold tw:text-[16px] tw:3xl:text-[18px]">
                      {{ item.name }}
                    </div>
                    <!-- brand -->
                    <div
                      class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                    >
                      <icon-checkmark
                        class="tw-text-color-lighter tw:text-[18px]"
                      />
                      <span
                        class="tw:flex tw-text-color-lighter tw:text-[13px]/5"
                      >
                        {{ langStore.label.table.brand }} :
                        {{ item.brandName }}
                      </span>
                    </div>
                    <!-- detail -->
                    <div
                      class="tw:w-full! tw:flex tw:flex-col tw:md:flex-row tw:justify-start tw:md:justify-start tw:items-start tw:md:items-center tw:gap-3"
                    >
                      <div
                        class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                      >
                        <icon-box
                          class="tw-text-color-lighter tw:text-[18px]"
                        />
                        <span
                          class="tw:flex tw-text-color-lighter tw:text-[13px]/5"
                        >
                          {{ langStore.label.table.packaging }} :
                          {{ item.packagingName }}
                        </span>
                      </div>
                      <div
                        class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                      >
                        <icon-pie-chart
                          class="tw-text-color-lighter tw:text-[18px]"
                        />
                        <span
                          class="tw:flex tw-text-color-lighter tw:text-[13px]/5"
                        >
                          {{ langStore.label.table.amount }} :
                          {{ item.amount }}
                          {{ item.unitName }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- actiosn -->
                <div
                  class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:mt-3!"
                >
                  <v-btn
                    @click="openProductModal('edit', item.id)"
                    size=" x-small"
                    variant="outlined"
                    rounded="pill"
                    class="tw:px-0! tw:py-0.75! tw:2xl:py-0.75! tw:w-23"
                  >
                    <icon-edit
                      class="tw-text-color-lighter tw:text-[15px] tw:me-2!"
                    />
                    <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                      {{ langStore.label.button.edit }}
                    </div>
                  </v-btn>
                  <v-btn
                    @click="openDeleteModal('product', item.id)"
                    size=" x-small"
                    variant="outlined"
                    rounded="pill"
                    class="tw:px-0! tw:py-0.75! tw:2xl:py-0.75! tw:w-23"
                  >
                    <icon-trash
                      class="tw-text-color-lighter tw:text-[17px] tw:me-2!"
                    />
                    <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                      {{ langStore.label.button.delete }}
                    </div>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- company modal -->
    <v-dialog v-model="campanyModal" max-width="750" class="blur-dialog">
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
            <v-col
              cols="12"
              md="6"
              lg="4"
              class="tw:flex tw:justify-center tw:items-center tw:w-full!"
            >
              <v-radio-group
                v-model="companyForm.type"
                inline
                density="compact"
                hide-details
                class="tw:flex! tw:justify-center! tw:items-center! tw:gap-3! tw:w-full!"
              >
                <v-radio
                  :value="CompanyType.legalEntity"
                  class="tw-text-color-lighter tw:ms-5!"
                >
                  <template #label>
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <!-- <icon-bank class="tw-text-color-lighter tw:text-[17px]" /> -->
                      <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                        {{ langStore.label.form.legalEntity }}
                      </div>
                    </div>
                  </template>
                </v-radio>
                <v-radio
                  :value="CompanyType.individual"
                  class="tw-text-color-lighter tw:ms-5!"
                >
                  <template #label>
                    <div
                      class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                    >
                      <!-- <icon-user class="tw-text-color-lighter tw:text-[17px]" /> -->
                      <div class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]">
                        {{ langStore.label.form.individual }}
                      </div>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
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
                class="tw:text-[14px]! centred-input"
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
              <v-text-field
                v-model="companyForm.address"
                variant="outlined"
                density="compact"
                hide-details
                hide-spin-buttons
                class="tw:text-[14px]!"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.address }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
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

    <!-- product modal -->
    <v-dialog v-model="productModal" max-width="350" class="blur-dialog">
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
                langStore.label.header.addProduct
              }}</span>
              <span v-else-if="modalMode === 'edit'">{{
                langStore.label.header.editProduct
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
          <v-row class="">
            <v-col cols="12">
              <v-text-field
                v-model="productForm.name"
                type="text"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]"
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
            <v-col cols="12">
              <v-autocomplete
                v-model="productForm.brandId"
                :items="dropdownStore.brandsOptions"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.brand }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="productForm.packagingId"
                :items="dropdownStore.packagingsOptions"
                item-title="text"
                item-value="value"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.packaging }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="productForm.unitId"
                :items="dropdownStore.unitsOptions"
                item-title="text"
                item-value="value"
                type="text"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.unit }}
                  </span>
                  <span class="tw-text-require tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="productForm.amount"
                type="text"
                variant="outlined"
                density="compact"
                hide-details
                class="tw:text-[14px]! centred-input"
                rounded="lg"
              >
                <template #label>
                  <span class="tw:text-[12px]">
                    {{ langStore.label.form.amount }}
                  </span>
                  <span class="tw-text-require 300 tw:text-[10px]">
                    ({{ langStore.label.caption.required }})
                  </span>
                </template>
              </v-text-field>
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
              @click="submitProduct"
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
// packaging icon type
import bottleIcon from "~/assets/image/icon/bottle.png";
import bagIcon from "~/assets/image/icon/bag.png";
import boxIcon from "~/assets/image/icon/box.png";
import sprayIcon from "~/assets/image/icon/spray.png";

// swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// stores
import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();
const { loadingBtn: loading } = storeToRefs(handlerStore);

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useDeopdownStore } from "~/store/dropdown";
const dropdownStore = useDeopdownStore();

import { useBaseStore } from "~/store/base";
const baseStore = useBaseStore();
const {
  companiesResult: companies,
  companyResult: company,
  brandsResult: brands,
  brandResult: brand,
  categoriesResult: categories,
  categoryResult: category,
  productsResult: products,
  productResult: product,
} = storeToRefs(baseStore);

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.baseInfo);
});

// ======= TS types and interface =======
type ModalMode = "add" | "edit";
type DeleteType = "comapny" | "brand" | "category" | "product";

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
interface BrandForm {
  name: string | null;
}
interface CategoryForm {
  name: string | null;
}
interface ProductForm {
  name: string | null;
  brandId: string | null;
  packagingId: string | null;
  unitId: number | null;
  amount: number | null;
}

// ======= Data =======
// slider keys
const companiesSliderKey = ref<number>(1);
// modal & toggle
const modalMode = ref<ModalMode | null>(null);
const deleteType = ref<DeleteType | null>(null);
const campanyModal = ref<boolean>(false);
const productModal = ref<boolean>(false);
const deleteModal = ref<boolean>(false);
const showBrandFormExpand = ref(false);
const showCategoryFormExpand = ref(false);
const isBrandAnimating = ref(false);
const isCategoryAnimating = ref(false);
// forms
const companyId = ref<string>("");
const companyForm = ref<CompanyForm>({
  type: CompanyType.legalEntity,
  name: null,
  address: null,
  phone: null,
});
const brandId = ref<string>("");
const brandForm = ref<BrandForm>({
  name: null,
});
const categoryId = ref<string>("");
const categoryForm = ref<CategoryForm>({
  name: null,
});
const productId = ref<string>("");
const productForm = ref<ProductForm>({
  name: null,
  brandId: null,
  packagingId: null,
  unitId: null,
  amount: null,
});
const searchProduct = ref<string>("");

// ======= Computed =======
const filteredProducts = computed(() => {
  if (!products.value) return [];
  if (!searchProduct.value) return products.value;
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(searchProduct.value.toLowerCase()),
  );
});

// ======= Functions =======
// ui fuctions
const getPackagingIcon = (type: string) => {
  switch (type) {
    case "bottle":
      return bottleIcon;
    case "bag":
      return bagIcon;
    case "box":
      return boxIcon;
    case "spray":
      return sprayIcon;
    default:
      return bottleIcon;
  }
};

// company actions
const loadCompanies = async () => {
  await baseStore.getCompanies();
};
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

// form animations
const toggleBrand = (type: "open" | "close") => {
  if (type === "open") {
    isBrandAnimating.value = true;
    showBrandFormExpand.value = false;
  } else if (type === "close") {
    isBrandAnimating.value = true;
    showBrandFormExpand.value = false;
    resetFields();
  }
};
const toggleCategory = (type: "open" | "close") => {
  if (type === "open") {
    isCategoryAnimating.value = true;
    showCategoryFormExpand.value = false;
  } else if (type === "close") {
    isCategoryAnimating.value = true;
    showCategoryFormExpand.value = false;
    resetFields();
  }
};
const onBrandFadeLeave = () => {
  showBrandFormExpand.value = true;
  isBrandAnimating.value = false;
};
const onBrandExpandLeave = () => {
  isBrandAnimating.value = false;
};
const onCategoryFadeLeave = () => {
  showCategoryFormExpand.value = true;
  isCategoryAnimating.value = false;
};
const onCategoryExpandLeave = () => {
  isCategoryAnimating.value = false;
};

// brand actions
const loadBrands = async () => {
  await baseStore.getBrands();
};
const openBrandForm = (mode: ModalMode, id?: string) => {
  modalMode.value = mode;
  if (mode === "add") {
    toggleBrand("open");
    return;
  }
  if (mode === "edit" && id) {
    brandId.value = id;
    baseStore.getBrand(id);

    if (!showBrandFormExpand.value) {
      toggleBrand("open");
    }
  }
};
const submitBrand = () => {
  if (modalMode.value === "add") {
    if (brandForm.value.name) {
      baseStore.addBrand(brandForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  } else if (modalMode.value === "edit") {
    if (brandForm.value.name) {
      console.log("brand id", brandId.value);
      baseStore.editBrand(brandId.value, brandForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  }
};

// brand actions
const loadCategories = async () => {
  await baseStore.getCategories();
};
const openCategoryForm = (mode: ModalMode, id?: string) => {
  modalMode.value = mode;
  if (mode === "add") {
    toggleCategory("open");
    return;
  }
  if (mode === "edit" && id) {
    categoryId.value = id;
    baseStore.getCategory(id);

    if (!showCategoryFormExpand.value) {
      toggleCategory("open");
    }
  }
};
const submitCategory = () => {
  if (modalMode.value === "add") {
    if (categoryForm.value.name) {
      baseStore.addCategory(categoryForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  } else if (modalMode.value === "edit") {
    if (categoryForm.value.name) {
      baseStore.editCategory(categoryId.value, categoryForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  }
};

// product actions
const loadProducts = async () => {
  await baseStore.getProducts();
};
const openProductModal = (mode: ModalMode, id?: string) => {
  modalMode.value = mode;

  if (mode === "add") {
    productModal.value = true;
    return;
  }

  if (mode === "edit" && id) {
    productId.value = id;
    baseStore.getProduct(id);
    productModal.value = true;
  }
};
const submitProduct = () => {
  if (modalMode.value === "add") {
    if (
      productForm.value.name &&
      productForm.value.amount &&
      productForm.value.packagingId &&
      productForm.value.unitId
    ) {
      baseStore.addProduct(productForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  } else if (modalMode.value === "edit") {
    if (
      productForm.value.name &&
      productForm.value.amount &&
      productForm.value.packagingId &&
      productForm.value.unitId
    ) {
      baseStore.editProduct(productId.value, productForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.requiredFields);
    }
  }
};

// universal
const openDeleteModal = (type: DeleteType, id: string) => {
  deleteType.value = type;
  if (type === "comapny") {
    companyId.value = id;
    deleteModal.value = true;
  } else if (type === "brand") {
    brandId.value = id;
    deleteModal.value = true;
  } else if (type === "category") {
    categoryId.value = id;
    deleteModal.value = true;
  } else if (type === "product") {
    productId.value = id;
    deleteModal.value = true;
  }
};
const confirmDelete = () => {
  if (deleteType.value === "comapny") {
    baseStore.deleteCompany(companyId.value);
  } else if (deleteType.value === "brand") {
    baseStore.deleteBrand(brandId.value);
  }else if (deleteType.value === "category"){
    baseStore.deleteCategory(categoryId.value);
  } else if (deleteType.value === "product") {
    baseStore.deleteProduct(productId.value);
  }
};
const reloadData = async () => {
  loadCompanies();
  loadBrands();
  loadProducts();
  loadCategories();
};
const resetFields = () => {
  companyId.value = "";
  companyForm.value = {
    type: CompanyType.legalEntity,
    name: null,
    address: null,
    phone: null,
  };
  brandId.value = "";
  brandForm.value = {
    name: null,
  };
  categoryId.value = "";
  categoryForm.value = {
    name: null,
  };
  productId.value = "";
  productForm.value = {
    name: null,
    brandId: null,
    packagingId: null,
    unitId: null,
    amount: null,
  };
};
const close = () => {
  campanyModal.value = false;
  productModal.value = false;
  deleteModal.value = false;
  resetFields();
};

// ======= Watchers =======
watch(
  () => handlerStore.postCheck,
  (val, oldVal) => {
    if (oldVal === true && val === false) {
      reloadData();
      if (showBrandFormExpand.value) {
        toggleBrand("close");
      }
      if (showCategoryFormExpand.value) {
        toggleCategory("close");
      }
      close();
    }
  },
);
watch(company, (val) => {
  if (!val) return;
  companyForm.value.type = val.type;
  companyForm.value.name = val.name;
  companyForm.value.address = val.address;
  companyForm.value.phone = val.phone;
});
watch(brand, (val) => {
  if (!val) return;
  brandForm.value.name = val.name;
});
watch(category, (val) => {
  if (!val) return;
  categoryForm.value.name = val.name;
});
watch(product, (val) => {
  if (!val) return;
  productForm.value.name = val.name;
  productForm.value.packagingId = val.packagingId;
  productForm.value.brandId = val.brandId;
  productForm.value.unitId = val.unitId;
  productForm.value.amount = val.amount;
});
watch(
  () => langStore.currentLang,
  () => {
    companiesSliderKey.value += 1;
  },
);

// ======= Lifecycle =======
onMounted(() => {
  dropdownStore.getUnits();
  dropdownStore.getPackagings();
  dropdownStore.getBrands();
  reloadData();
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
