/**
 * Async/Lazy/Pre -loading.
 */
define('app/ImageLoader',
  ['jquery', 'underscore'],
  function   ($, _) {
  'use strict';

  var ImageLoader = function ImageLoader(){
    return this.init();
  };

  ImageLoader.prototype = {
    VERSION: '1.0.0',
    NAME: 'ImageLoader',
    init: function imageLoaderInit(){
      console.info('ImageLoader Loaded');
      console.log(_);
      return this;
    }
  };


  return ImageLoader;
});