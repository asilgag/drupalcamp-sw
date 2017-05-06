/* eslint-env worker */
// global.toolbox is defined in a different script, sw-toolbox.js, which is part of the
// https://github.com/GoogleChrome/sw-toolbox project.
// That sw-toolbox.js script must be executed first, so it needs to be listed before this in the
// importScripts() call that the parent service worker makes.
(function(global) {
  'use strict';

  // global.toolbox.options.debug = true;

  // See https://github.com/GoogleChrome/sw-toolbox/blob/6e8242dc328d1f1cfba624269653724b26fa94f1/README.md#toolboxroutergeturlpattern-handler-options
  // and https://github.com/GoogleChrome/sw-toolbox/blob/6e8242dc328d1f1cfba624269653724b26fa94f1/README.md#toolboxfastest
  // for more details on how this handler is defined and what the toolbox.fastest strategy does.

  var urlsToPreCache = [

    // Urls públicas
    '/',
    '/nuestra-empresa',
    '/productos',
    '/donde-estamos',

    // Assets CSS de las urls anteriores
    // (opcional, se puede cachear al vuelo con global.toolbox.router.get)
    '/sites/default/files/css/css_Sr-zrzbdX7e1D5RQ_QtqOK_J8ztT5TgNbD9A14dx0Pw.css?0',
    '/sites/default/files/css/css_3lBjB9LxWGvT5F_MnCGazkuov6eT9QNhKr0hGqtNWTk.css?0',
    '/sites/default/files/css/css_uRYxP28I3YazA72rsR9rOx7Fx7OnKOzMWs81IMqO7go.css?0',

    // Assets JS de las urls anteriores
    // (opcional, se puede cachear al vuelo con global.toolbox.router.get)
    '/sites/default/files/js/js_px9pPKIa62nthYM6IwN9nictkrQpqoUqnK6fkAtMrWQ.js',

    // Assets imagen de las urls anteriores
    // (opcional, se puede cachear al vuelo con global.toolbox.router.get)
    '/sites/default/files/inline-images/empresa_0.jpg',
    '/sites/default/files/inline-images/productos.jpg',
    '/sites/default/files/inline-images/mapa_0.jpg'
  ];

  // Precachea urls y sus assets
  global.toolbox.precache(urlsToPreCache);

  // Definimos reglas del router para las urls y assets
  urlsToPreCache.map(function (url) {
    global.toolbox.router.get(url, global.toolbox.fastest);
  });

  // Aparte, cacheamos lo que haya dentro de files, excepto CSS y JS
  global.toolbox.router.get(/\/sites\/default\/files\/((?!css|js).)*\/.*/, global.toolbox.fastest);

  // Drupal usa content hashing para las urls de CSS y JS,
  // por lo que nunca cambian y podemos usar cacheFirst
  global.toolbox.router.get(/\/sites\/default\/files\/(css|js)\/.*/, global.toolbox.cacheFirst);

  // Cachéo para tipografías externas
  global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
    origin: /\.(?:googleapis|gstatic)\.com$/
  });

})(self);
