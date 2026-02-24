export const useSeparator = () => {
  const separateNumber = (value: unknown): string => {
    if (value === null || value === undefined || value === "") return "";

    const num = Number(String(value).replace(/,/g, ""));
    if (isNaN(num)) return "";

    return num.toLocaleString("en-US");
  };

  return {
    separateNumber,
  };
};
