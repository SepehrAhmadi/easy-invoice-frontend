export default {
  initLang() {
    if (process.client) {
      const saved = localStorage.getItem("selectedLang");
      if (saved) this.currentLang = saved;
    }
  },

  setLang(lang) {
    this.currentLang = lang;

    if (process.client) {
      localStorage.setItem("selectedLang", lang);
      const body = document.body;
      document.dir = lang === "en" ? "ltr" : "rtl";

      const elems = document.getElementsByClassName("v-locale--is-rtl");
      for (let i = 0; i < elems.length; i++) {
        elems[i].style.direction = document.dir === "rtl" ? "rtl" : "ltr";
      }

      body.style.fontFamily =
        document.dir === "rtl"
          ? "iranyekan, sans-serif"
          : "roboto , arial , sans-serif";
    }
  },
};
