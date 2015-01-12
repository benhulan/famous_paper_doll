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

function TopView(data){
	View.apply(this, arguments);
	// console.log('hi i am a top');

	var topModifier = new Modifier({
	align: [(data['align'][0]), (data['align'][1])],
	origin: [(data['origin'][0]), (data['origin'][1])]
	});

	var topSurface = new ImageSurface({
	size: [(data['size'][0]), (data['size'][1])],
	content: data['content']
	});

	this.originStartX = data['origin'][0];
	this.originStartY = data['origin'][1];
	// console.log(this.originStartX, this.originStartY);

	this.topTransitionable = new Transitionable([this.originStartX, this.originStartY]);
	topModifier.originFrom(function() {
		return this.topTransitionable.get();
      	}.bind(this));

	this.subscribe(topSurface);
	this.add(topModifier).add(topSurface);

  	this.isOn = false;

	this._eventInput.on('click', function() {
	    this._eventOutput.emit('topViewClicked', this);
  	}.bind(this));
}

TopView.prototype = Object.create(View.prototype);
TopView.prototype.constructor = TopView;

TopView.prototype.testing = function() {
	console.log('topView made it to the test');
};
TopView.prototype.change = function(data) {
	if (this.isOn){
		this.topTransitionable.set([this.originStartX, this.originStartY], {
			duration: 500,
			curve: Easing.inCubic
		});
		this.isOn = false;
	} else {
		this.topTransitionable.set([0.5, 1.45], {   
			duration: 500,
			curve: Easing.inCubic
		});
		this.isOn = true;
	}
};
TopView.prototype.slideOff = function() {
	console.log('topView made it to the test');
};

TopView.DEFAULT_OPTIONS = {};
module.exports = TopView;