// composables/usePageTitle.ts
export const usePageTitle = () => {
  const pageTitle = useState<string>("page-title", () => "Default Title");

  const setPageTitle = (newTitle: string) => {
    pageTitle.value = newTitle;
    useHead({
      title: newTitle,
    });
  };

  return {
    pageTitle,
    setPageTitle,
  };
};
