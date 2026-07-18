<template>
    <v-navigation-drawer
        v-model="notificationDrawer"
        width="500"
        :temporary="true"
        :location="langStore.currentLang === 'fa' ? 'left' : 'right'"
    >
        <div class="tw:px-5! tw:py-4!">
            <!-- notifications title -->
            <div class="tw:flex tw:flex-col tw:gap-1">
                <div class="tw:flex tw:justify-between tw:items-start">

                    <div
                        class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                    >
                        <icon-bell
                            class="tw:text-[30px] tw:text-gray-600! tw:dark:text-gray-300!"
                        />
                        <div
                            class="tw:text-[17px] tw:text-gray-700! tw:dark:text-gray-300!"
                        >
                            {{ langStore.label.title.notifications }}
                        </div>
                    </div>
                    <button
                        @click="notificationDrawer = false"
                        class="tw:text-[14px] tw:text-gray-600! tw:dark:text-gray-300! tw:hover:text-gray-200! tw:dark:hover:text-gray-100! tw:transition tw:duration-150!"
                    >
                        <icon-close
                            class="tw:text-[25px] tw:text-gray-600! tw:dark:text-gray-300!"
                        />
                    </button>
                </div>

                <div
                    class="tw:text-[14px] tw:text-gray-600! tw:dark:text-gray-300!"
                >
                    {{ langStore.label.description.notification }}
                </div>
            </div>

            <!-- filter -->
            <div
                class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-3 tw:mt-5!"
            >
                <div class="tw:relative!">
                    <label
                        v-if="filter.fromDate"
                        for="formDate"
                        class="tw:text-[11px] tw:absolute! tw:start-7 tw:-top-2.25 tw:z-10! tw:bg-primary-light! tw:text-primary-dark! tw:dark:text-primary-light!"
                        >{{ langStore.label.form.fromDate }}</label
                    >
                    <date-picker
                        v-model="filter.fromDate"
                        id="formDate"
                        simple
                        :placeholder="langStore.label.form.fromDate"
                        format="jYYYY/jMM/jDD"
                        display-format="jYYYY/jMM/jDD"
                        class="default-scroll tw:text-primary-dark! tw:dark:text-primary-light! tw:text-[14px]! tw:text-center!"
                        color="#1d202e"
                    />
                </div>
                <div class="tw:relative!">
                    <label
                        v-if="filter.toDate"
                        for="toDate"
                        class="tw:text-[11px] tw:absolute! tw:start-7 tw:-top-2.25 tw:z-10! tw:bg-primary-light! tw:text-primary-dark! tw:dark:text-primary-light!"
                        >{{ langStore.label.form.toDate }}</label
                    >
                    <date-picker
                        v-model="filter.toDate"
                        id="toDate"
                        simple
                        :placeholder="langStore.label.form.toDate"
                        format="jYYYY/jMM/jDD"
                        display-format="jYYYY/jMM/jDD"
                        class="default-scroll tw:text-primary-dark! tw:dark:text-primary-light! tw:text-[14px]! tw:text-center!"
                        clearable
                        color="#1d202e"
                    />
                </div>
            </div>

            <!-- notifications list -->
            <div class="tw-flex tw:flex-col tw:mt-5!">
                <div
                    v-for="(notification, index) in notifications"
                    :key="index"
                    class="tw:mb-5!"
                >
                    <div
                        class="tw:grid tw:grid-cols-2 tw:gap-2 tw:items-start tw:p-4! tw:bg-primary-dark tw:rounded-t-2xl tw:border-b tw:border-gray-300 tw:dark:bg-primary-dark"
                    >
                        <div
                            class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1"
                        >
                            <div
                                class="tw:flex tw:justify-start tw:items-center tw:gap-1"
                            >
                                <icon-user
                                    class="tw-text-color-reverse tw:text-[19px]! tw:md:text-[20px]! tw:text-center!"
                                />
                                <span
                                    class="tw-text-color-reverse tw:text-[15px] tw:md:text-[16px]! tw:text-center!"
                                    >{{ notification.username }}</span
                                >
                            </div>
                            <div
                                class="tw:flex tw:justify-end tw:items-center tw:gap-1"
                            >
                                <icon-date
                                    class="tw-text-color-reverse tw:text-[18px]! tw:md:text-[19px]! tw:text-center!"
                                />
                                <span
                                    class="tw-text-color-reverse tw:text-[12px]! tw:md:text-[13px]! tw:text-center!"
                                    >{{
                                        langStore.currentLang === "en"
                                            ? notification.date
                                            : notification.localDate
                                    }}</span
                                >
                            </div>
                        </div>
                        <div
                            class="tw:flex tw:justify-end tw:items-center tw:gap-1"
                        >
                            <icon-plus
                                v-if="notification.action === 'add'"
                                class="tw:text-[17px]! tw:md:text-[19px]! tw-text-color-reverse tw:dark:primary-light"
                            />
                            <icon-edit
                                v-else-if="notification.action === 'update'"
                                class="tw:text-[16px]! tw:md:text-[17px]! tw-text-color-reverse tw:dark:primary-light"
                            />
                            <icon-trash
                                v-else-if="notification.action === 'delete'"
                                class="tw:text-[16px]! tw:md:text-[17px]! tw-text-color-reverse tw:dark:primary-light"
                            />
                            <icon-info-circle
                                v-else-if="notification.action === 'change_status'"
                                class="tw:text-[16px]! tw:md:text-[17px]! tw-text-color-reverse tw:dark:primary-light"
                            />
                            <div
                                class="tw:text-[12px]! tw:md:text-[13px]! tw:font-semibold tw-text-color-reverse tw:text-justify"
                            >
                                {{
                                    langStore.currentLang == "en"
                                        ? notification.enTitle
                                        : notification.faTitle
                                }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1 tw:bg-white tw:dark:bg-background-dark tw:p-4! tw:rounded-b-2xl!"
                    >
                        <div
                            class="tw:text-[13px] tw:md:text-[14px]! tw:font-semibold tw:text-primary-dark tw:dark:text-primary-light tw:text-justify"
                        >
                            {{
                                langStore.currentLang == "en"
                                    ? notification.enMessage
                                    : notification.faMessage
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
// ======= Imports =======
// store
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useNotificationStore } from "~/store/notification";
const notificationStore = useNotificationStore();
const { notificationResult: notifications } = storeToRefs(notificationStore);

// date
import moment, { lang } from "jalali-moment";
const NowDate = moment().locale("fa").format("jYYYY/jMM/jDD");

// ======= composables =======
const { notificationDrawer } = useNotification();

// ======= TS types =======
interface Filter {
    fromDate: string | null;
    toDate: string | null;
}

// ======= Data =======
const filter = ref<Filter>({
    fromDate: NowDate,
    toDate: null,
});

// ======= methods =======
const loadNotifications = () => {
    let payload = "";
    if (filter.value.fromDate) {
        payload += "?fromDate=" + filter.value.fromDate;
    }
    if (filter.value.toDate) {
        payload += "&toDate=" + filter.value.toDate;
    }
    notificationStore.getNotifications(payload);
};

// ======= lifecycle =======
onMounted(() => {
    notificationStore.getNotifications();
});
</script>

<style scoped>
:deep(html[dir="rtl"] .vpd-input-group input) {
    transform: translateX(20px) !important;
}
:deep(html[dir="ltr"] .vpd-input-group input) {
    transform: translateX(-20px) !important;
}
</style>
