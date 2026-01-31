export default defineNuxtPlugin(() => {
  const lang = localStorage.getItem("selectedLang") || "fa";
  const body = document.body;
  document.dir = lang === "en" ? "ltr" : "rtl";
  if (document.dir == "ltr") {
    body.style.fontFamily = "arial , sans-serif";
  } else {
    body.style.fontFamily = "iranyekan, sans-serif";
  }

  const applyFonts = () => {
    const tags = [
      "p",
      "span",
      "div",
      "li",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "button",
      "input",
      "textarea",
    ];
    const elements = document.querySelectorAll(tags.join(","));

    elements.forEach((el) => {
      if (el.textContent.trim() === "") return;

      if (/[آ-ی]/.test(el.textContent)) {
        el.style.fontFamily = "iranyekan, sans-serif";
      } else {
        el.style.fontFamily = "arial , sans-serif";
      }
    });
  };
  window.addEventListener("load", applyFonts);
  const observer = new MutationObserver(applyFonts);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});
