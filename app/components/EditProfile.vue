<template>
  <v-navigation-drawer
    v-model="drawer"
    width="380"
    :temporary="true"
    :location="langStore.currentLang === 'fa' ? 'left' : 'right'"
  >
    <div class="tw:px-4! tw:py-3!">
      <!-- edit profile title -->
      <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
        <icon-edit-box
          class="tw:text-[30px] tw:text-gray-600! tw:dark:text-gray-300!"
        />
        <div class="tw:text-[17px] tw:text-gray-700! tw:dark:text-gray-300!">
          {{ langStore.label.title.editProfile }}
        </div>
      </div>
      <!-- avatar section -->
      <div class="tw:flex tw:justify-between tw:items-cneter tw:mt-4! tw:gap-2">
        <div
          class="tw:w-25 tw:h-25 tw:flex tw:justify-center tw:items-center tw:bg-white tw:rounded-full"
        >
          <img
            v-if="profile && profile.avatar"
            :src="profile.avatar"
            alt="avatar"
            class="tw:w-22 tw:h-22 tw:rounded-full tw:object-cover"
          />
          <img
            v-else
            :src="avatar"
            alt="avatar"
            class="tw:w-22 tw:h-22 tw:rounded-full tw:object-cover"
          />
        </div>
        <div class="tw:mt-2! tw:flex tw:flex-col tw:gap-1">
          <div class="tw:flex tw:justify-start tw:items-start tw:gap-1">
            <icon-circle
              class="tw:text-[9px] tw:text-gray-600! tw:dark:text-gray-300! tw:mt-1!"
            />
            <div
              class="tw:text-[12px] tw:text-gray-600! tw:dark:text-gray-300!"
            >
              {{ langStore.label.caption.editProfilePic1 }}
            </div>
          </div>
          <div class="tw:flex tw:justify-start tw:items-start tw:gap-1">
            <icon-circle
              class="tw:text-[9px] tw:text-gray-600! tw:dark:text-gray-300! tw:mt-1!"
            />
            <div
              class="tw:text-[12px] tw:text-gray-600! tw:dark:text-gray-300!"
            >
              {{ langStore.label.caption.editProfilePic2 }}
            </div>
          </div>
          <div
            class="tw:flex tw:justify-between tw:items-center tw:gap-2 tw:mt-1!"
          >
            <v-btn
              rounded
              size="35"
              class="tw:shadow-none! tw:flex-1"
              color="primary"
              @click="triggerFileInput"
              ;
            >
              <div class="tw:text-[12px]">
                {{ langStore.label.button.chooseAvatar }}
              </div>
            </v-btn>
            <v-btn
              @click="deleteAvatar"
              rounded
              size="35"
              class="tw:shadow-none!"
              color="primary"
            >
              <icon-button-loader v-if="loading" class="tw:text-[26px]!" />
              <icon-trash v-else class="tw:text-[26px]" />
            </v-btn>
          </div>
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="handleFileSelect"
            class="tw:hidden"
          />
        </div>
      </div>
      <!-- username -->
      <div class="tw:flex tw:justify-start tw:items-cneter tw:mt-4! tw:gap-2">
        <v-text-field
          v-model="profileForm.username"
          type="text"
          variant="outlined"
          density="compact"
          hide-details
          class="tw:text-[14px]! tw:w-full!"
          rounded="pill"
          @keyup.enter="updateProfile"
        >
          <template #label>
            <span class="tw:text-[12px]">
              {{ langStore.label.form.username }}
            </span>
          </template>
        </v-text-field>
        <v-btn
          @click="updateProfile"
          rounded
          size="35"
          class="tw:shadow-none!"
          color="primary"
        >
          <icon-button-loader v-if="loading" class="tw:text-[26px]!" />
          <icon-check v-else class="tw:text-[26px]" />
        </v-btn>
      </div>
      <!-- change password title -->
      <div class="tw:flex tw:justify-start tw:items-center tw:mt-8! tw:gap-1">
        <icon-lock
          class="tw:text-[23px] tw:text-gray-600! tw:dark:text-gray-300!"
        />
        <div class="tw:text-[15px] tw:text-gray-700! tw:dark:text-gray-300!">
          {{ langStore.label.title.changePassword }}
        </div>
      </div>
      <!-- chnage password form -->
      <div class="tw:flex tw:flex-col tw:gap-3 tw:mt-4!">
        <v-text-field
          v-model="passwordForm.currentPassword"
          variant="outlined"
          density="compact"
          hide-details
          rounded="pill"
          :type="showOldPass ? 'text' : 'password'"
        >
          <template #label>
            <span class="tw:text-[14px]">{{
              langStore.label.form.currentPass
            }}</span>
          </template>

          <template #append-inner>
            <div @click="showOldPass = !showOldPass" class="tw:cursor-pointer">
              <icon-view
                v-if="!showOldPass"
                class="tw-text-button tw:text-[23px]"
              />
              <icon-view-off
                v-if="showOldPass"
                class="tw-text-button tw:text-[23px]"
              />
            </div>
          </template>
        </v-text-field>
        <v-text-field
          v-model="passwordForm.newPassword"
          variant="outlined"
          density="compact"
          hide-details
          rounded="pill"
          :type="showNewPass ? 'text' : 'password'"
        >
          <template #label>
            <span class="tw:text-[14px]">{{
              langStore.label.form.newPass
            }}</span>
          </template>

          <template #append-inner>
            <div @click="showNewPass = !showNewPass" class="tw:cursor-pointer">
              <icon-view
                v-if="!showNewPass"
                class="tw-text-button tw:text-[23px]"
              />
              <icon-view-off
                v-if="showNewPass"
                class="tw-text-button tw:text-[23px]"
              />
            </div>
          </template>
        </v-text-field>
        <v-text-field
          v-model="passwordForm.confirmPassword"
          variant="outlined"
          density="compact"
          hide-details
          rounded="pill"
          :type="showConfirmPass ? 'text' : 'password'"
          @keyup.enter="changePassword"
        >
          <template #label>
            <span class="tw:text-[14px]">{{
              langStore.label.form.confirmPass
            }}</span>
          </template>

          <template #append-inner>
            <div
              @click="showConfirmPass = !showConfirmPass"
              class="tw:cursor-pointer"
            >
              <icon-view
                v-if="!showConfirmPass"
                class="tw-text-button tw:text-[23px]"
              />
              <icon-view-off
                v-if="showConfirmPass"
                class="tw-text-button tw:text-[23px]"
              />
            </div>
          </template>
        </v-text-field>
        <div class="tw:flex tw:justify-end">
          <v-btn
            @click="changePassword"
            rounded
            class="tw:shadow-none! tw:flex-1"
            color="primary"
          >
            <icon-button-loader v-if="loading" class="tw:text-[26px]!" />
            <div v-else class="tw:text-[12px]">
              {{ langStore.label.button.submit }}
            </div>
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import avatar from "~/assets/image/default-avatar.png";

