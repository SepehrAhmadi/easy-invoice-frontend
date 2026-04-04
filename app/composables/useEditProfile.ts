export const useEditProfile = () => {
  const drawer = useState("edit-profile-drawer", () => false);
  return { drawer };
};
