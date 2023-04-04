//Call Fetch Event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    console.log(e.request),
    fetch(e.request)
      .then((res) => {
        //Make clone of response
        const resClone = res.clone();
        //Open cache
        caches.open(cacheName).then((cache) => {
          //Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
