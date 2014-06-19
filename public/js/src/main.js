define('app/main',
  ['jquery', 'underscore', 'backbone', 'app/ImageLoader', 'app/FlashMessages'],
  function   ($, _, backbone, ImageLoader, FlashMessages) {
  'use strict';

  var Main = function Main(){
    return this.init();
  };

  Main.prototype = {
    VERSION: '1.0.0',
    NAME: 'just-dbs-client',
    init: function mainInit(){
      this.imageLoader = new ImageLoader('body');
      this.flashMessages = new FlashMessages({
        base: $('.flash-messages'),
        messageElementSelector: '.flash-message'
      });
      return this;
    },
    defaultConf: {
      ImageLoader: {
        root: 'body'
      }
    }
  };


  return new Main();
});