export default () => ({
  currentLang: process.client
    ? localStorage.getItem("selectedLang") || "fa"
    : "fa",
  get direction() {
    return this.currentLang.toLowerCase() === "en" ? "ltr" : "rtl";
  },
});