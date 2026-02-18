<template>
  <v-app>
    <Loader />

    <Alert />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<style>
/* page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

/* layout transition */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
