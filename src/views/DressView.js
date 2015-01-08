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

function DressView(){
	View.apply(this, arguments);
	var surface = new Surface();

	this.surface = surface;
	this.subscribe(surface);
	this.add(surface);

	this._eventInput.on('click', function() {
	    console.log(this);
	    this._eventOutput.emit('dressViewClicked');
  	}.bind(this));
  	this._changed = false;
}

DressView.prototype = Object.create(View.prototype);
DressView.prototype.constructor = DressView;

DressView.prototype.testing = function() {
	console.log('dressView made it to the test');
};

DressView.DEFAULT_OPTIONS = {};
module.exports = DressView;
