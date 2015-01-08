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

function TopView(){
	View.apply(this, arguments);
	var surface = new Surface({
		classes: ['top']
	});

	this.surface = surface;
	this.subscribe(surface);
	this.add(surface);

	this._eventInput.on('click', function() {
	    this._eventOutput.emit('topViewClicked');
  	}.bind(this));
  	this._changed = false;
}

TopView.prototype = Object.create(View.prototype);
TopView.prototype.constructor = TopView;

TopView.prototype.testing = function() {
	console.log('topView made it to the test');
};

TopView.DEFAULT_OPTIONS = {};
module.exports = TopView;