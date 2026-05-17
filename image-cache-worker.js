self.addEventListener('fetch', (event) => {
  if (!event.request.url.match(/\.ico|\.png|\.jpg|\.svg/)) return

  event.respondWith(
    caches.open('images').then(async (cache) => {
      const cached = await cache.match(event.request)
      if (cached) return cached

      const response = await fetch(event.request)
      cache.put(event.request, response.clone())
      return response
    }),
  )
})
