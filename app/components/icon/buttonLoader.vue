<template>
  <svg viewBox="0 0 50 50" class="loader">
    <g
      v-for="(delay, index) in delays"
      :key="index"
      :transform="`rotate(${index * 30} 25 25)`"
    >
      <circle cx="25" cy="8" r="3" fill="currentColor">
        <animate
          attributeName="r"
          values="3;1;3"
          dur="2s"
          :begin="delay"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="8;15;8"
          dur="2s"
          :begin="delay"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          values="1;0.3;1"
          dur="2s"
          :begin="delay"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
</template>

<script>
export default {
  name: "IconButtonLoader",
  computed: {
    delays() {
      return Array.from({ length: 12 }, (_, i) => `${i * 0.15}s`);
    },
  },
};
</script>

<style scoped>
.loader {
  width: 1em;
  height: 1em;
}
</style>
