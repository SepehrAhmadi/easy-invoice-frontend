export const useNotification = () => {
  const notificationDrawer = useState("notification-drawer", () => false);
  return { notificationDrawer };
};