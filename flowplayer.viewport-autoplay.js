/*!

   Skelton plugin for Flowplayer HTML5

   Copyright (c) 2016-2017, Flowplayer Drive Oy

   Released under the MIT License:
   http://www.opensource.org/licenses/mit-license.php

   Requires Flowplayer HTML5 version 7.x or greater
   $GIT_DESC$

*/
(function() {
  var extension = function(flowplayer) {
    flowplayer(function(api, root) {
      if (!api.conf.autoplay) return;
      api.conf.autoplay = false;

      if (api.conf.muted) {
        var ap = document.createElement('div');
        ap.className = 'fp-autoplay-overlay';
        ap.innerHTML = 'Click to unmute';
        root.appendChild(ap);

        ap.addEventListener('click', function(ev) {
          ev.stopPropagation();
          ev.preventDefault();
          api.mute(false);
          root.removeChild(ap);
        });
      }

      api.on('ready', function() {
        if (isElementInViewport(root)) api.resume();
      });

      flowplayer.bean.on(window, 'scroll', function() {
        window.requestAnimationFrame(function() {
          if (isElementInViewport(root) && api.paused) api.resume();
        });
      });
    });

  };

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  if (typeof module === 'object' && module.exports) module.exports = extension;
  else if (typeof window.flowplayer === 'function') extension(window.flowplayer);
})();
