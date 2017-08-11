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
      console.log('plugin will initialize');
      api.on('load', function(_ev, _api, video) {
        console.log('flowplayer loaded video', video.src);
      }).on('progress', function(_ev, _api, time) {
        console.log('current time is now', time);
      });
      // You could initialize an UI here
      // and append it to the root element passed as variable
    });

  };

  if (typeof module === 'object' && module.exports) module.exports = extension;
  else if (typeof window.flowplayer === 'function') extension(window.flowplayer);
})();
