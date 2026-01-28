import * as directives from "vuetify/directives";
import "vuetify/styles";
import { createVuetify } from "vuetify";

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
            background: "#303030",
            surface: "#303030",
          },
        },
      },
    },

    locale: {
      locale: "en",
      rtl: { fa: true, en: false },
    },
  });
  app.vueApp.use(vuetify);
});
