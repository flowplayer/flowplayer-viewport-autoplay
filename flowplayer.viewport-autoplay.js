/*!

   Viewport autoplay  plugin for Flowplayer HTML5

   Copyright (c) 2016-2017, Flowplayer Drive Oy

   Released under the MIT License:
   http://www.opensource.org/licenses/mit-license.php

   Requires Flowplayer HTML5 version 7.x or greater
   $GIT_DESC$

*/
(function() {

  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

  var extension = function(fp) {
    fp(function(api, root) {
      var flowplayer = window.flowplayer || fp;
      var common = flowplayer.common
        , support = flowplayer.support;
      if (!api.conf.autoplay) return;
      api.conf.autoplay = false;
      var scrollPaused = true;
      api.one('progress', function() {
        if (!api.muted) return;
        common.addClass(root, 'is-muted-autoplaying');
        var ap = document.createElement('div');
        ap.className = 'fp-autoplay-overlay';
        ap.innerHTML = 'Click to unmute.. <a class="pause"></a>';
        root.appendChild(ap);

        ap.addEventListener('click', function(ev) {
          ev.stopPropagation();
          ev.preventDefault();
          if (common.hasClass(ev.target, 'pause')) {
            api.toggle();
          } else {
            api.mute(false);
            common.removeClass(root, 'is-muted-autoplaying');
            if (support.mutedAutoplay) common.find('.fp-engine', root)[0].muted = false;
            root.removeChild(ap);
          }
        });
      });

      function startPlaybackIfInViewport() {
        if (isElementInViewport(root)) {
          api.conf.autoplay = true;
          if (scrollPaused) {
            if (api.splash) {
              api.load(null, function () {scrollPaused = false;});
            }
            else {
              api.one('resume', function () {scrollPaused = false;});
              api.resume();
            }
          }
        }
        else {
          if (api.splash) scrollPaused = true;
          else {
            // issue #9
            if (api.playing) {
              api.one('pause', function () {scrollPaused = true;});
            }
            api.pause();
          }
        }
      }

      api.on('ready', startPlaybackIfInViewport);

      flowplayer.bean.on(window, 'scroll.autoplay', function() {
        requestAnimationFrame(startPlaybackIfInViewport);
      });
    });

  };

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    var offset = rect.height * 0.8;
    return (
      rect.top + offset >= 0 &&
      rect.left >= 0 &&
      rect.bottom - offset <= (window.innerHeight || document.documentElement.clientHeight)  &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  if (typeof module === 'object' && module.exports) module.exports = extension;
  else if (typeof window.flowplayer === 'function') extension(window.flowplayer);

})();
