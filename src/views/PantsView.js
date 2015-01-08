require('../styles');
require('famous-polyfills');
var data = require('../data.json');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

function PantsView(){
	View.apply(this, arguments);
	var surface = new Surface();

	this.surface = surface;
	this.subscribe(surface);
	this.add(surface);

	this._eventInput.on('click', function() {
	    console.log(this);
	    this._eventOutput.emit('pantsViewClicked');
  	}.bind(this));
  	this._changed = false;
}

PantsView.prototype = Object.create(View.prototype);
PantsView.prototype.constructor = PantsView;

PantsView.prototype.testing = function() {
	console.log('pantsView made it to the test');
};

PantsView.DEFAULT_OPTIONS = {};
module.exports = PantsView;
