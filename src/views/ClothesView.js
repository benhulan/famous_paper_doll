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
var ShoeView = require('./ShoeView');

function ClothesView(){
  View.apply(this, arguments);

  var views = {};

  for (var key in data.tops) {
    var topView = new TopView(data.tops[key], key);
    this.subscribe(topView);
    this.add(topView);
    views[key] = topView;
  }

  this._eventInput.on('topViewClicked', function(view) {
    view.change();
    this._eventOutput.emit('topViewClicked');
  }.bind(this));

  for (var key in data.pants) {
    var pantsView = new PantsView(data.pants[key], key);
    this.subscribe(pantsView);
    this.add(pantsView);
    views[key] = pantsView;
  }

  this._eventInput.on('pantsViewClicked', function(view) {
    view.change();
    this._eventOutput.emit('pantsViewClicked');
  }.bind(this));

  for (var key in data.dresses) {
    var dressView = new DressView(data.dresses[key], key);
    this.subscribe(dressView);
    this.add(dressView);
    views[key] = dressView;
  }

  this._eventInput.on('dressViewClicked', function(view) {
    view.change();
    this._eventOutput.emit('dressViewClicked');
  }.bind(this));

 for (var key in data.shoes) {
    var shoeView = new ShoeView(data.shoes[key], key);
    this.subscribe(shoeView);
    this.add(shoeView);
    views[key] = shoeView;
  }

  this._eventInput.on('shoeViewClicked', function(view) {
    view.change();
    this._eventOutput.emit('shoeViewClicked');
  }.bind(this));
}

ClothesView.prototype = Object.create(View.prototype);
ClothesView.prototype.constructor = ClothesView;

ClothesView.DEFAULT_OPTIONS = {};
module.exports = ClothesView;

