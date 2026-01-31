<template>
  <v-menu class="tw:relative tw:z-9999!">
    <template v-slot:activator="{ props }">
      <div
        class="tw:w-10 tw:h-10 tw:bg-linear-to-t tw:from-gray-300 tw:to-primary-light tw:dark:from-gray-500 tw:dark:to-primary-dark tw:border-3 tw:border-white tw:dark:border-gray-700 tw:rounded-full tw:overflow-hidden tw:hover:from-gray-100 tw:hover:to-gray-100 tw:dark:hover:from-gray-600 tw:dark:hover:to-gray-600 tw:transition tw:duration-200 tw:cursor-pointer"
        v-bind="props"
      >
        <img
          :src="avatar"
          class="tw:w-full tw:h-full tw:object-cover tw:block"
          alt="avatar"
        />
      </div>
    </template>
    <div
      class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:min-w-37 tw:overflow-hidden tw:mt-3! tw:border tw:border-gray-200 tw:dark:border-gray-700"
    >
      <div
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:border-b tw:border-gray-200 tw:dark:border-gray-700"
      >
        <icon-user class="tw:w-4.5 tw:h-4.5 tw:text-gray-700 tw:dark:text-gray-300 tw:me-1!" />
        <div class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300 tw:me-1!">
          {{ langStore.label.caption.username }} :
        </div>
        <div class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300">FiNiK</div>
      </div>
      <div class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group">
        <icon-edit-box
          class="tw:w-4.5 tw:h-4.5 tw:text-gray-700 tw:dark:text-gray-300 tw:group-hover:text-black tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        />
        <div
          class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300 tw:group-hover:text-black tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        >
          {{ langStore.label.button.editProfile }}
        </div>
      </div>
      <div class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group tw:cursor-pointer">
        <icon-logout
          class="tw:w-4.5 tw:h-4.5 tw:text-red-700 tw:group-hover:text-red-900 tw:dark:text-red-600 tw:dark:group-hover:text-red-500 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        />
        <div
          class="tw:text-[12px] tw:text-red-700 tw:group-hover:text-red-900 tw:dark:text-red-600 tw:dark:group-hover:text-red-500 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        >
          {{ langStore.label.button.logOut }}
        </div>
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
// pictures
import avatar from "~/assets/image/default-avatar.png";

import { useLanguageStore } from "~/store/language";
import Logout from "../icon/logout.vue";
const langStore = useLanguageStore();
</script>
