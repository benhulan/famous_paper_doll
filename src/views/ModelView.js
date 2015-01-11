require('../styles');
require('famous-polyfills');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

function ModelView(){
  View.apply(this, arguments);

  var views = {};

  // centered model
  var centerModelMod = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5]
  });
  var model = new ImageSurface({
    size: [122, 530],
    content: 'images/model2.svg'
  });
  this.add(centerModelMod).add(model);

  var blushMod = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    opacity: 0.8
  });
  var blush = new ImageSurface({
    size: [122, 530],
    content: 'images/blush.svg'
  });

  this.clothesIndex = {'tops':0, 'pants':0, 'dresses':0};

 this._eventInput.on('topViewClicked', function() {
    this.clothesIndex.tops += 1;
    this.dressed();
  }.bind(this));

 this._eventInput.on('pantsViewClicked', function() {
    this.clothesIndex.pants += 1;
    this.dressed();
  }.bind(this));

 this._eventInput.on('dressViewClicked', function() {
    this.clothesIndex.dresses += 1;
    this.dressed();
  }.bind(this));

// this.add(blushMod).add(blush);

}
ModelView.prototype = Object.create(View.prototype);
ModelView.prototype.constructor = ModelView;

ModelView.DEFAULT_OPTIONS = {};

ModelView.prototype.dressed = function(){
   if (this.clothesIndex.tops > 1){
    this._eventOutput.emit('topViewClicked');
    // console.log('tops clicked again');
    this.clothesIndex.tops = 0;
      // add function to remove existing top
   } else if (this.clothesIndex.pants > 1) {
    // console.log('pants clicked again');
    this.clothesIndex.pants = 0;   
   } else if (this.clothesIndex.dresses > 1) {
    // console.log('dresses clicked again');
    this.clothesIndex.dresses = 0;
   }
     // console.log(this.clothesIndex);
      if (this.clothesIndex.tops == 0) {
        if (this.clothesIndex.pants == 0) {
          if (this.clothesIndex.dresses == 0) {
            // console.log('index cleared');  // works
            // this.add(blushMod).add(blush);  // doesn't work
          }
        }
      }
 
}

module.exports = ModelView;

