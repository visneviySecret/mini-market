export default defineNuxtPlugin(() => {
  if (process.client) {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "string" &&
        args[0].includes("Unknown origin")
      ) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    window.addEventListener("load", () => {
      if (window.Robokassa) {
        console.log("Robokassa ready");
      }
    });
  }
});
