<template>
  <div>
    <v-container fluid class="tw:md:pe-0! tw:md:py-0!">
      <v-row
        class="tw-flex! tw:items-center! tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:rounded-t-4xl! tw:p-3!"
      >
        <v-col cols="12" lg="6">
          <div>
            <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
              <icon-clipboard class="tw-text-color-reverse header-icon" />
              <div class="tw-text-color-reverse header-title tw:text-nowrap">
                {{ langStore.label.title.reportByPackaging }}
              </div>
              <div class="tw-text-color-reverse tw:mx-1!" v-if="packagingName">|</div>
              <div class="tw-text-color-reverse tw:text-[16px] tw:lg:text-[18px] tw:3xl:text-[20px]! tw:text-nowrap">
                {{ packagingName }}
              </div>
            </div>
            <div
              class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
            >
              {{ langStore.label.description.reportByPackaging }}
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="tw:rounded-b-4xl! tw:bg-white tw:dark:bg-primary-dark">
        <v-col cols="12" class="tw:p-6!">
          <div
            class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:3xl:grid-cols-4 tw:gap-6"
          >
            <div
              v-for="item in report"
              :key="item.packagingId"
              class="tw:bg-primary-light tw:dark:bg-background-dark tw:p-3! tw:rounded-2xl! tw:w-full"
            >
              <div
                class="tw:w-full! tw:flex tw:justify-start tw:items-center tw:gap-2"
              >
                <!-- image type -->
                <div>
                  <div
                    class="tw:bg-primary-dark tw:rounded-full tw:w-25 tw:h-25 tw:flex tw:items-center tw:justify-center"
                  >
                    <img
                      :src="getPackagingIcon(item.packagingType)"
                      class="tw:w-17 tw:h-17"
                    />
                  </div>
                </div>
                <div
                  class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1.5"
                >
                  <div class="tw:w-full! tw:flex tw:flex-col tw:gap-1">
                    <div
                      class="tw-text-color tw:font-semibold tw:text-[16px] tw:3xl:text-[19px]"
                    >
                      {{ item.packagingName }}
                    </div>
                  </div>
                  <div class="tw:flex tw:justify-start tw:items-end tw:gap-1">
                    <icon-document
                      class="tw-text-color-lighter tw:text-[20px]"
                    />
                    <span
                      class="tw:flex tw-text-color-lighter tw:text-[12px]/5 tw:3xl:text-[14px]/5"
                    >
                      {{ langStore.label.table.invoicesCount }} :
                      <span
                        class="tw:font-semibold! yekan-font tw:text-[13px]/5 tw:3xl:text-[16px]/5 tw:mx-1!"
                      >
                        {{ item.count }}
                      </span>
                    </span>
                  </div>
                  <div class="tw:flex tw:justify-start tw:items-end tw:gap-1">
                    <icon-documents
                      class="tw-text-color-lighter tw:text-[20px]"
                    />
                    <span
                      class="tw:flex tw-text-color-lighter tw:text-[12px]/5 tw:3xl:text-[14px]/5"
                    >
                      {{ langStore.label.table.totalPageDesigned }} :
                      <span
                        class="tw:font-semibold! yekan-font tw:text-[13px]/5 tw:3xl:text-[16px]/5 tw:mx-1!"
                      >
                        {{ item.totalPage }}
                      </span>
                    </span>
                  </div>
                  <div class="tw:flex tw:justify-start tw:items-end tw:gap-1">
                    <icon-cash class="tw-text-color-lighter tw:text-[20px]" />
                    <span
                      class="tw:flex tw-text-color-lighter tw:text-[12px]/5 tw:3xl:text-[14px]/5"
                    >
                      {{ langStore.label.table.totalPrice }} :
                      <span
                        class="tw:font-semibold! yekan-font tw:text-[13px]/5 tw:3xl:text-[16px]/5 tw:mx-1!"
                      >
                        {{ separateNumber(item.totalPrice) }}
                      </span>
                      {{ langStore.label.caption.rial }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- get detail action -->
              <div
                class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:mt-3!"
              >
                <v-btn
                  @click="getReportDetail(item)"
                  size=" x-small"
                  variant="outlined"
                  rounded="pill"
                  class="tw:px-0! tw:py-0.75! tw:2xl:py-0.75! tw:w-25"
                >
                  <div
                    class="tw-text-color-lighter tw:text-[11px] tw:3xl:text-[12px]"
                  >
                    {{ langStore.label.button.viewDetail }}
                  </div>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" class="tw:p-6! tw:pt-0!">
          <v-card
            v-if="
              reportDetail &&
              reportDetail.items &&
              reportDetail.items.length > 0
            "
            class="tw:shadow-none! tw:bg-transparent!"
          >
            <v-data-table-virtual
              :headers="tableHeader"
              :items="reportDetail?.items as any[]"
              hide-default-footer
              class="tw:bg-primary-light! tw:dark:bg-background-dark! tw:rounded-2xl!"
              height="500"
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
          <v-card
            v-else
            class="tw:rounded-2xl! tw:bg-primary-light! tw:dark:bg-background-dark! tw:p-6 tw:h-[500px]!"
          >
            <div
              class="tw:h-full! tw:flex tw:justify-center tw:items-center tw:gap-2"
            >
              <icon-row-chart class="tw-text-color-lighter tw:text-[35px]" />
              <div
                class="tw-text-color-lighter tw:text-[14px] tw:lg:text-[16px] tw:2xl:text-[18px] tw:text-nowrap"
              >
                {{ langStore.label.caption.noDataFound }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// ======= Imports =======
// packaging icon type
import bottleIcon from "~/assets/image/icon/bottle.png";
import bagIcon from "~/assets/image/icon/bag.png";
import boxIcon from "~/assets/image/icon/box.png";
import sprayIcon from "~/assets/image/icon/spray.png";

// stores
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useReportStore } from "~/store/report";
const reportStore = useReportStore();
const { packagingResult: report } = storeToRefs(reportStore);
const { packagingDetailResult: reportDetail } = storeToRefs(reportStore);

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
  setPageTitle(langStore.label.page.reports);
});
const { separateNumber } = useSeparator();

