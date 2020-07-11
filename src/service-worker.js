importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://hacker-news.firebaseio.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'hn-api-cache',
    })
)

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
