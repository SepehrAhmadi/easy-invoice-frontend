<template>
    <v-layout class="tw:h-screen">
        <edit-profile />

        <app-header />

        <v-main class="tw:h-full">
            <div class="tw:relative!">
                <page-header />
            </div>

            <div
                class="tw:h-full tw:overflow-y-auto tw:overflow-x-hidden custom-scroll tw:py-4! tw:3xl:py-6!"
            >
                <!-- Page Content -->
                <div class="tw:md:me-8! tw:relative">
                    <slot />
                </div>
            </div>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~/store/notification";
const notificationStore = useNotificationStore();

onMounted(async () => {
    await notificationStore.connectNotification();
});
</script>
