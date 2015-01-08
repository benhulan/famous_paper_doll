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

	this.alignStartX = data['align'][0];
	this.alignStartY = data['align'][1];
	// console.log(alignStartX, alignStartY);

	this.topTransitionable = new Transitionable([this.alignStartX, this.alignStartY]);
	topModifier.alignFrom(function() {
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
TopView.prototype.slideOn = function(data) {
	if (this.isOn){
		this.topTransitionable.set([this.alignStartX, this.alignStartY], {duration: 3000});
		this.isOn = false;
	} else {
		this.topTransitionable.set([0.5, 0.27], {duration: 3000 });
		this.isOn = true;
	}
};
TopView.prototype.slideOff = function() {
	console.log('topView made it to the test');
};

TopView.DEFAULT_OPTIONS = {};
module.exports = TopView;