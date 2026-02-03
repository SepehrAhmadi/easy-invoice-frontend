<template>
  <div>
    <v-app-bar color="transparetn" class="tw:px-4.5!">
      <div class="tw:flex tw:justify-between tw:items-center tw:w-full">
        <div>
          <button
            icon
            variant="text"
            @click="handleSidebar"
            class="tw:bg-black! tw:hover:bg-black/80! tw:dark:bg-primary-dark! tw:dark:hover:bg-primary-dark/80! tw:group tw:p-2! tw:rounded-full"
          >
            <icon-more-vertical
              v-if="rail"
              class="tw:text-[25px] tw:text-white"
            />
            <icon-menu v-else class="tw:text-[25px] tw:text-white" />
          </button>
        </div>
        <div class="tw:flex tw:justify-start tw:items-center tw:gap-4">
          <app-header-language />
          <app-header-notification />
          <app-header-account-center />
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      width="250"
      rail-width="70"
      app
      :temporary="$vuetify.display.smAndDown"
    >
      <div
        class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-3 tw:m-4! tw:mt-1!"
      >
        <div
          v-for="(item, index) in menuItems"
          :key="item.id"
          class="tw:w-full"
        >
          <!-- main items -->
          <div
            class="tw:relative tw:flex tw:justify-between tw:items-center tw:gap-3 tw:cursor-pointer tw:group tw:w-full tw:py-2.5! tw:px-2.5!"
            :class="{
              'tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:border-b tw:border-gray-300 tw:dark:border-gray-500':
                activeItem === item.id && !rail,
            }"
            @click="onMainItemClick(item)"
          >
            <div class="tw:flex tw:justify-center tw:items-center tw:gap-3">
              <component
                :is="item.icon"
                class="tw:text-[25px] tw:text-gray-600! tw:group-hover:text-gray-900! tw:dark:text-gray-300! tw:dark:group-hover:text-gray-200! tw:transition tw:duration-150"
              />
              <transition name="slide-text">
                <div
                  class="tw:text-gray-600! tw:group-hover:text-gray-900! tw:dark:text-gray-300! tw:dark:group-hover:text-gray-200! tw:transition tw:duration-150 tw:text-[16px] tw:text-nowrap!"
                  v-if="!rail"
                >
                  {{ item.title }}
                </div>
              </transition>
            </div>
            <div class="tw:flex tw:justify-center tw:items-center">
              <icon-arrow-down
                v-if="item.subItems && !rail"
                class="tw:text-[17px] tw:text-gray-600! tw:group-hover:text-gray-900! tw:dark:text-gray-300! tw:dark:group-hover:text-gray-200! tw:transition tw:duration-150"
                :class="{ 'tw:rotate-180': openGroup === item.id }"
              />
            </div>

            <!-- active icon when slider in minimum size -->
            <icon-circle
              class="tw:hidden tw:text-[6px] tw:text-gray-600! tw:dark:text-gray-300! tw:absolute tw:top-5"
              :class="{
                'tw:md:block!':
                  rail && (activeItem === item.id || isAnySubItemActive(item)),
                'tw:right-0': langStore.currentLang == 'fa',
                'tw:left-0': langStore.currentLang == 'en',
              }"
            />
          </div>

          <!-- wrapper div برای subItems -->
          <transition name="submenu">
            <div
              v-show="item.subItems && openGroup === item.id && !rail"
              class="tw:flex tw:flex-col tw:gap-1"
            >
              <div
                v-for="subItem in item.subItems"
                :key="subItem.id"
                class="tw:relative tw:flex tw:justify-between tw:items-center tw:gap-3 tw:cursor-pointer tw:group tw:w-full tw:py-2.5! tw:px-2.5!"
                :class="{
                  'tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:border-b tw:border-gray-300 tw:dark:border-gray-500':
                    activeItem === subItem.id && !rail,
                }"
                @click="onSubItemClick(item, subItem)"
              >
                <div class="tw:flex tw:justify-center tw:items-center tw:gap-3">
                  <icon-arrow-down-right
                    class="tw:text-[17px] tw:text-gray-600! tw:group-hover:text-gray-900! tw:dark:text-gray-300! tw:dark:group-hover:text-gray-200! tw:transition tw:duration-150"
                  />
                  <transition name="slide-text">
                    <div
                      v-if="!rail"
                      class="tw:text-gray-600! tw:group-hover:text-gray-900! tw:dark:text-gray-300! tw:dark:group-hover:text-gray-200! tw:transition tw:duration-150 tw:text-[15px] tw:text-nowrap"
                    >
                      {{ subItem.title }}
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </v-navigation-drawer>

    <theme-switcher />
  </div>
