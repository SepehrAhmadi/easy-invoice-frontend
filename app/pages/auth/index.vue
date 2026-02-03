<template>
  <div
    class="tw:relative tw:flex tw:justify-center tw:items-center tw:w-screen! tw:h-screen! tw:overflow-hidden! tw:bg-linear-to-t tw:dark:from-black tw:dark:to-gray-800 tw:from-gray-200 tw:to-white"
  >
    <div
      class="tw:fixed tw:bottom-30 tw:rounded-full tw:z-999!"
      :class="{
        'tw:right-5': lagnStore.currentLang == 'fa',
        'tw:left-5': lagnStore.currentLang == 'en',
      }"
    >
      <Language location="top" />
    </div>
    <ThemeSwitcher />
    <v-container>
      <v-row class="tw:flex tw:justify-center tw:items-center">
        <v-col cols="12" lg="10" xl="8" class="tw:h-140 tw:lg:h-180!">
          <v-row
            class="tw:h-full! lg:tw:w-full! tw:bg-linear-to-t tw:from-black tw:to-gray-900 tw:dark:from-gray-400 tw:dark:to-white tw:rounded-[40px] lg:tw:rounded-[70px]! tw:overflow-hidden tw:shadow-xl tw:p-0! tw:mx-2!"
          >
            <v-col
              cols="12"
              md="6"
              class="tw:bg-white tw:dark:bg-background-dark tw:rounded-[40px] lg:tw:rounded-[70px]! tw:h-full! tw:p-0!"
            >
              <div
                class="tw:p-8! lg:tw:p-14! tw:flex tw:flex-col tw:justify-between tw:h-full! tw:w-full!"
              >
                <div class="tw:flex tw:justify-between tw:items-center">
                  <div>
                    <h1 class="tw-main-text-color tw:text-[20px]">
                      EASY INVOCIE
                    </h1>
                  </div>
                  <div
                    class="tw:flex tw:justify-start tw:items-center tw:gap-2 tw:cursor-pointer tw:group"
                  >
                    <Icon-user-circle class="tw-text-button" />
                    <div class="tw-text-button">
                      {{ lagnStore.label.button.signUp }}
                    </div>
                  </div>
                </div>
                <div
                  class="tw:flex-1 tw:flex tw:justify-between tw:items-center tw:w-full!"
                >
                  <div class="tw:w-full!">
                    <h1 class="tw:text-[40px] tw-main-text-color tw:mb-5!">
                      {{ lagnStore.label.title.signIn }}
                    </h1>
                    <div class="tw:flex tw:flex-col tw:gap-6 tw:mb-5!">
                      <v-text-field
                        v-model="loginForm.username"
                        variant="outlined"
                        density="compact"
                        hide-details
                        rounded="pill"
                        type="text"
                      >
                        <template #label>
                          <span class="tw:text-[14px]">
                            {{ lagnStore.label.form.username }}
                          </span>
                        </template>

                        <template #append-inner>
                          <div
                            v-if="loginForm.username != null"
                            @click="loginForm.username = null"
                            class="tw:cursor-pointer"
                          >
                            <icon-close class="tw-text-button tw:text-[23px]" />
                          </div>
                        </template>
                      </v-text-field>

                      <v-text-field
                        v-model="loginForm.password"
                        variant="outlined"
                        density="compact"
                        hide-details
                        rounded="pill"
                        :type="showPassword ? 'text' : 'password'"
                      >
                        <template #label>
                          <span class="tw:text-[14px]">{{
                            lagnStore.label.form.password
                          }}</span>
                        </template>

                        <template #append-inner>
                          <div
                            @click="showPassword = !showPassword"
                            class="tw:cursor-pointer"
                          >
                            <icon-view
                              v-if="!showPassword"
                              class="tw-text-button tw:text-[23px]"
                            />
                            <icon-view-off
                              v-if="showPassword"
                              class="tw-text-button tw:text-[23px]"
                            />
                          </div>
                        </template>
                      </v-text-field>
                    </div>
                    <v-btn
                      class="tw:bg-black! tw:dark:bg-gray-200!"
                      block
                      rounded="pill"
                      @click="login"
                    >
                      <Icon-login
                        class="tw:text-white tw:dark:text-black tw:text-[20px] tw:me-2!"
                      />
                      <span class="tw:text-white tw:dark:text-black">{{
                        lagnStore.label.button.logIn
                      }}</span>
                    </v-btn>
                  </div>
                </div>
                <div class="tw:flex tw:justify-center tw:items-center">
                  <div class="tw-main-text-color tw:text-[11px]">
                    2025 Easy Invoice copyright
                  </div>
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="tw:p-0! tw:relative tw:hidden tw:lg:block"
            >
              <!-- circle goes first -->
              <div
                class="tw:absolute tw:hidden tw:lg:block tw:w-120 tw:h-120 tw:-top-30 tw:right-1/11 -tw:translate-x-1/2 tw:rounded-full tw:border-8 tw:border-primary-dark/60 tw:dark:border-gray-500/20 tw:z-0"
              ></div>
              <div
                class="tw:absolute tw:hidden tw:lg:block tw:w-120 tw:h-120 tw:-bottom-30 tw:right-1/11 -tw:translate-x-1/2 tw:rounded-full tw:border-8 tw:border-primary-dark/40 tw:dark:border-gray-500/20 tw:z-0"
              ></div>

              <!-- background + text -->
              <div
                class="tw:w-full! tw:h-full! tw:text-center background tw:relative tw:z-10"
              >
                <div class="tw:pt-15! tw:px-5!">
                  <h1
                    class="tw:text-gray-100 tw:dark:text-gray-800 tw:text-[60px]/14"
                  >
                    {{ lagnStore.label.slogan.login }}
                  </h1>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import Language from "~/components/appHeader/language.vue";
import ThemeSwitcher from "~/components/appHeader/themeSwitcher.vue";

import { useLanguageStore } from "~/store/language";
const lagnStore = useLanguageStore();

import { useConfigStore } from "~/store/config";
const configStore = useConfigStore();

definePageMeta({
  layout: "auth",
});

const showPassword = ref<Boolean>(false);

const loginForm = ref({
  username: null,
  password: null,
});

const login = () => {
  if (loginForm.value.username && loginForm.value.password) {
    configStore.login(loginForm.value);
  } else {
    console.log("required fields");
  }
};
</script>

<style scoped>
.background {
  background: url("../../assets/image/auth.png");
  background-position: bottom;
  background-size: 10cm;
  background-repeat: no-repeat;
  transform: translateY(20px);
}

:deep(.v-field__input) {
  text-align: center !important;
}
</style>
