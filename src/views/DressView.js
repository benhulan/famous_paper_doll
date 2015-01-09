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

function DressView(data){
	View.apply(this, arguments);
	//console.log('hi i am a dress.');

	var dressModifier = new Modifier({
	align: [(data['align'][0]), (data['align'][1])],
	origin: [(data['origin'][0]), (data['origin'][1])]
	});

	var dressSurface = new ImageSurface({
	size: [(data['size'][0]), (data['size'][1])],
	content: data['content']
	});

	this.originStartX = data['origin'][0];
	this.originStartY = data['origin'][1];
	// console.log(originStartX, originStartY);

	this.dressTransitionable = new Transitionable([this.originStartX, this.originStartY]);
	dressModifier.originFrom(function() {
		return this.dressTransitionable.get();
      	}.bind(this));

	this.subscribe(dressSurface);
	this.add(dressModifier).add(dressSurface);

  	this.isOn = false;	

	this._eventInput.on('click', function() {
	    this._eventOutput.emit('dressViewClicked', this);
  	}.bind(this));
}

DressView.prototype = Object.create(View.prototype);
DressView.prototype.constructor = DressView;

DressView.prototype.testing = function() {
	console.log('dressView made it to the test');
};
DressView.prototype.change = function(data) {
	if (this.isOn){
		this.dressTransitionable.set([this.originStartX, this.originStartY], {
			duration: 1000,
			curve: Easing.inCubic
		});
		this.isOn = false;
	} else {
		this.dressTransitionable.set([0.5, 0.95], {
			duration: 1000,
			curve: Easing.inCubic
		});
		this.isOn = true;
	}
}

DressView.DEFAULT_OPTIONS = {};
module.exports = DressView;
