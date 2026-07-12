<template>
    <v-navigation-drawer
        v-model="notificationDrawer"
        width="380"
        :temporary="true"
        :location="langStore.currentLang === 'fa' ? 'left' : 'right'"
    >
        <div class="tw:px-4! tw:py-3!">
            <!-- notifications title -->
            <div class="tw:flex tw:flex-col tw:gap-1">
                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                    <icon-bell
                        class="tw:text-[30px] tw:text-gray-600! tw:dark:text-gray-300!"
                    />
                    <div
                        class="tw:text-[17px] tw:text-gray-700! tw:dark:text-gray-300!"
                    >
                        {{ langStore.label.title.notifications }}
                    </div>
                </div>
                <div
                  class="tw:text-[14px] tw:text-gray-600! tw:dark:text-gray-300!"
                >
                  {{ langStore.label.description.notification }}
                </div>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
// ======= store =======
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

// ======= composables =======
const { notificationDrawer } = useNotification();
</script>
