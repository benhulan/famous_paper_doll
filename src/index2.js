require('./styles');
require('famous-polyfills');
var BgView = require('./views/BgView.js');
var ModelView = require('./views/ModelView.js');
var OutfitView = require('./views/OutfitView.js');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var View = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Easing = require('famous/transitions/Easing');
var Transitionable = require('famous/transitions/Transitionable');

var mainContext = Engine.createContext();

function MainView(){
  View.apply(this, arguments);

  var bgView = new BgView();
  var modelView = new ModelView();
  var outfitView = new OutfitView();

  this.subscribe(bgView);
  this.subscribe(modelView);
  this.subscribe(outfitView);

  this.add(bgView);
  this.add(modelView);
  this.add(outfitView);

  this._eventInput.on('click', function(){
    outfitView.swapModifiers();
  });
}

MainView.prototype = Object.create(View.prototype);
MainView.prototype.constructor = MainView;
MainView.DEFAULT_OPTIONS = {};

var mainView = new MainView();
mainContext.add(mainView);

module.exports = MainView;