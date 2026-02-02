export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;

  if (to.path !== "/auth" && !token) {
    console.log("middleware 1");
    return navigateTo("/auth");
  }

  if (to.path === "/auth" && token) {
    console.log("middleware 2");
    return navigateTo("/");
  }
});
