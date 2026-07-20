<template>
    <div class="tw:relative">
        <v-menu v-model="menu" class="tw:relative tw:z-9999!">
            <template v-slot:activator="{ props }">
                <div
                    class="tw:w-10 tw:h-10 tw:flex tw:justify-center tw:items-center tw:bg-white tw:dark:bg-gray-800 tw:border-3 tw:border-white tw:dark:border-gray-800 tw:rounded-full tw:overflow-hidden tw:hover:bg-gray-50 tw:hover:border-gray-50 tw:dark:hover:border-gray-800 tw:dark:hover:bg-primary-dark tw:transition tw:duration-200 tw:cursor-pointer"
                    v-bind="props"
                >
                    <icon-bell class="tw:text-[22px]" />
                </div>
            </template>
            <div
                class="tw:bg-white tw:dark:bg-primary-dark tw:rounded-lg tw:min-w-60 tw:max-w-80 tw:overflow-hidden tw:mt-3! tw:border tw:border-gray-200 tw:dark:border-gray-700"
            >
                <div class="tw:flex tw:flex-col tw:gap-2">
                    <div
                        v-for="(notification, index) in notifications.slice(
                            0,
                            3,
                        )"
                        :key="index"
                        class="tw:p-2!"
                    >
                        <div
                            class="tw:flex tw:justify-between tw:items-center tw:gap-4"
                        >
                            <div>
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
                                            v-else-if="
                                                notification.action === 'update'
                                            "
                                            class="tw:w-3.75 tw:h-3.75"
                                            :class="{
                                                'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                                    notification.isRead,
                                                'tw:text-primary-dark tw:dark:text-primary-light':
                                                    !notification.isRead,
                                            }"
                                        />
                                        <icon-trash
                                            v-else-if="
                                                notification.action === 'delete'
                                            "
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
                                                notification.action ===
                                                'change_status'
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
                            <div>
                                <icon-check-double
                                    v-if="notification.isRead === true"
                                    class="tw:text-[20px]"
                                    :class="{
                                        'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                            notification.isRead,
                                        'tw:text-primary-dark tw:dark:text-primary-light':
                                            !notification.isRead,
                                    }"
                                />
                                <button
                                    v-else
                                    @click.stop="
                                        readNotifications(notification.id)
                                    "
                                >
                                    <icon-circle-outline
                                        class="tw:text-[16px] tw:me-px"
                                        :class="{
                                            'tw:text-primary-dark/60 tw:dark:text-primary-light/60':
                                                notification.isRead,
                                            'tw:text-primary-dark tw:dark:text-primary-light':
                                                !notification.isRead,
                                        }"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="tw:flex tw:w-full tw:justify-center tw:items-center tw:gap-3 tw:py-3! tw:px-2!"
                >
                    <div class="tw:flex-1">
                        <button
                            @click.stop="navigateToNotification"
                            class="tw:w-full tw:text-primary-light! tw:dark:text-primary-dark! tw:text-[12px]! tw:border! tw:border-primary-dark! tw:bg-primary-dark! tw:dark:bg-primary-light! tw:hover:bg-primary-dark/90! tw:dark:hover:bg-primary-light/90! tw:transition tw:duration-150 tw:rounded-full tw:p-1! tw:px-3!"
                        >
                            {{ langStore.label.button.showNotification }}
                        </button>
                    </div>

                    <div class="tw:flex-1">
                        <button
                            @click.stop="readAllNotifications"
                            class="tw:w-full tw:text-primary-dark! tw:dark:text-primary-light! tw:text-[12px]! tw:bg-transparent! tw:border! tw:border-primary-dark/60! tw:dark:border-primary-light! tw:hover:bg-primary-dark/10! tw:dark:hover:bg-primary-light/10! tw:transition tw:duration-150 tw:rounded-full tw:p-1! tw:px-3!"
                        >
                            {{ langStore.label.button.readAll }}
                        </button>
                    </div>
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

import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();

import { useNotificationStore } from "~/store/notification";
import { ReadableStreamDefaultController } from "node:stream/web";
const notificationStore = useNotificationStore();
const { widgetNotificationsResult: notifications, unreadCount } =
    storeToRefs(notificationStore);

// ======= data ========
const menu = ref(false);
const page = ref<number>(1);
const pageSize = ref<number>(3);

// ======= methods=======
const loadNotifications = async () => {
    await notificationStore.getWidgetNotifications();
};

const loadUnreadCount = async () => {
    await notificationStore.getUnreadCount();
};

const readNotifications = (id: string) => {
    notificationStore.readNotification(id);
};

const readAllNotifications = () => {
    const visibleNotifications = notifications.value.slice(0, 3);

    for (const notification of visibleNotifications) {
        if (notification.isRead === false) {
            notificationStore.readNotification(notification.id);
        }
    }
};

const navigateToNotification = () => {
    navigateTo("/notification");
    menu.value = false;
};

// ======= watcher =======
watch(
    () => handlerStore.postCheck,
    (val, oldVal) => {
        if (oldVal === true && val === false) {
            loadNotifications();
            loadUnreadCount();
        }
    },
);

onMounted(() => {
    loadUnreadCount();
    loadNotifications();
});
</script>
