<template>
  <v-menu class="tw:relative tw:z-9999!">
    <template v-slot:activator="{ props }">
      <div
        class="tw:w-10 tw:h-10 tw:flex tw:justify-center tw:items-center tw:bg-white tw:dark:bg-gray-800 tw:border-3 tw:border-white tw:dark:border-gray-800 tw:rounded-full tw:overflow-hidden tw:hover:bg-gray-50 tw:hover:border-gray-50 tw:dark:hover:border-gray-800 tw:dark:hover:bg-primary-dark tw:transition tw:duration-200 tw:cursor-pointer"
        v-bind="props"
      >
        <img
          v-if="profile && profile.avatar"
          :src="profile.avatar"
          class="tw:w-full tw:h-full tw:object-cover tw:block"
          alt="avatar"
        />
        <img
          v-else
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
        <icon-user
          class="tw:w-4.5 tw:h-4.5 tw:text-gray-700 tw:dark:text-gray-300 tw:me-1!"
        />
        <div
          class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300 tw:me-1!"
        >
          {{ langStore.label.caption.username }} :
        </div>
        <div class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300">
          <span v-if="username && username.length > 0">{{ username }}</span>
          <span v-else>{{ langStore.label.caption.username }}</span>
        </div>
      </div>
      <div
        @click="editProfileDrawer = true"
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group"
      >
        <icon-edit-box
          class="tw:w-4.5 tw:h-4.5 tw:text-gray-700 tw:dark:text-gray-300 tw:group-hover:text-black tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        />
        <div
          class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300 tw:group-hover:text-black tw:dark:group-hover:text-gray-200 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        >
          {{ langStore.label.button.editProfile }}
        </div>
      </div>
      <div
        @click="logout"
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group tw:cursor-pointer"
      >
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
const langStore = useLanguageStore();

import { useConfigStore } from "~/store/config";
import Edit from "../icon/edit.vue";
const configStore = useConfigStore();
const { profileResult: profile } = storeToRefs(configStore);

// composables
const { editProfileDrawer } = useEditProfile();

const username = ref<any>("");

const logout = () => {
  configStore.logout();
};

onMounted(() => {
  configStore.getProfile
  ()
  if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username");
  }
});
</script>
