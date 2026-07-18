<template>
    <div class="tw:relative">
        <v-menu v-model="menu" class="tw:relative tw:z-9999!">
            <template v-slot:activator="{ props }">
                <div
                    @click="readNotifications"
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
                        v-for="(notification, index) in notifications"
                        :key="index"
                        class="tw:p-2!"
                    >
                        <div
                            class="tw:flex tw:justify-between tw:items-center tw:gap-7"
                        >
                            <div
                                class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                            >
                                <icon-plus
                                    v-if="notification.action === 'add'"
                                    class="tw:w-4 tw:h-4"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
                                />

                                <icon-edit
                                    v-else-if="notification.action === 'update'"
                                    class="tw:w-3.75 tw:h-3.75"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
                                />
                                <icon-trash
                                    v-else-if="notification.action === 'delete'"
                                    class="tw:w-4 tw:h-4"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
                                />
                                <icon-info-circle
                                    v-else-if="
                                        notification.action === 'change_status'
                                    "
                                    class="tw:w-4 tw:h-4"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
                                />
                                <div
                                    class="tw:text-[12px] tw:font-semibold tw:text-justify"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
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
                                    class="tw:text-[12px] tw:text-justify"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
                                >
                                    {{
                                        langStore.currentLang == "en"
                                            ? notification.date
                                            : notification.localDate
                                    }}
                                </div>
                            </div>
                        </div>
                        <div
                            class="tw:text-[11px] tw:font-semibold tw:text-justify tw:pt-2!"
                            :class="{
                                'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                    notification.isRead,
                                'tw:text-primary-dark tw:dark:text-primary-light':
                                    !notification.isRead,
                            }"
                        >
                            {{
                                langStore.currentLang == "en"
                                    ? notification.enMessage
                                    : notification.faMessage
                            }}
                        </div>
                    </div>
                </div>
                <div
                    class="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:py-3!"
                >
                    <button
                        @click.stop="openDrawer"
                        class="tw:text-primary-light! tw:dark:text-primary-dark! tw:text-[12px]! tw:bg-primary-dark! tw:dark:bg-primary-light! tw:hover:bg-primary-dark/90! tw:dark:hover:bg-primary-light/90! tw:transition tw:duration-150 tw:rounded-full tw:p-1! tw:px-3!"
                    >
                        {{ langStore.label.button.showNotification }}
                    </button>
                </div>
            </div>
        </v-menu>
        <div
            v-if="unreadCount > 0"
            class="tw:absolute tw:-top-0.75 tw:bg-primary-dark tw:dark:bg-primary-light tw:flex tw:justify-center tw:items-center tw:w-3.75 tw:h-3.75 tw:text-[11px] tw:rounded-full tw:text-white tw:dark:text-primary-dark"
        >
            {{ unreadCount }}
        </div>
    </div>
</template>

<script setup lang="ts">
// ======= store =======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useNotificationStore } from "~/store/notification";
const notificationStore = useNotificationStore();
const { notificationResult: notifications, unreadCount } =
    storeToRefs(notificationStore);

// ======= composables ========
const { notificationDrawer } = useNotification();

// ======= data ========
const menu = ref(false);
const pageSize = ref<number>(1);
const limit = ref<number>(3);

// ======= methods=======
const loadNotifications = async () => {
  let payload = "?page=" + pageSize.value + "&pageSize=" + limit.value;
  await notificationStore.getNotifications(payload);
};

const openDrawer = () => {
    menu.value = false;
    notificationDrawer.value = true;
};

const readNotifications = () => {
    notifications.value.map(async (notification) => {
        if (notification.isRead) return;
        console.log("read notification : ", notification);
        await notificationStore.readNotification(notification.id);
    });
};

// ======= watcher =======
watch(menu, (isOpen) => {
  if (!isOpen) {
      loadNotifications();
    }
});

onMounted(() => {
  loadNotifications();
});
</script>
