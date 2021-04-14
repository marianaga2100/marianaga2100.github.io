//asignar un nombre y versión al cache
const CACHE = 'app_cache_marian6,
  ARCHIVOS = [
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
  ];
//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => {
        return cache.addAll(ARCHIVOS)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      }).catch(err => console.log('Falló algo al solicitar recursos', err))
  )
})
