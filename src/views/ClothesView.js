require('../styles');
require('famous-polyfills');
var data = require('../data.json');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

var TopView = require('./TopView');
var PantsView = require('./PantsView');
var DressView = require('./DressView');

function ClothesView(){
  View.apply(this, arguments);

  var topView = new TopView();
  var pantsView = new PantsView();
  var dressView = new DressView();

  this.subscribe(topView);
  this.subscribe(pantsView); 
  this.subscribe(dressView);

  for (var key in data.tops) {
     var topModifier = new Modifier({
        align: [(data.tops[key]['align'][0]), (data.tops[key]['align'][1])],
        origin: [(data.tops[key]['origin'][0]), (data.tops[key]['origin'][1])]
      });
      var topSurface = new ImageSurface({
        size: [(data.tops[key]['size'][0]), (data.tops[key]['size'][1])],
        content: data.tops[key]['content']
      });
     this.add(topModifier).add(topSurface);
  }

  for (var key in data.dresses) {
     var dressModifier = new Modifier({
        align: [(data.dresses[key]['align'][0]), (data.dresses[key]['align'][1])],
        origin: [(data.dresses[key]['origin'][0]), (data.dresses[key]['origin'][1])]
      });
      var dressSurface = new ImageSurface({
        size: [(data.dresses[key]['size'][0]), (data.dresses[key]['size'][1])],
        content: data.dresses[key]['content']
      });
    this.add(dressModifier).add(dressSurface);
  }

  for (var key in data.pants) {
     var pantsModifier = new Modifier({
        align: [(data.pants[key]['align'][0]), (data.pants[key]['align'][1])],
        origin: [(data.pants[key]['origin'][0]), (data.pants[key]['origin'][1])]
      });
      var pantsSurface = new ImageSurface({
        size: [(data.pants[key]['size'][0]), (data.pants[key]['size'][1])],
        content: data.pants[key]['content']
      });
     this.add(pantsModifier).add(pantsSurface);
  }

  // var topTransitionable = new Transitionable([0.75, 0.15]);
  // topTransitionable.set([0.5, 0.27], {duration: 5000 });

  this._eventInput.on('topViewClicked', function() {
    topView.testing();
  });

  this._eventInput.on('pantsViewClicked', function() {
    pantsView.testing();
  });

   this._eventInput.on('dressViewClicked', function() {
    dressView.testing();
  }); 

  // topView.on('click', function(){
  //     topViewMod.alignFrom(function(){
  //       return topTransitionable.get();
  //     });
  // });

  // var pantsTransitionable = new Transitionable([0.1, 0.5]);
  // pantsTransitionable.set([0.5, 0.434], { duration: 5000 });

  // pantsView.on('click', function(){
  //     pantsViewMod.alignFrom(function(){
  //       return pantsTransitionable.get();
  //     });
  // });

}

ClothesView.prototype = Object.create(View.prototype);
ClothesView.prototype.constructor = ClothesView;

ClothesView.DEFAULT_OPTIONS = {};
module.exports = ClothesView;

