const worker = new Worker(new URL("./worker.js", import.meta.url));

export function installWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("navButtonClick", () => {
      navigator.serviceWorker
        .register("./sw_cache_data.js")
        .catch((err) => console.log(`Service Worker: Error: ${err}`));
    });
  }
}
