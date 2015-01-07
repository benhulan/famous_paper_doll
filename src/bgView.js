define(function(require,exports, module){

require('./styles');
require('famous-polyfills');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

function BgView(){
  View.apply(this, arguments);
  
  // centered background
  var centerBgMod = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5]
  });
  var bg = new ImageSurface({
    size: [400, 579],
    content: 'images/bg.svg'
  });
  this.add(centerBgMod).add(bg);
}
BgView.prototype = Object.create(View.prototype);
BgView.prototype.constructor = BgView;

module.exports = BgView;

});