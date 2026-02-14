import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { watch } from "vue";
import { useLanguageStore } from "~/store/language";


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    directives,

    theme: {
      defaultTheme: "light",

      themes: {
        light: {
          dark: false,
          colors: {
            background: "#F1F1F1",
            surface: "#F1F1F1",
          },
        },
        dark: {
          dark: true,
          colors: {
            background: "#03020A",
            surface: "#03020A",
          },
        },
      },
    },

    locale: {
      locale: "fa",
      rtl: { fa: true, en: false },
    },
  });
  app.vueApp.use(vuetify);

  if (process.client) {
    const langStore = useLanguageStore();
    const html = document.documentElement;

    const applyDir = (code: string) => {
      const isFa = code === "fa";
      vuetify.locale.current.value = code;
      html.setAttribute("dir", isFa ? "rtl" : "ltr");
    };

    applyDir(langStore.currentLang);
    watch(
      () => langStore.currentLang,
      (val) => applyDir(val),
      { immediate: false },
    );
  }
});
