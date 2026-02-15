<template></template>

<script>
export default {
  name: "IconSiteLoader",
  computed: {
    delays() {
      return Array.from({ length: 12 }, (_, i) => `${i * 0.15}s`);
    },
  },
};
</script>

<style scoped>
.spinner {
  width: 1em;
  height: 1em;
}
</style>
