/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';
  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  // Keep
  var mustUnRegister = false;

  // In some cases we need service worker to be uninstalled
  var avoidServiceWorker = Boolean(
    mustUnRegister ||
    window.location.pathname.match(/^\/user\//) ||
    window.location.pathname.match(/^\/admin\//) ||
    document.body.className.indexOf('user-logged-in') !== -1
  );

  if (avoidServiceWorker) {
    console.log('[Service Worker] Must be unregistered');
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      if (registrations.length === 0) {
        console.log('[Service Worker] No registered workers found');
      }
      registrations.forEach(
        function (registration) {
          registration.unregister().then(function (boolean) {
            console.log('[Service Worker] Successfully unregistered');
          });
        }
      );
    });
  }
  else if ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)) {
    console.log('[Service Worker] Registration starts.');
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        // Log Service Worker Lifecycle
        // https://bitsofco.de/the-service-worker-lifecycle/
        console.log('[Service Worker] State: parsed');

        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          console.log('[Service Worker] New Service Worker found');
          console.log('[Service Worker] State: installing');
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            console.log('[Service Worker] Previous Service Worker found');
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  console.log('[Service Worker] State: installed / waiting ');
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  console.log('[Service Worker] New content available;' +
                    ' please refresh.');
                  var swConfirm = document.getElementsByClassName('service-worker-confirm');
                  if (swConfirm.length) {
                    swConfirm[0].className += ' visible';
                  }
                  /*
                   var snackbarContainer = document.getElementById('snackbar');
                   snackbarContainer.MaterialSnackbar.showSnackbar(
                   {
                   message: 'Nueva actualización disponible',
                   timeout: 100000,
                   actionHandler: function() {
                   document.location.reload();
                   },
                   actionText: 'Recargar'
                   }
                   );
                   */
                  break;

                case 'redundant':
                  throw new Error('[Service Worker] The installing ' +
                    'service worker became redundant.');

                default:
                // Ignore
              }
            };
          } else {
            console.log('[Service Worker] Previous Service Worker not found');
            console.log('[Service Worker] Caching complete! ' +
              'Future visits will work offline.');

            /*
             var snackbarContainer = document.getElementById('snackbar');
             snackbarContainer.MaterialSnackbar.showSnackbar(
             {
             message: 'Preparado para modo offline',
             timeout: 5000,
             actionHandler: function() {
             var snackBar = document.querySelector('#snackbar');
             snackBar.classList.remove('mdl-snackbar--active');
             },
             actionText: 'OK'
             }
             );
             */

          }
        };

        console.log('[Service Worker] Registration completed');
        // Dispatch registration event (mainly for push notifications)

        document.dispatchEvent(
          new CustomEvent('service-worker-registered')
        );
      })
      .catch(function(e) {
        console.error('[Service Worker] Error during registration:', e);
      });
  }

  // Your custom JavaScript goes here
})();
