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

function ShoeView(data){
	View.apply(this, arguments);
	// console.log('hi i am a shoe');

	var shoeModifier = new Modifier({
	align: [(data['align'][0]), (data['align'][1])],
	origin: [(data['origin'][0]), (data['origin'][1])]
	});

	var shoeSurface = new ImageSurface({
	size: [(data['size'][0]), (data['size'][1])],
	content: data['content']
	});

	this.originStartX = data['origin'][0];
	this.originStartY = data['origin'][1];
	// console.log(this.originStartX, this.originStartY);

	this.shoeTransitionable = new Transitionable([this.originStartX, this.originStartY]);
	shoeModifier.originFrom(function() {
		return this.shoeTransitionable.get();
      	}.bind(this));

	this.subscribe(shoeSurface);
	this.add(shoeModifier).add(shoeSurface);

  	this.isOn = false;

	this._eventInput.on('click', function() {
	    this._eventOutput.emit('shoeViewClicked', this);
  	}.bind(this));
}

ShoeView.prototype = Object.create(View.prototype);
ShoeView.prototype.constructor = ShoeView;

ShoeView.prototype.testing = function() {
	console.log('shoeView made it to the test');
};
ShoeView.prototype.change = function(data) {
	if (this.isOn){
		this.shoeTransitionable.set([this.originStartX, this.originStartY], {
			duration: 1000,
			curve: Easing.inCubic
		});
		this.isOn = false;
	} else {
		this.shoeTransitionable.set([0.49, -1.1], {   
			duration: 1000,
			curve: Easing.inCubic
		});
		this.isOn = true;
	}
};
ShoeView.prototype.slideOff = function() {
	console.log('shoeView made it to the test');
};

ShoeView.DEFAULT_OPTIONS = {};
module.exports = ShoeView;