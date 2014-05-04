(function(require){
  'use strict';

  require.config({
    baseUrl: 'public/js',
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
      jquery: 'node_modules/jquery/dist/jquery.min',
      underscore: 'node_modules/underscore/underscore-min',
      backbone: 'node_modules/backbone/backbone-min'
    }
  });

})(require);