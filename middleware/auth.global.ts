export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie<string | undefined>(
    import.meta.env.VITE_RESRESH_TOKEN as string
  );

  if (to.path === "/authorize") {
    if (auth.value) {
      return navigateTo("/");
    }
    return;
  }
});
