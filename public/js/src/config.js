(function(require){
  'use strict';

  require.config({
    baseUrl: 'public/js/src',
    shim: {
      jquery: {
        exports: '$'
      },
      underscore: {
        exports: '_'
      },
      backbone: {
        exports: 'backbone',
        deps: ['jquery', 'underscore']
      }
    },
    paths: {
      app: 'public/js/src',
      jquery: 'node_modules/jquery/dist/jquery',
      underscore: 'node_modules/underscore/underscore-min',
      backbone: 'node_modules/backbone/backbone-min'
    }
  });

})(require);