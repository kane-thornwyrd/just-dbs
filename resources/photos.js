var
  formidable = require('formidable'),
  util = require('util')
;

var
  photos = [
    {
      classes: [
        'belle',
        'osef'
      ],
      infos: [
        {
          name: 'iso',
          value: 400
        }
      ],
      title: 'ooookookokokoko'
    },
    {
      classes: [
        'testooo',
        'osef'
      ],
      infos: [
        {
          name: 'iso',
          value: 1200
        }
      ],
      title: 'OPZDZKdzkodz'
    }
  ],
  grid = {
    classes : [
      'base'
    ]
  }
;


exports.index = {
  html: function(req, res){
    res.render('photoroot', {
      title: 'Photo Root',
      flash: req.session.getFlashMessages(),
      description: 'Toutes les photos qui vous sont accessibles.',
      photos: photos,
      grid: grid
    });
  },

  json: function(req, res){
    res.send(photos);
  }
};

/**
* POST create.
*/

exports.create = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    Object.keys(files).forEach(function(fileName){
      req.flash('info', 'Fichier "' + files[fileName].name + '" uploadé !');
    });
    res.redirect('/photos');
  });
};

/**
* GET show.
*/

exports.show = {
  html: function(req, res){
    res.send('<h1>' + req.user.name + '</h1>');
  },

  json: function(req, res){
    res.send(req.user);
  },

  xml: function(req, res){
    res.send('<user>' + req.user.name + '</user>');
  }
};