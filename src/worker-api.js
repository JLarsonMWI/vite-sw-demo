const worker = new Worker(new URL("./worker.js", import.meta.url));

worker.addEventListener("message", (e) => {
  console.log("Message Returned:", e.data);
});

export function sendMessage(msg) {
  worker.postMessage(msg);
}

export function installWorker() {
  if ("serviceWorker" in navigator) {
    console.log("Service Worker Supported");
    window.addEventListener("navButtonClick", () => {
      navigator.serviceWorker
        .register("./sw_cache_data.js")
        .then((reg) => console.log("Service Worker: Registered"))
        .catch((err) => console.log(`Service Worker: Error: ${err}`));
    });
  }
}
