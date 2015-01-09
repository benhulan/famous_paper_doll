require('../styles');
require('famous-polyfills');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

function ModelView(){
  View.apply(this, arguments);
  // centered model
  var centerModelMod = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5]
  });
  var model = new ImageSurface({
    size: [114, 530],
    content: 'images/model.svg'
  });
  this.add(centerModelMod).add(model);
}
ModelView.prototype = Object.create(View.prototype);
ModelView.prototype.constructor = ModelView;

ModelView.DEFAULT_OPTIONS = {};

module.exports = ModelView;

