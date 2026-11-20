/* CFA Spark PWA: cache only public install assets, never private operational data. */
const ASSET_CACHE="cfa-spark-pwa-assets-v2";
const ASSETS=["/offline.html","/icon.svg","/icon-192.png","/icon-512.png","/apple-touch-icon.png","/manifest.webmanifest"];
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
