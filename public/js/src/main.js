define('public/js/src/main',
  ['jquery', 'underscore', 'backbone'],
  function   ($, _, backbone) {

  'use strict';

  $('a').css({color: 'red','font-size':'2em'});
  console.log(_, backbone);

  return function(){console.log('okokokokokok');};
});