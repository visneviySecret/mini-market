export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie<string | null>("auth_token");

  if (to.path === "/authorize") {
    if (auth.value) {
      return navigateTo("/");
    }
    return;
  }

  if (!auth.value) {
    return navigateTo("/authorize");
  }
});
