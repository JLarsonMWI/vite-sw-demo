//Check for service worker support

if ('serviceWorker' in navigator) {
  console.log('Service Worker Supported')
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw_cache_site.js/')
      // eslint-disable-next-line no-unused-vars
      .then((reg) => console.log('Service Worker: Registered'))
      .catch((err) => console.log(`Service Worker: Error: ${err}`))
  })
}
