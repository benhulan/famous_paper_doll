
define(function(require, exports, module){

require('./styles');
require('famous-polyfills');
require('./BgView.js');
require('./ModelView.js');
require('./OutfitView.js');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

var mainContext = Engine.createContext();

function MainView(){
  View.call(this, arguments);

  var bgView = new BgView();
  var modelView = new ModelView();
  var outfitView = new OutfitView();

  this.subscribe(bgView);
  this.subscribe(modelView);
  this.subscribe(outfitView);

  this.add(bgView);
  this.add(outfitView);

  this._eventInput.on('click', function(){
    outfitView.swapModifiers();
  });
}

MainView.prototype = Object.create(View.prototype);
MainView.prototype.constructor = MainView;

var mainView = new MainView();
mainContext.add(mainView);

});