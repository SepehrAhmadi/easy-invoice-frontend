<template>
  <v-menu class="tw:relative tw:z-9999!">
    <template v-slot:activator="{ props }">
      <div
        class="tw:w-10 tw:h-10 tw:bg-linear-to-t tw:from-gray-300 tw:to-primary-light tw:border-3 tw:border-white tw:rounded-full tw:overflow-hidden tw:hover:from-gray-100 tw:hover:to-gray-100 tw:transition tw:duration-200 tw:cursor-pointer"
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
      class="tw:bg-white tw:rounded-lg tw:min-w-37 tw:overflow-hidden tw:mt-1! tw:border tw:border-gray-200"
    >
      <div
        class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:border-b tw:border-gray-200"
      >
        <icon-user class="tw:w-4.5 tw:h-4.5 tw:text-gray-700 tw:me-1!" />
        <div class="tw:text-[12px] tw:text-gray-700 tw:me-1!">Username :</div>
        <div class="tw:text-[12px] tw:text-gray-700">FiNiK</div>
      </div>
      <div class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group">
        <icon-edit-box
          class="tw:w-4.5 tw:h-4.5 tw:text-gray-700 tw:group-hover:text-black tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        />
        <div
          class="tw:text-[12px] tw:text-gray-700 tw:group-hover:text-black tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        >
          Edit profile
        </div>
      </div>
      <div class="tw:flex tw:justify-start tw:items-center tw:p-2! tw:group">
        <icon-logout
          class="tw:w-4.5 tw:h-4.5 tw:text-red-700 tw:group-hover:text-red-900 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        />
        <div
          class="tw:text-[12px] tw:text-red-700 tw:group-hover:text-red-900 tw:transition tw:duration-100 tw:cursor-pointer tw:me-1!"
        >
          Logout
        </div>
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
// pictures
import avatar from "~/assets/image/default-avatar.png";
</script>
