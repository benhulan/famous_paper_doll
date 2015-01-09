var data = require('../data.json');

var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');
var View = require('famous/core/View');

function PantsView(data){
	View.apply(this, arguments);
	//console.log('hi i am a pants');
	
	var pantsModifier = new Modifier({
	align: [(data['align'][0]), (data['align'][1])],
	origin: [(data['origin'][0]), (data['origin'][1])]
	});

	var pantsSurface = new ImageSurface({
	size: [(data['size'][0]), (data['size'][1])],
	content: data['content']
	});	

	this.originStartX = data['origin'][0];
	this.originStartY = data['origin'][1];
	// console.log(this.originStartX, this.originStartY);

	this.pantsTransitionable = new Transitionable([this.originStartX, this.originStartY]);
	pantsModifier.originFrom(function() {
		return this.pantsTransitionable.get();
      	}.bind(this));

	this.subscribe(pantsSurface);
	this.add(pantsModifier).add(pantsSurface);

  	this.isOn = false;	

	this._eventInput.on('click', function() {
	    this._eventOutput.emit('pantsViewClicked', this);
  	}.bind(this));
}

PantsView.prototype = Object.create(View.prototype);
PantsView.prototype.constructor = PantsView;

PantsView.prototype.testing = function() {
	console.log('pantsView made test');
};
PantsView.prototype.change = function(data) {
	if (this.isOn){
		this.pantsTransitionable.set([this.originStartX, this.originStartY], {
			duration: 1000,
			curve: Easing.inCubic
		});
		this.isOn = false;
	} else {
		this.pantsTransitionable.set([0.49, 0.2675], {
			duration: 1000,
			curve: Easing.inCubic
		});
		this.isOn = true;
	}
};

PantsView.DEFAULT_OPTIONS = {};
module.exports = PantsView;
