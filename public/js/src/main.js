define('public/js/src/main',
  ['jquery', 'underscore', 'backbone'],
  function   ($, _, backbone) {
  'use strict';

  var Main = function Main(){
    console.log('ok !');
    console.log($('a'));
    console.log( _.toArray($('a')) );
    console.log(this);
    console.log(backbone);
  };

  Main.prototype = {
    VERSION: '1.0.0',
    NAME: 'just-dbs-client'

  };


  return new Main();
});