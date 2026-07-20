<template>
    <div>
        <v-container fluid class="tw:md:pe-0! tw:md:py-0!">
            <v-row
                ref="headerSectionRef"
                class="tw-flex! tw:items-center! tw:bg-primary-dark tw:border-b tw:border-gray-300 tw:rounded-t-4xl! tw:p-3!"
            >
                <v-col cols="12" md="6">
                    <div>
                        <div
                            class="tw:flex tw:justify-start tw:items-center tw:gap-2"
                        >
                            <icon-bell
                                class="tw-text-color-reverse header-icon"
                            />
                            <div
                                class="tw-text-color-reverse header-title tw:text-nowrap"
                            >
                                {{ langStore.label.title.notifications }}
                            </div>
                        </div>
                        <div
                            class="tw:text-gray-400 tw:text-justify header-desc tw:mt-2! tw:text-nowrap"
                        >
                            {{ langStore.label.description.notification }}
                        </div>
                    </div>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                    class="tw:flex tw:md:justify-end tw:items-center tw:gap-4"
                >
                    <div class="tw:relative!">
                        <label
                            v-if="filter.fromDate"
                            for="formDate"
                            class="tw:text-[11px] tw:absolute! tw:bg-primary-dark! tw:start-10 tw:-top-1.75 tw:z-10! tw-text-color-reverse"
                            >{{ langStore.label.form.fromDate }}</label
                        >
                        <date-picker
                            v-model="filter.fromDate"
                            id="formDate"
                            simple
                            :placeholder="langStore.label.form.fromDate"
                            format="jYYYY/jMM/jDD"
                            display-format="jYYYY/jMM/jDD"
                            class="default-scroll tw:text-gray-300! tw:text-[14px]! tw:text-center!"
                            color="#1d202e"
                            @update:modelValue="loadNotifications"
                        />
                    </div>
                    <div class="tw:relative!">
                        <label
                            v-if="filter.toDate"
                            for="toDate"
                            class="tw:text-[11px] tw:absolute! tw:bg-primary-dark! tw:start-10 tw:-top-1.75 tw:z-10! tw-text-color-reverse"
                            >{{ langStore.label.form.toDate }}</label
                        >
                        <date-picker
                            v-model="filter.toDate"
                            id="toDate"
                            simple
                            :placeholder="langStore.label.form.toDate"
                            format="jYYYY/jMM/jDD"
                            display-format="jYYYY/jMM/jDD"
                            class="default-scroll tw:text-gray-300! tw:text-[14px]! tw:text-center!"
                            clearable
                            color="#1d202e"
                            @update:modelValue="loadNotifications"
                        />
                    </div>
                    <v-btn
                        @click="readAllNotifications"
                        color="white"
                        rounded="pill"
                        class="tw:h-10!"
                    >
                        <div
                            class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                        >
                            <icon-check-double
                                class="tw:text-[18px] tw:2xl:text-[18px]"
                            />
                            <div class="tw:text-[13px] tw:3xl:text-[15px]">
                                {{ langStore.label.button.readAll }}
                            </div>
                        </div>
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="tw:rounded-b-4xl! tw:p-0!">
                <v-col cols="12" class="tw:p-0!">
                    <div ref="tableContainerRef">
                        <v-card
                            class="tw:rounded-b-4xl! tw:shadow-none! tw:pt-1!"
                        >
                            <v-data-table-virtual
                                :headers="tableHeader"
                                :items="notifications"
                                hide-default-footer
                                :height="tableHeight"
                                class="tw:bg-white! tw:dark:bg-primary-dark!"
                            >
                                <template #item="{ item, index }">
                                    <tr class="tw:my-2!">
                                        <td>
                                            <div
                                                class="tw:bg-primary-dark tw:dark:bg-primary-light tw:text-primary-light tw:dark:text-primary-dark tw-text-[16px] tw:w-7 tw:h-7 tw:rounded-full tw:flex tw:justify-center tw:items-center"
                                            >
                                                {{ index + 1 }}
                                            </div>
                                        </td>
                                        <td
                                            class="tw-text-color tw:text-nowrap tw:text-center"
                                        >
                                            {{
                                                langStore.currentLang == "en"
                                                    ? item.date
                                                    : item.localDate
                                            }}
                                        </td>
                                        <td
                                            class="tw-text-color tw:text-nowrap tw:text-center"
                                        >
                                            {{ item.username || "—" }}
                                        </td>
                                        <td class="tw:w-auto!">
                                            <div
                                                class="tw:flex tw:justify-center"
                                            >
                                                <div
                                                    class="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:py-0.75! tw:rounded-full"
                                                >
                                                    <div
                                                        v-if="
                                                            item.action ===
                                                            'add'
                                                        "
                                                        class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                                                    >
                                                        <icon-plus
                                                            class="tw-text-color-lighter tw:text-[17px]"
                                                        />
                                                        <span
                                                            class="tw-text-color tw:text-center tw:text-nowrap"
                                                        >
                                                            {{
                                                                langStore.currentLang ==
                                                                "en"
                                                                    ? item.enTitle
                                                                    : item.faTitle
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            item.action ===
                                                            'update'
                                                        "
                                                        class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                                                    >
                                                        <icon-edit
                                                            class="tw-text-color-lighter tw:text-[17px]"
                                                        />
                                                        <span
                                                            class="tw-text-color tw:text-center tw:text-nowrap"
                                                        >
                                                            {{
                                                                langStore.currentLang ==
                                                                "en"
                                                                    ? item.enTitle
                                                                    : item.faTitle
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            item.action ===
                                                            'delete'
                                                        "
                                                        class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                                                    >
                                                        <icon-trash
                                                            class="tw-text-color-lighter tw:text-[17px]"
                                                        />
                                                        <span
                                                            class="tw-text-color tw:text-center tw:text-nowrap"
                                                        >
                                                            {{
                                                                langStore.currentLang ==
                                                                "en"
                                                                    ? item.enTitle
                                                                    : item.faTitle
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            item.action ===
                                                            'change_status'
                                                        "
                                                        class="tw:flex tw:justify-center tw:items-center tw:gap-2"
                                                    >
                                                        <icon-info-circle
                                                            class="tw-text-color-lighter tw:text-[17px]"
                                                        />
                                                        <span
                                                            class="tw-text-color tw:text-center tw:text-nowrap"
                                                        >
                                                            {{
                                                                langStore.currentLang ==
                                                                "en"
                                                                    ? item.enTitle
                                                                    : item.faTitle
                                                            }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="tw-text-color tw:text-center tw:text-nowrap"
                                        >
                                            {{
                                                langStore.currentLang == "en"
                                                    ? item.enMessage
                                                    : item.faMessage
                                            }}
                                        </td>
                                        <td>
                                            <div
                                                class="tw:flex tw:justify-center tw:items-center"
                                            >
                                                <div
                                                    class="tw:flex tw:justify-center tw:items-center tw:w-30! tw:gap-2 tw:py-0.75! tw:px-3! tw:rounded-full"
                                                    :class="{
                                                        'tw:bg-success/10 tw:border tw:border-success/40 tw:text-success tw:dark:text-green-500':
                                                            item.isRead,
                                                        'tw:bg-gray-100 tw:dark:bg-gray-800 tw:border tw:border-gray-400 tw:dark:border-gray-500 tw-text-color-lighter':
                                                            !item.isRead,
                                                    }"
                                                >
                                                    <icon-check-double
                                                        v-if="item.isRead"
                                                        class="tw:text-[20px]"
                                                    />
                                                    <icon-circle-outline
                                                        v-else
                                                        class="tw:text-[15px]"
                                                    />
                                                    <div class="tw:text-[12px]">
                                                        {{
                                                            item.isRead
                                                                ? langStore
                                                                      .label
                                                                      .table
                                                                      .read
                                                                : langStore
                                                                      .label
                                                                      .table
                                                                      .unread
                                                        }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                class="tw:flex tw:justify-center tw:items-center tw:gap-1"
                                            >
                                                <v-tooltip
                                                    location="top"
                                                    :disabled="item.isRead"
                                                >
                                                    <template
                                                        #activator="{ props }"
                                                    >
                                                        <span
                                                            v-bind="props"
                                                            class="tw:inline-flex"
                                                        >
                                                            <v-btn
                                                                @click="
                                                                    markAsRead(
                                                                        item,
                                                                    )
                                                                "
                                                                size="x-small"
                                                                variant="text"
                                                                rounded="pill"
                                                                class="tw:w-8! tw:h-8! tw:px-0!"
                                                                :disabled="
                                                                    item.isRead
                                                                "
                                                            >
                                                                <icon-check-double
                                                                    class="tw:text-[23px]"
                                                                    :class="
                                                                        item.isRead
                                                                            ? 'tw:text-gray-800 tw:dark:text-gray-600'
                                                                            : 'tw-text-color-lighter'
                                                                    "
                                                                />
                                                            </v-btn>
                                                        </span>
                                                    </template>
                                                    <span
                                                        class="tw:text-xs tw:p-2"
                                                        >{{
                                                            langStore.label
                                                                .button
                                                                .markAsRead
                                                        }}</span
                                                    >
                                                </v-tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                </template>

                                <template #no-data>
                                    <div
                                        class="tw:h-full! tw:flex tw:justify-center tw:items-center tw:gap-2"
                                    >
                                        <icon-row-chart
                                            class="tw-text-color-lighter tw:text-[35px]"
                                        />
                                        <div
                                            class="tw-text-color-lighter tw:text-[14px] tw:lg:text-[16px] tw:2xl:text-[18px] tw:text-nowrap"
                                        >
                                            {{
                                                langStore.label.caption
                                                    .noDataFound
                                            }}
                                        </div>
                                    </div>
                                </template>
                            </v-data-table-virtual>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
// ======= Imports =======
// stores
import { useLanguageStore } from "~/store/language";
const langStore = useLanguageStore();

import { useNotificationStore } from "~/store/notification";
const notificationStore = useNotificationStore();
const { notificationResult : notifications } = storeToRefs(notificationStore);

// date
import moment from "jalali-moment";
const NowDate = moment().locale("fa").format("jYYYY/jMM/jDD");

// ======= Composables =======
const { setPageTitle } = usePageTitle();
watchEffect(() => {
    setPageTitle(langStore.label.page.notifications);
});
const { height: windowHeight } = useWindowSize();

// ======= enum & TS types and interface =======
interface Filter {
    fromDate: string | null;
    toDate: string | null;
    page: number;
    pageSize: number;
}

// ======= Data =======
// table
const tableHeader = computed(
    () =>
        [
            {
                title: langStore.label.table.row,
                key: "row",
                align: "start",
                sortable: false,
            },
            {
                title: langStore.label.table.date,
                key: "date",
                align: "center",
                sortable: false,
            },
            {
                title: langStore.label.table.username,
                key: "username",
                align: "center",
                sortable: false,
            },
            {
                title: langStore.label.table.title,
                key: "title",
                align: "center",
                sortable: false,
            },
            {
                title: langStore.label.table.message,
                key: "message",
                align: "center",
                sortable: false,
            },
            {
                title: langStore.label.table.isRead,
                key: "isRead",
                align: "center",
                sortable: false,
            },
            {
                title: langStore.label.table.actions,
                key: "actions",
                align: "center",
                sortable: false,
            },
        ] as const,
);
// filter
const filter = ref<Filter>({
    fromDate: NowDate,
    toDate: null,
});
// dynamic table height
const headerSectionRef = ref<HTMLElement | null>(null);
const tableContainerRef = ref<HTMLElement | null>(null);
const tableHeight = ref(400);
const TABLE_BOTTOM_GAP = 16;

// ======= Computeds =======
function updateTableHeight() {
    const el = tableContainerRef.value;
    if (!el) return;

    const { top } = el.getBoundingClientRect();
    tableHeight.value = Math.max(
        200,
        window.innerHeight - top - TABLE_BOTTOM_GAP,
    );
}

useResizeObserver(headerSectionRef, () => nextTick(updateTableHeight));
watch(windowHeight, updateTableHeight);

// ======= Functions =======
const loadNotifications = async () => {
    let payload = "?page=1&pageSize=100";
    if (filter.value.fromDate) {
        payload += "&fromDate=" + filter.value.fromDate;
    }
    if (filter.value.toDate) {
        payload += "&toDate=" + filter.value.toDate;
    }
    await notificationStore.getNotifications(payload);
};

const markAsRead = async (item: any) => {
    if (!item || item.isRead) return;

    await notificationStore.readNotification(item.id);
    item.isRead = true;
};

const readAllNotifications = async () => {
    await notificationStore.readAllNotifications();
};

// ======= Lifecycle =======
onMounted(() => {
    loadNotifications();
    nextTick(updateTableHeight);
});
</script>
