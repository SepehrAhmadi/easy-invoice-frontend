import { useHandlerStore } from "~/store/handler";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;
  const handlerStore = useHandlerStore();

  // unauthorized (from axios plugin interceptor)
  if (handlerStore.unauthorized) {
    handlerStore.clearFlags();
    return navigateTo("/auth");
  }

  // forbidden (from axios plugin interceptor)
  if (handlerStore.forbidden) {
    handlerStore.clearFlags();
    return navigateTo("/403");
  }

  // if have redirect path from backend
  if (handlerStore.redirectTo) {
    const to = handlerStore.redirectTo;
    handlerStore.clearFlags();
    return navigateTo(to);
  }

  // guest guard
  if (!token && to.path !== "/auth") {
    return navigateTo("/auth");
  }

  // logged-in user shouldn't see auth page
  if (token && to.path === "/auth") {
    return navigateTo("/");
  }
});