</template>

<script setup lang="ts">
import dashboardIcon from "~/components/icon/dashboard.vue";
import baseInfoIcon from "~/components/icon/database.vue";
import operationsIcon from "~/components/icon/layer.vue";
import reportsIcon from "~/components/icon/documents.vue";

import { useLanguageStore } from "~/store/language";
import ThemeSwitcher from "./themeSwitcher.vue";
const langStore = useLanguageStore();

const isDesktop = ref(false);
const drawer = ref(true);
const rail = ref(false);

const activeItem = ref<string | null>(null);
const openGroup = ref<string | null>(null);

const route = useRoute();
const router = useRouter();

interface SubItem {
  id: string;
  title: string;
  routeName: string;
}

interface MainItem {
  id: string;
  title: string;
  icon: string;
  routeName?: string;
  subItems?: SubItem[];
}
const menuItems = computed(() => [
  {
    id: "dashboard",
    title: langStore.label.menu.dashboard,
    icon: dashboardIcon,
    routeName: "index",
    subItems: null,
  },
  {
    id: "baseInfo",
    title: langStore.label.menu.baseInfo,
    icon: baseInfoIcon,
    routeName: "base",
    subItems: [
      {
        id: "companies",
        title: langStore.label.menu.companies,
        routeName: "base-company",
      },
      {
        id: "brands",
        title: langStore.label.menu.brands,
        routeName: "base-brand",
      },
      {
        id: "products",
        title: langStore.label.menu.products,
        routeName: "base-product",
      },
    ],
  },
  {
    id: "operations",
    title: langStore.label.menu.operations,
    icon: operationsIcon,
    routeName: "operations",
    subItems: [
      {
        id: "invoices",
        title: langStore.label.menu.invoices,
        routeName: "operations-invoice",
      },
    ],
  },
  {
    id: "reports",
    title: langStore.label.menu.reports,
    icon: reportsIcon,
    routeName: "reports",
    subItems: [
      {
        id: "reportByPackaging",
        title: langStore.label.menu.reportByPackaging,
        routeName: "reports-packaging",
      },
    ],
  },
]);

function updateIsDesktop() {
  isDesktop.value = window.innerWidth >= 1024;
  if (isDesktop.value) {
    drawer.value = true;
    rail.value = false;
  } else {
    drawer.value = false;
    rail.value = false;
  }
}

function handleSidebar() {
  if (isDesktop.value) {
    rail.value = !rail.value;
    console.log("rail:", rail.value);
  } else {
    drawer.value = !drawer.value;
    console.log("drawer:", drawer.value);
  }
}

function onMainItemClick(item: any) {
  if (!item.subItems) {
    activeItem.value = item.id;
    openGroup.value = null;

    router.push({ name: item.routeName });
    return;
  }

  openGroup.value = openGroup.value === item.id ? null : item.id;
}

function onSubItemClick(parent: MainItem, sub: SubItem) {
  activeItem.value = sub.id;
  openGroup.value = parent.id;

  router.push({ name: sub.routeName });
}

function isAnySubItemActive(item: any) {
  if (!item.subItems) return false;
  return item.subItems.some((sub: any) => sub.id === activeItem.value);
}

watch(
  () => route.name,
  () => {
    for (const item of menuItems.value) {
      if (item.routeName === route.name) {
        activeItem.value = item.id;
        openGroup.value = null;
      }

      if (item.subItems) {
        for (const sub of item.subItems) {
          if (sub.routeName === route.name) {
            activeItem.value = sub.id;
            openGroup.value = item.id;
          }
        }
      }
    }
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener("resize", updateIsDesktop);
  updateIsDesktop();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsDesktop);
});
</script>

<style>
/* change vuetify components style */
.v-app-bar.v-toolbar {
  box-shadow: none !important;
}

.v-navigation-drawer--left,
.v-navigation-drawer--right {
  border: none !important;
}

/* slide-text transition */
.slide-text-enter-active,
.slide-text-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    color 0.2s;
}

.slide-text-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-text-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-text-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-text-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.4s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}
.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px; /* کافی برای همه subItemها */
}
</style>
