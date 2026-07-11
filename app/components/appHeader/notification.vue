<template>
    <v-menu class="tw:relative tw:z-9999!">
        <template v-slot:activator="{ props }">
            <div
                class="tw:w-10 tw:h-10 tw:flex tw:justify-center tw:items-center tw:bg-white tw:dark:bg-gray-800 tw:border-3 tw:border-white tw:dark:border-gray-800 tw:rounded-full tw:overflow-hidden tw:hover:bg-gray-50 tw:hover:border-gray-50 tw:dark:hover:border-gray-800 tw:dark:hover:bg-primary-dark tw:transition tw:duration-200 tw:cursor-pointer"
                v-bind="props"
            >
                <icon-bell class="tw:text-[22px]" />
            </div>
        </template>
        <div
            class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:min-w-40 tw:max-w-80 tw:overflow-hidden tw:mt-3! tw:border tw:border-gray-200 tw:dark:border-gray-700"
        >
            <div class="tw:flex tw:flex-col tw:gap-2">
                <div
                    v-for="(notification, index) in notifications.notifications.slice(0,3)"
                    :key="index"
                    class="tw:p-2!"
                >
                    <div class="tw:flex tw:justify-between tw:items-center tw:gap-5">
                        <div
                            class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                        >
                            <icon-circle
                                class="tw:w-2.25 tw:h-2.25 tw:text-cyan-500 tw:dark:text-cyan-300"
                            />
                            <div
                                class="tw:text-[12px] tw:font-semibold tw:text-gray-700 tw:dark:text-gray-300 tw:text-justify"
                            >
                                {{
                                    langStore.currentLang == "en"
                                        ? notification.enTitle
                                        : notification.faTitle
                                }}
                            </div>
                        </div>
                        <div
                            class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                        >
                            <div
                                class="tw:text-[12px] tw:text-gray-700 tw:dark:text-gray-300 tw:text-justify"
                            >
                                {{
                                    langStore.currentLang == "en"
                                        ? notification.createdData
                                        : notification.createdData
                                }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="tw:text-[11px] tw:font-semibold tw:text-gray-700 tw:dark:text-gray-300 tw:text-justify tw:pt-1.5!"
                    >
                        {{
                            langStore.currentLang == "en"
                                ? notification.enMessage
                                : notification.faMessage
                        }}
                    </div>
                </div>
            </div>
            <div class="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:py-2!">
                <button class="tw:text-primary-light! tw:dark:text-primary-dark! tw:text-[12px]! tw:bg-primary-dark!  tw:dark:bg-primary-light! tw:rounded-full tw:p-1! tw:px-3!">
                    {{ langStore.label.button.showNotification }}
                </button>
            </div>
        </div>
    </v-menu>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useNotificationStore } from "~/store/notification";
const notificationStore = useNotificationStore();
const { notificationResult: notifications } = storeToRefs(notificationStore);

onMounted(() => {
    notificationStore.getNotifications();
});
</script>