// ======= Data =======
const isDetail = ref<boolean>(false);
const packagingType = ref<string>("");
const packagingName = ref<string>("");
// table
const tableHeader = computed(() => [
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
] as const);
// toggle
const isTableAnimating = ref(false);
const showTableExpand = ref(false);

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

// form animations
const toggleTable = (type: "open" | "close") => {
  if (type === "open") {
    isTableAnimating.value = true;
    showTableExpand.value = false;
  } else if (type === "close") {
    isTableAnimating.value = true;
    showTableExpand.value = false;
  }
};
const onTableSlideUpLeave = () => {
  showTableExpand.value = true;
  isTableAnimating.value = false;
};
const onTableSlideDownLeave = () => {
  isTableAnimating.value = false;
};

// packaigng
const loadReport = () => {
  reportStore.getPackaging();
};

// packaging detail
const loadDetail = (id: string) => {
  reportStore.getPackagingDetail(id);
};
const getReportDetail = (item: any) => {
  if (item.packagingId) {
    loadDetail(item.packagingId);
    packagingType.value = item.packagingType;
    packagingName.value = item.packagingName;
  }
};
const backToReport = () => {
  isDetail.value = false;
  packagingType.value = "";
  packagingName.value = "";
};

// ======= Watchers =======
watch(reportDetail, (val) => {
  if (!val) return;
  isDetail.value = true;
  toggleTable("open");
});

// ======= Lifecycle =======
onMounted(() => {
  loadReport();
});
</script>

<style scoped>
/* fade button */
.fade-enter-active {
  transition: opacity 100ms ease;
}
.fade-leave-active {
  transition: opacity 100ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* slide-up */
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-active {
  transition: all 0.3s ease-in;
}

/* slide down */
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.slide-down-leave-active {
  transition: all 0.3s ease-in;
}
</style>