// store
import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();
const { loadingBtn: loading } = storeToRefs(handlerStore);

import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useUtilStore } from "~/store/util";
const utilStore = useUtilStore();
const { profileResult: profile } = storeToRefs(utilStore);

// ======= composables =======
const { drawer } = useEditProfile();

// ======= interface =======
interface profileForm {
  avatar: File | null;
  username: string;
}
interface passwordForm {
  currentPassword: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
}

// ======= Data =======
const profileForm = ref({
  avatar: null,
  username: "",
});
const passwordForm = ref({
  currentPassword: null,
  newPassword: null,
  confirmPassword: null,
});
const showOldPass = ref<Boolean>(false);
const showNewPass = ref<Boolean>(false);
const showConfirmPass = ref<Boolean>(false);
// ref
const fileInput = ref<HTMLInputElement | null>(null);

// ======= functions =======
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileSelect = (event: any) => {
  const files = event.target.files;
  if (files.length > 0) {
    profileForm.value.avatar = files[0];
    updateProfile();
    event.target.value = null;
  }
};
const updateProfile = () => {
  if (profileForm.value.username) {
    const formData = new FormData();

    if (profileForm.value.avatar) {
      formData.append("avatar", profileForm.value.avatar);
    }
    if (profileForm.value.username) {
      formData.append("username", profileForm.value.username);
    }

    utilStore.editProfile(formData);
  } else {
    handlerStore.setError(langStore.alert.error.requiredFields);
  }
};

const changePassword = () => {
  if (
    passwordForm.value.currentPassword &&
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword
  ) {
    if (passwordForm.value.newPassword === passwordForm.value.confirmPassword) {
      utilStore.changePassword(passwordForm.value);
    } else {
      handlerStore.setError(langStore.alert.error.passNotMatch);
    }
  } else {
    handlerStore.setError(langStore.alert.error.requiredFields);
  }
};

const deleteAvatar = () => {
  utilStore.deleteAvatar();
};

const reloadData = () => {
  utilStore.getProfile();
};

// ======= watcher =======
watch(
  () => handlerStore.postCheck,
  (val, oldVal) => {
    if (oldVal === true && val === false) {
      reloadData();
    }
  },
);
watch(
  () => profile.value,
  (val) => {
    if (val && val.username) {
      profileForm.value.username = val.username;
    }
  },
  { immediate: true },
);
watch(
  () => drawer.value,
  (val) => {
    if (val == true) {
      reloadData();
    }
  },
  { immediate: true },
);
</script>
