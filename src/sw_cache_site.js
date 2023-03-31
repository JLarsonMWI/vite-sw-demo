const cacheName = 'v4'

//Call Install Event
// eslint-disable-next-line no-unused-vars
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed')
})

//Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated')
  //Remove old/unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log(`Service Worker: Clearing Old Cache: ${cache}`)
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

//Call Fetch Event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching')
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //Make clone of response
        const resClone = res.clone()
        //Open cache
        caches.open(cacheName).then((cache) => {
          //Add response to cache
          cache.put(e.request, resClone)
        })
        return res
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => caches.match(e.request).then((res) => res))
  )
})
