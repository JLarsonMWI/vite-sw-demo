const cacheName = "v1";
const cacheUrl = "/state/orderData";

//Call Activate Event
self.addEventListener("activate", (e) => {
  //Remove old/unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log(`Service Worker: Clearing Old Cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

const cacheStateData = async (event) => {
  function cachedState() {
    return event.request.clone().json();
  }
  const stateCache = await cachedState();

  const options = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    statusText: "Success!",
  };
  const stateBody = JSON.stringify(stateCache);

  const orderDataRes = new Response(stateBody, options);
  const cache = await caches.open(cacheName);
  await cache.put(cacheUrl, orderDataRes);

  const resBody = JSON.stringify({ successful: true });
  const newResponse = new Response(resBody, options);

  return newResponse;
};

const buildEmptyRequest = async () => {
  const nullState = {
    entityState: null,
    entityType: null,
    bundleName: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    phoneNumber: null,
    businessName: null,
  };
  const options = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    statusText: "Success!",
  };
  const emptyBody = JSON.stringify(nullState);

  const emptyRes = new Response(emptyBody, options);
  const cache = await caches.open(cacheName);
  await cache.put(cacheUrl, emptyRes);
  return emptyRes;
};

//Call Fetch Event
self.addEventListener("fetch", (event) => {
  if (event.request.url === `http://127.0.0.1:404/request/post`) {
    event.respondWith(cacheStateData(event));
  } else if (event.request.url === `http://127.0.0.1:404/request/get`) {
    event.respondWith(
      caches.match(cacheUrl).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return buildEmptyRequest();
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
