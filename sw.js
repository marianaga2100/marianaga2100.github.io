//asignar un nombre y versión al cache
const CACHE_NAME = 'app_cache_marian2',
  urlsToCache = [
    './',
    'css/estilo.css',
    'disp/CtrlDispositivo.js',
    'disp/ProxyEntrada.js',
    'disp/ProxyHistorial.js',
    'disp/ProxySalida.js',
    'disp/ReseInt.js',
    'disp/utilIoT.js',
    'js/CtrlHistorial.js',
    'js/CtrlMovil.js',
    'js/init.js',
    'js/script.js',
    'js/tipos.js',
    'lib/fabrica.js',
    'lib/tiposFire.js',
    'lib/util.js',
    'dispositivo.html',
    'favicon.ico',
    'historial.html',
    'index.html'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener("install",
  evt => {
    console.log("sw instalado.");
    /* Realiza la instalación.
     * Carga los archivos
     * requeridos en la caché. */
    evt.waitUntil(cargaCache());
  });

/* Toma los archivos solicitados
 * de la caché; si no los
 * encuentra, se descargan. */
self.addEventListener("fetch",
  evt => {
    if (evt.request.method ===
      "GET") {
      evt.respondWith(
        usaCache(evt));
    }
  });

self.addEventListener("activate",
  () =>
    console.log("sw activo."));

async function cargaCache() {
  console.log(
    "Intentando cargar cache",
    CACHE);
  const cache =
    await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache", CACHE,
    "cargado");
}

async function usaCache(evt) {
  const cache =
    await caches.open(CACHE);
  const response =
    await cache.match(evt.request,
      { ignoreSearch: true });
  if (response) {
    return response;
  } else {
    return fetch(evt.request);
  }
}
