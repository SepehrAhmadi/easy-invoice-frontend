<template>
  <v-menu class="tw:relative tw:z-9999!" :location="prop.location" dir="ltr">
    <template v-slot:activator="{ props }">
      <div
        class="tw:w-10 tw:h-10 tw:flex tw:justify-center tw:items-center tw:bg-white tw:dark:bg-gray-800 tw:border-3 tw:border-white tw:dark:border-gray-800 tw:rounded-full tw:overflow-hidden tw:hover:bg-gray-50 tw:hover:border-gray-50  tw:dark:hover:border-gray-800 tw:dark:hover:bg-primary-dark tw:transition tw:duration-200 tw:cursor-pointer"
        v-bind="props"
      >
        <icon-language class="tw:text-[25px]" />
      </div>
    </template>
    <div
      class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:min-w-30 tw:overflow-hidden tw:mt-3! tw:border tw:border-gray-200 tw:dark:border-gray-700"
      dir="ltr"
    >
      <div
        v-for="item in langItems"
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:border-b tw:border-gray-200 tw:dark:border-gray-700 tw:cursor-pointer tw:group"
        @click="selectlang(item.code)"
      >
        <icon-circle
          v-if="item.active"
          class="tw:w-2 tw:h-2 tw:me-1.5! tw:text-black tw:group-hover:text-black tw:dark:text-gray-200 tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100"
        />
        <icon-circle-outline
          v-else
          class="tw:w-2 tw:h-2 tw:me-1.5! tw:text-gray-700 tw:group-hover:text-black tw:dark:text-gray-300 tw:dark:group-hover:text-gray-200 tw:transitio tw:transition tw:duration-100"
        />
        <div
          class="tw:text-[12px] tw:text-gray-700 tw:me-1! tw:group-hover:text-black tw:dark:text-gray-300 tw:dark:group-hover:text-gray-200 tw:transitio tw:transition tw:duration-100"
          :class="{ 'tw:text-black! tw:dark:text-gray-200! ': item.active }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </v-menu>
</template>

<script setup>
import { useLocale } from "vuetify";
const { current } = useLocale();

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

const prop = defineProps({
  location: {
    default: "bottom",
    type: String,
  },
});

const langItems = ref([
  {
    name: "English (En)",
    nativeName: "English (En)",
    code: "en",
    active: false,
  },
  {
    name: "Persian (Fa)",
    nativeName: "فارسی (Fa)",
    code: "fa",
    active: false,
  },
]);

const selectlang = (code) => {
  langStore.setLang(code);
  changeLocale(code);
  langItems.value.forEach((item) => {
    if (item.code == langStore.currentLang) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
};

function changeLocale(locale) {
  current.value = locale;
}

onMounted(() => {
  langStore.initLang();

  const curretnLang = langStore.currentLang;
  changeLocale(curretnLang);

  const savedLang = localStorage.getItem("selectedLang");
  const elems = document.getElementsByClassName("v-locale--is-rtl");
  for (let i = 0; i < elems.length; i++) {
    elems[i].style.direction = savedLang === "fa" ? "rtl" : "ltr";
  }

  langItems.value.forEach((item) => {
    if (item.code == langStore.currentLang) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
});
</script>
