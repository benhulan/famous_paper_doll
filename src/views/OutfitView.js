require('../styles');
require('famous-polyfills');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');


function OutfitView(){
  View.apply(this, arguments);

  var blouse1Mod = new Modifier({
    align: [0.75, 0.15],
    origin: [0.5, 0]
  });
  var blouse1 = new ImageSurface({
    size: [100, 106],
    content: 'images/blouse1.svg'
  });
  this.add(blouse1Mod).add(blouse1);

  // blouse 100 x 106
  var blouse2Mod = new Modifier({
    align: [0.85, 0.15],
    origin: [0.5, 0]
  });
  var blouse2 = new ImageSurface({
    size: [100, 106],
    content: 'images/blouse2.svg'
  });
  this.add(blouse2Mod).add(blouse2);

  // blouse3
  var blouse3Mod = new Modifier({
    align: [0.95, 0.15],
    origin: [0.5, 0]
  });
  var blouse3 = new ImageSurface({
    size: [100, 106],
    content: 'images/blouse3.svg'
  });
  this.add(blouse3Mod).add(blouse3);

  // tee shirt1 94 x 112
  var shirt1Mod = new Modifier({
    align: [0.75, 0.325],
    origin: [0.5, 0]
  });
  var shirt1 = new ImageSurface({
    size: [94, 112],
    content: 'images/shirt1.svg'
  });
  this.add(shirt1Mod).add(shirt1);

  // shirt 2
  var shirt2Mod = new Modifier({
    align: [0.85, 0.325],
    origin: [0.5, 0]
  });
  var shirt2 = new ImageSurface({
    size: [94, 112],
    content: 'images/shirt2.svg'
  });
  this.add(shirt2Mod).add(shirt2);

  // shirt3
  var shirt3Mod = new Modifier({
    align: [0.95, 0.325],
    origin: [0.5, 0]
  });
  var shirt3 = new ImageSurface({
    size: [94, 112],
    content: 'images/shirt3.svg'
  });
  this.add(shirt3Mod).add(shirt3);

  // dress1 99 x 178
  var dress1Mod = new Modifier({
    align: [0.1, 0.15],
    origin: [0.5, 0]
  });
  var dress1 = new ImageSurface({
    size: [99, 179],
    content: 'images/dress1.svg'
  });
  this.add(dress1Mod).add(dress1);

  // dress2 99 x 178
  var dress2Mod = new Modifier({
    align: [0.2, 0.15],
    origin: [0.5, 0]
  });
  var dress2 = new ImageSurface({
    size: [99, 179],
    content: 'images/dress2.svg'
  });
  this.add(dress2Mod).add(dress2);

  // dress3 99 x 178
  var dress3Mod = new Modifier({
    align: [0.3, 0.15],
    origin: [0.5, 0]
  });
  var dress3 = new ImageSurface({
    size: [99, 179],
    content: 'images/dress3.svg'
  });
  this.add(dress3Mod).add(dress3);

  // skirt1 90 x 112
  var skirt1Mod = new Modifier({
    align: [0.1, 0.5],
    origin: [0.5, 0]
  });
  var skirt1 = new ImageSurface({
    size: [90, 112],
    content: 'images/skirt1.svg'
  });
  this.add(skirt1Mod).add(skirt1);

  // skirt2 121 x 92
  var skirt2Mod = new Modifier({
    align: [0.2, 0.5],
    origin: [0.5, 0]
  });
  var skirt2 = new ImageSurface({
    size: [121, 92],
    content: 'images/skirt2.svg'
  });
  this.add(skirt2Mod).add(skirt2);

  // skirt3 90 x 146
  var skirt3Mod = new Modifier({
    align: [0.3, 0.5],
    origin: [0.5, 0]
  });
  var skirt3 = new ImageSurface({
    size: [90, 146],
    content: 'images/skirt3.svg'
  });
  this.add(skirt3Mod).add(skirt3);

  // shorts 99 x 55
  var shorts1Mod = new Modifier({
    align: [0.75, 0.5],
    origin: [0.5, 0]
  });
  var shorts1 = new ImageSurface({
    size: [99, 55],
    content:  'images/shorts1.svg'
  });
  this.add(shorts1Mod).add(shorts1);

  // shorts 99 x 55
  var shorts2Mod = new Modifier({
    align: [0.75, 0.6],
    origin: [0.5, 0]
  });
  var shorts2 = new ImageSurface({
    size: [99, 55],
    content:  'images/shorts2.svg'
  });
  this.add(shorts2Mod).add(shorts2);

  // shorts 99 x 55
  var shorts3Mod = new Modifier({
    align: [0.75, 0.7],
    origin: [0.5, 0]
  });
  var shorts3 = new ImageSurface({
    size: [99, 55],
    content:  'images/shorts3.svg'
  });
  this.add(shorts3Mod).add(shorts3);

  // pants 86 x 279
  var pants1Mod = new Modifier({
    align: [0.85, 0.5],
    origin: [0.5, 0]
  });
  var pants1 = new ImageSurface({
    size: [86, 279],
    content: 'images/pants1.svg'
  });
  this.add(pants1Mod).add(pants1);

  // pants2 86 x 279
  var pants2Mod = new Modifier({
    align: [0.95, 0.5],
    origin: [0.5, 0]
  });
  var pants2 = new ImageSurface({
    size: [86, 279],
    content: 'images/pants2.svg'
  });
  this.add(pants2Mod).add(pants2);

  var topTransitionable = new Transitionable([0.75, 0.15]);
  blouse1Mod.alignFrom(function() {
    return topTransitionable.get();
  });

  blouse1.on('click', function(){
      topTransitionable.set([0.5, 0.27], {duration: 5000 });
  });

  var bottomTransitionable = new Transitionable([0.1, 0.5]);
  skirt1Mod.alignFrom(function(){
    return bottomTransitionable.get();
  });

  skirt1.on('click', function(){
      bottomTransitionable.set([0.5, 0.434], { duration: 5000 });
  });

}

OutfitView.prototype = Object.create(View.prototype);
OutfitView.prototype.constructor = OutfitView;

OutfitView.DEFAULT_OPTIONS = {};

module.exports = OutfitView;

