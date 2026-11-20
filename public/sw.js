/* CFA Spark PWA: cache only public install assets, never private operational data. */
const ASSET_CACHE="cfa-spark-pwa-assets-v5";
const ASSETS=["/offline.html","/spark-cfa-favicon-64-v2.png","/spark-cfa-icon-192-v2.png","/spark-cfa-icon-512-v2.png","/spark-cfa-apple-touch-180-v2.png","/manifest.webmanifest","/cow-spark-approved.webp"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(ASSET_CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith("cfa-jolt-pwa-")||key.startsWith("cfa-spark-pwa-"))&&key!==ASSET_CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 if(event.request.mode==="navigate"&&new URL(event.request.url).origin===self.location.origin){
   event.respondWith(fetch(event.request).catch(()=>caches.match("/offline.html")));
 }
});
