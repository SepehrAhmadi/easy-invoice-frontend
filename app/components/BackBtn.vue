<template>
  <v-btn
    @click="handleClick"
    :color="props.color"
    variant="outlined"
    rounded="pill"
    class="tw:px-4! tw:group"
  >
    <div class="tw:text-[14px]!">
      {{ langStore.label.button.back }}
    </div>
    <icon-arrow-left
      class="tw:text-[20px]! tw:ms-1! tw:group-hover:-translate-x-1.5 tw:transition tw:duration-200"
    />
  </v-btn>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/store/language";
import CircleOutline from "./icon/circleOutline.vue";
const langStore = useLanguageStore();

const props = defineProps({
  color: {
    type: String,
    default: "gray",
  },
});

const router = useRouter();
const handleClick = () => {
  router.go(-1);
};
</script>
