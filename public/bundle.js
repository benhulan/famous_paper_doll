(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/benhulan/Developer/browserify-seed/node_modules/cssify/browser.js":[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/classList.js":[function(require,module,exports){

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        this._updateClassName();
    }
};
classListProto.remove = function (token) {
    token += "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
        this.splice(index, 1);
        this._updateClassName();
    }
};
classListProto.toggle = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
    } else {
        this.remove(token);
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/functionPrototypeBind.js":[function(require,module,exports){
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/index.js":[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/classList.js","./functionPrototypeBind.js":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/functionPrototypeBind.js","./requestAnimationFrame.js":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/requestAnimationFrame.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/requestAnimationFrame.js":[function(require,module,exports){
// adds requestAnimationFrame functionality
// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

window.requestAnimationFrame || (window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element) {
    return window.setTimeout(function() {
      callback(+new Date());
  }, 1000 / 60);
});

},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Context.js":[function(require,module,exports){
var RenderNode = require('./RenderNode');
var EventHandler = require('./EventHandler');
var ElementAllocator = require('./ElementAllocator');
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var _zeroZero = [
        0,
        0
    ];
var usePrefix = !('perspective' in document.documentElement.style);
function _getElementSize(element) {
    return [
        element.clientWidth,
        element.clientHeight
    ];
}
var _setPerspective = usePrefix ? function (element, perspective) {
        element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
    } : function (element, perspective) {
        element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
    };
function Context(container) {
    this.container = container;
    this._allocator = new ElementAllocator(container);
    this._node = new RenderNode();
    this._eventOutput = new EventHandler();
    this._size = _getElementSize(this.container);
    this._perspectiveState = new Transitionable(0);
    this._perspective = undefined;
    this._nodeContext = {
        allocator: this._allocator,
        transform: Transform.identity,
        opacity: 1,
        origin: _zeroZero,
        align: _zeroZero,
        size: this._size
    };
    this._eventOutput.on('resize', function () {
        this.setSize(_getElementSize(this.container));
    }.bind(this));
}
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};
Context.prototype.add = function add(obj) {
    return this._node.add(obj);
};
Context.prototype.migrate = function migrate(container) {
    if (container === this.container)
        return;
    this.container = container;
    this._allocator.migrate(container);
};
Context.prototype.getSize = function getSize() {
    return this._size;
};
Context.prototype.setSize = function setSize(size) {
    if (!size)
        size = _getElementSize(this.container);
    this._size[0] = size[0];
    this._size[1] = size[1];
};
Context.prototype.update = function update(contextParameters) {
    if (contextParameters) {
        if (contextParameters.transform)
            this._nodeContext.transform = contextParameters.transform;
        if (contextParameters.opacity)
            this._nodeContext.opacity = contextParameters.opacity;
        if (contextParameters.origin)
            this._nodeContext.origin = contextParameters.origin;
        if (contextParameters.align)
            this._nodeContext.align = contextParameters.align;
        if (contextParameters.size)
            this._nodeContext.size = contextParameters.size;
    }
    var perspective = this._perspectiveState.get();
    if (perspective !== this._perspective) {
        _setPerspective(this.container, perspective);
        this._perspective = perspective;
    }
    this._node.commit(this._nodeContext);
};
Context.prototype.getPerspective = function getPerspective() {
    return this._perspectiveState.get();
};
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
    return this._perspectiveState.set(perspective, transition, callback);
};
Context.prototype.emit = function emit(type, event) {
    return this._eventOutput.emit(type, event);
};
Context.prototype.on = function on(type, handler) {
    return this._eventOutput.on(type, handler);
};
Context.prototype.removeListener = function removeListener(type, handler) {
    return this._eventOutput.removeListener(type, handler);
};
Context.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
Context.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
module.exports = Context;
},{"../transitions/Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js","./ElementAllocator":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/ElementAllocator.js","./EventHandler":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventHandler.js","./RenderNode":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/RenderNode.js","./Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/ElementAllocator.js":[function(require,module,exports){
function ElementAllocator(container) {
    if (!container)
        container = document.createDocumentFragment();
    this.container = container;
    this.detachedNodes = {};
    this.nodeCount = 0;
}
ElementAllocator.prototype.migrate = function migrate(container) {
    var oldContainer = this.container;
    if (container === oldContainer)
        return;
    if (oldContainer instanceof DocumentFragment) {
        container.appendChild(oldContainer);
    } else {
        while (oldContainer.hasChildNodes()) {
            container.appendChild(oldContainer.firstChild);
        }
    }
    this.container = container;
};
ElementAllocator.prototype.allocate = function allocate(type) {
    type = type.toLowerCase();
    if (!(type in this.detachedNodes))
        this.detachedNodes[type] = [];
    var nodeStore = this.detachedNodes[type];
    var result;
    if (nodeStore.length > 0) {
        result = nodeStore.pop();
    } else {
        result = document.createElement(type);
        this.container.appendChild(result);
    }
    this.nodeCount++;
    return result;
};
ElementAllocator.prototype.deallocate = function deallocate(element) {
    var nodeType = element.nodeName.toLowerCase();
    var nodeStore = this.detachedNodes[nodeType];
    nodeStore.push(element);
    this.nodeCount--;
};
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};
module.exports = ElementAllocator;
},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/ElementOutput.js":[function(require,module,exports){
var Entity = require('./Entity');
var EventHandler = require('./EventHandler');
var Transform = require('./Transform');
var usePrefix = !('transform' in document.documentElement.style);
var devicePixelRatio = window.devicePixelRatio || 1;
function ElementOutput(element) {
    this._matrix = null;
    this._opacity = 1;
    this._origin = null;
    this._size = null;
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    this.eventForwarder = function eventForwarder(event) {
        this._eventOutput.emit(event.type, event);
    }.bind(this);
    this.id = Entity.register(this);
    this._element = null;
    this._sizeDirty = false;
    this._originDirty = false;
    this._transformDirty = false;
    this._invisible = false;
    if (element)
        this.attach(element);
}
ElementOutput.prototype.on = function on(type, fn) {
    if (this._element)
        this._element.addEventListener(type, this.eventForwarder);
    this._eventOutput.on(type, fn);
};
ElementOutput.prototype.removeListener = function removeListener(type, fn) {
    this._eventOutput.removeListener(type, fn);
};
ElementOutput.prototype.emit = function emit(type, event) {
    if (event && !event.origin)
        event.origin = this;
    var handled = this._eventOutput.emit(type, event);
    if (handled && event && event.stopPropagation)
        event.stopPropagation();
    return handled;
};
ElementOutput.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
ElementOutput.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
ElementOutput.prototype.render = function render() {
    return this.id;
};
function _addEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.addEventListener(i, this.eventForwarder);
    }
}
function _removeEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.removeEventListener(i, this.eventForwarder);
    }
}
function _formatCSSTransform(m) {
    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
    var result = 'matrix3d(';
    for (var i = 0; i < 15; i++) {
        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
    }
    result += m[15] + ')';
    return result;
}
var _setMatrix;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    _setMatrix = function (element, matrix) {
        element.style.zIndex = matrix[14] * 1000000 | 0;
        element.style.transform = _formatCSSTransform(matrix);
    };
} else if (usePrefix) {
    _setMatrix = function (element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
} else {
    _setMatrix = function (element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}
function _formatCSSOrigin(origin) {
    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
}
var _setOrigin = usePrefix ? function (element, origin) {
        element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
    } : function (element, origin) {
        element.style.transformOrigin = _formatCSSOrigin(origin);
    };
var _setInvisible = usePrefix ? function (element) {
        element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    } : function (element) {
        element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    };
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
ElementOutput.prototype.commit = function commit(context) {
    var target = this._element;
    if (!target)
        return;
    var matrix = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    if (!matrix && this._matrix) {
        this._matrix = null;
        this._opacity = 0;
        _setInvisible(target);
        return;
    }
    if (_xyNotEquals(this._origin, origin))
        this._originDirty = true;
    if (Transform.notEquals(this._matrix, matrix))
        this._transformDirty = true;
    if (this._invisible) {
        this._invisible = false;
        this._element.style.display = '';
    }
    if (this._opacity !== opacity) {
        this._opacity = opacity;
        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
    }
    if (this._transformDirty || this._originDirty || this._sizeDirty) {
        if (this._sizeDirty)
            this._sizeDirty = false;
        if (this._originDirty) {
            if (origin) {
                if (!this._origin)
                    this._origin = [
                        0,
                        0
                    ];
                this._origin[0] = origin[0];
                this._origin[1] = origin[1];
            } else
                this._origin = null;
            _setOrigin(target, this._origin);
            this._originDirty = false;
        }
        if (!matrix)
            matrix = Transform.identity;
        this._matrix = matrix;
        var aaMatrix = this._size ? Transform.thenMove(matrix, [
                -this._size[0] * origin[0],
                -this._size[1] * origin[1],
                0
            ]) : matrix;
        _setMatrix(target, aaMatrix);
        this._transformDirty = false;
    }
};
ElementOutput.prototype.cleanup = function cleanup() {
    if (this._element) {
        this._invisible = true;
        this._element.style.display = 'none';
    }
};
ElementOutput.prototype.attach = function attach(target) {
    this._element = target;
    _addEventListeners.call(this, target);
};
ElementOutput.prototype.detach = function detach() {
    var target = this._element;
    if (target) {
        _removeEventListeners.call(this, target);
        if (this._invisible) {
            this._invisible = false;
            this._element.style.display = '';
        }
    }
    this._element = null;
    return target;
};
module.exports = ElementOutput;
},{"./Entity":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Entity.js","./EventHandler":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventHandler.js","./Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Engine.js":[function(require,module,exports){
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var Engine = {};
var contexts = [];
var nextTickQueue = [];
var currentFrame = 0;
var nextTickFrame = 0;
var deferQueue = [];
var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();
var options = {
        containerType: 'div',
        containerClass: 'famous-container',
        fpsCap: undefined,
        runLoop: true,
        appMode: true
    };
var optionsManager = new OptionsManager(options);
var MAX_DEFER_FRAME_TIME = 10;
Engine.step = function step() {
    currentFrame++;
    nextTickFrame = currentFrame;
    var currentTime = Date.now();
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
        return;
    var i = 0;
    frameTime = currentTime - lastTime;
    lastTime = currentTime;
    eventHandler.emit('prerender');
    var numFunctions = nextTickQueue.length;
    while (numFunctions--)
        nextTickQueue.shift()(currentFrame);
    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
        deferQueue.shift().call(this);
    }
    for (i = 0; i < contexts.length; i++)
        contexts[i].update();
    eventHandler.emit('postrender');
};
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    } else
        loopEnabled = false;
}
window.requestAnimationFrame(loop);
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();
function initialize() {
    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, true);
    addRootClasses();
}
var initialized = false;
function addRootClasses() {
    if (!document.body) {
        Engine.nextTick(addRootClasses);
        return;
    }
    document.body.classList.add('famous-root');
    document.documentElement.classList.add('famous-root');
}
Engine.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(Engine);
    else
        return eventHandler.pipe(target);
};
Engine.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(Engine);
    else
        return eventHandler.unpipe(target);
};
Engine.on = function on(type, handler) {
    if (!(type in eventForwarders)) {
        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
        addEngineListener(type, eventForwarders[type]);
    }
    return eventHandler.on(type, handler);
};
function addEngineListener(type, forwarder) {
    if (!document.body) {
        Engine.nextTick(addEventListener.bind(this, type, forwarder));
        return;
    }
    document.body.addEventListener(type, forwarder);
}
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};
Engine.setFPSCap = function setFPSCap(fps) {
    frameTimeLimit = Math.floor(1000 / fps);
};
Engine.getOptions = function getOptions(key) {
    return optionsManager.getOptions(key);
};
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};
Engine.createContext = function createContext(el) {
    if (!initialized && options.appMode)
        Engine.nextTick(initialize);
    var needMountContainer = false;
    if (!el) {
        el = document.createElement(options.containerType);
        el.classList.add(options.containerClass);
        needMountContainer = true;
    }
    var context = new Context(el);
    Engine.registerContext(context);
    if (needMountContainer)
        mount(context, el);
    return context;
};
function mount(context, el) {
    if (!document.body) {
        Engine.nextTick(mount.bind(this, context, el));
        return;
    }
    document.body.appendChild(el);
    context.emit('resize');
}
Engine.registerContext = function registerContext(context) {
    contexts.push(context);
    return context;
};
Engine.getContexts = function getContexts() {
    return contexts;
};
Engine.deregisterContext = function deregisterContext(context) {
    var i = contexts.indexOf(context);
    if (i >= 0)
        contexts.splice(i, 1);
};
Engine.nextTick = function nextTick(fn) {
    nextTickQueue.push(fn);
};
Engine.defer = function defer(fn) {
    deferQueue.push(fn);
};
optionsManager.on('change', function (data) {
    if (data.id === 'fpsCap')
        Engine.setFPSCap(data.value);
    else if (data.id === 'runLoop') {
        if (!loopEnabled && data.value) {
            loopEnabled = true;
            window.requestAnimationFrame(loop);
        }
    }
});
module.exports = Engine;
},{"./Context":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Context.js","./EventHandler":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/OptionsManager.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Entity.js":[function(require,module,exports){
var entities = [];
function get(id) {
    return entities[id];
}
function set(id, entity) {
    entities[id] = entity;
}
function register(entity) {
    var id = entities.length;
    set(id, entity);
    return id;
}
function unregister(id) {
    set(id, null);
}
module.exports = {
    register: register,
    unregister: unregister,
    get: get,
    set: set
};
},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventEmitter.js":[function(require,module,exports){
function EventEmitter() {
    this.listeners = {};
    this._owner = this;
}
EventEmitter.prototype.emit = function emit(type, event) {
    var handlers = this.listeners[type];
    if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this._owner, event);
        }
    }
    return this;
};
EventEmitter.prototype.on = function on(type, handler) {
    if (!(type in this.listeners))
        this.listeners[type] = [];
    var index = this.listeners[type].indexOf(handler);
    if (index < 0)
        this.listeners[type].push(handler);
    return this;
};
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    var listener = this.listeners[type];
    if (listener !== undefined) {
        var index = listener.indexOf(handler);
        if (index >= 0)
            listener.splice(index, 1);
    }
    return this;
};
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};
module.exports = EventEmitter;
},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventHandler.js":[function(require,module,exports){
var EventEmitter = require('./EventEmitter');
function EventHandler() {
    EventEmitter.apply(this, arguments);
    this.downstream = [];
    this.downstreamFn = [];
    this.upstream = [];
    this.upstreamListeners = {};
}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;
EventHandler.setInputHandler = function setInputHandler(object, handler) {
    object.trigger = handler.trigger.bind(handler);
    if (handler.subscribe && handler.unsubscribe) {
        object.subscribe = handler.subscribe.bind(handler);
        object.unsubscribe = handler.unsubscribe.bind(handler);
    }
};
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
    if (handler instanceof EventHandler)
        handler.bindThis(object);
    object.pipe = handler.pipe.bind(handler);
    object.unpipe = handler.unpipe.bind(handler);
    object.on = handler.on.bind(handler);
    object.addListener = object.on;
    object.removeListener = handler.removeListener.bind(handler);
};
EventHandler.prototype.emit = function emit(type, event) {
    EventEmitter.prototype.emit.apply(this, arguments);
    var i = 0;
    for (i = 0; i < this.downstream.length; i++) {
        if (this.downstream[i].trigger)
            this.downstream[i].trigger(type, event);
    }
    for (i = 0; i < this.downstreamFn.length; i++) {
        this.downstreamFn[i](type, event);
    }
    return this;
};
EventHandler.prototype.trigger = EventHandler.prototype.emit;
EventHandler.prototype.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index < 0)
        downstreamCtx.push(target);
    if (target instanceof Function)
        target('pipe', null);
    else if (target.trigger)
        target.trigger('pipe', null);
    return target;
};
EventHandler.prototype.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index >= 0) {
        downstreamCtx.splice(index, 1);
        if (target instanceof Function)
            target('unpipe', null);
        else if (target.trigger)
            target.trigger('unpipe', null);
        return target;
    } else
        return false;
};
EventHandler.prototype.on = function on(type, handler) {
    EventEmitter.prototype.on.apply(this, arguments);
    if (!(type in this.upstreamListeners)) {
        var upstreamListener = this.trigger.bind(this, type);
        this.upstreamListeners[type] = upstreamListener;
        for (var i = 0; i < this.upstream.length; i++) {
            this.upstream[i].on(type, upstreamListener);
        }
    }
    return this;
};
EventHandler.prototype.addListener = EventHandler.prototype.on;
EventHandler.prototype.subscribe = function subscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index < 0) {
        this.upstream.push(source);
        for (var type in this.upstreamListeners) {
            source.on(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
EventHandler.prototype.unsubscribe = function unsubscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index >= 0) {
        this.upstream.splice(index, 1);
        for (var type in this.upstreamListeners) {
            source.removeListener(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
module.exports = EventHandler;
},{"./EventEmitter":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventEmitter.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Modifier.js":[function(require,module,exports){
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function Modifier(options) {
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
    this._legacyStates = {};
    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
        proportions: null,
        target: null
    };
    if (options) {
        if (options.transform)
            this.transformFrom(options.transform);
        if (options.opacity !== undefined)
            this.opacityFrom(options.opacity);
        if (options.origin)
            this.originFrom(options.origin);
        if (options.align)
            this.alignFrom(options.align);
        if (options.size)
            this.sizeFrom(options.size);
        if (options.proportions)
            this.proportionsFrom(options.proportions);
    }
}
Modifier.prototype.transformFrom = function transformFrom(transform) {
    if (transform instanceof Function)
        this._transformGetter = transform;
    else if (transform instanceof Object && transform.get)
        this._transformGetter = transform.get.bind(transform);
    else {
        this._transformGetter = null;
        this._output.transform = transform;
    }
    return this;
};
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
    if (opacity instanceof Function)
        this._opacityGetter = opacity;
    else if (opacity instanceof Object && opacity.get)
        this._opacityGetter = opacity.get.bind(opacity);
    else {
        this._opacityGetter = null;
        this._output.opacity = opacity;
    }
    return this;
};
Modifier.prototype.originFrom = function originFrom(origin) {
    if (origin instanceof Function)
        this._originGetter = origin;
    else if (origin instanceof Object && origin.get)
        this._originGetter = origin.get.bind(origin);
    else {
        this._originGetter = null;
        this._output.origin = origin;
    }
    return this;
};
Modifier.prototype.alignFrom = function alignFrom(align) {
    if (align instanceof Function)
        this._alignGetter = align;
    else if (align instanceof Object && align.get)
        this._alignGetter = align.get.bind(align);
    else {
        this._alignGetter = null;
        this._output.align = align;
    }
    return this;
};
Modifier.prototype.sizeFrom = function sizeFrom(size) {
    if (size instanceof Function)
        this._sizeGetter = size;
    else if (size instanceof Object && size.get)
        this._sizeGetter = size.get.bind(size);
    else {
        this._sizeGetter = null;
        this._output.size = size;
    }
    return this;
};
Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
    if (proportions instanceof Function)
        this._proportionGetter = proportions;
    else if (proportions instanceof Object && proportions.get)
        this._proportionGetter = proportions.get.bind(proportions);
    else {
        this._proportionGetter = null;
        this._output.proportions = proportions;
    }
    return this;
};
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    if (transition || this._legacyStates.transform) {
        if (!this._legacyStates.transform) {
            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
        }
        if (!this._transformGetter)
            this.transformFrom(this._legacyStates.transform);
        this._legacyStates.transform.set(transform, transition, callback);
        return this;
    } else
        return this.transformFrom(transform);
};
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    if (transition || this._legacyStates.opacity) {
        if (!this._legacyStates.opacity) {
            this._legacyStates.opacity = new Transitionable(this._output.opacity);
        }
        if (!this._opacityGetter)
            this.opacityFrom(this._legacyStates.opacity);
        return this._legacyStates.opacity.set(opacity, transition, callback);
    } else
        return this.opacityFrom(opacity);
};
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (transition || this._legacyStates.origin) {
        if (!this._legacyStates.origin) {
            this._legacyStates.origin = new Transitionable(this._output.origin || [
                0,
                0
            ]);
        }
        if (!this._originGetter)
            this.originFrom(this._legacyStates.origin);
        this._legacyStates.origin.set(origin, transition, callback);
        return this;
    } else
        return this.originFrom(origin);
};
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
    if (transition || this._legacyStates.align) {
        if (!this._legacyStates.align) {
            this._legacyStates.align = new Transitionable(this._output.align || [
                0,
                0
            ]);
        }
        if (!this._alignGetter)
            this.alignFrom(this._legacyStates.align);
        this._legacyStates.align.set(align, transition, callback);
        return this;
    } else
        return this.alignFrom(align);
};
Modifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size && (transition || this._legacyStates.size)) {
        if (!this._legacyStates.size) {
            this._legacyStates.size = new Transitionable(this._output.size || [
                0,
                0
            ]);
        }
        if (!this._sizeGetter)
            this.sizeFrom(this._legacyStates.size);
        this._legacyStates.size.set(size, transition, callback);
        return this;
    } else
        return this.sizeFrom(size);
};
Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
    if (proportions && (transition || this._legacyStates.proportions)) {
        if (!this._legacyStates.proportions) {
            this._legacyStates.proportions = new Transitionable(this._output.proportions || [
                0,
                0
            ]);
        }
        if (!this._proportionGetter)
            this.proportionsFrom(this._legacyStates.proportions);
        this._legacyStates.proportions.set(proportions, transition, callback);
        return this;
    } else
        return this.proportionsFrom(proportions);
};
Modifier.prototype.halt = function halt() {
    if (this._legacyStates.transform)
        this._legacyStates.transform.halt();
    if (this._legacyStates.opacity)
        this._legacyStates.opacity.halt();
    if (this._legacyStates.origin)
        this._legacyStates.origin.halt();
    if (this._legacyStates.align)
        this._legacyStates.align.halt();
    if (this._legacyStates.size)
        this._legacyStates.size.halt();
    if (this._legacyStates.proportions)
        this._legacyStates.proportions.halt();
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
};
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};
Modifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
};
Modifier.prototype.getOpacity = function getOpacity() {
    return this._opacityGetter();
};
Modifier.prototype.getOrigin = function getOrigin() {
    return this._originGetter();
};
Modifier.prototype.getAlign = function getAlign() {
    return this._alignGetter();
};
Modifier.prototype.getSize = function getSize() {
    return this._sizeGetter ? this._sizeGetter() : this._output.size;
};
Modifier.prototype.getProportions = function getProportions() {
    return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
};
function _update() {
    if (this._transformGetter)
        this._output.transform = this._transformGetter();
    if (this._opacityGetter)
        this._output.opacity = this._opacityGetter();
    if (this._originGetter)
        this._output.origin = this._originGetter();
    if (this._alignGetter)
        this._output.align = this._alignGetter();
    if (this._sizeGetter)
        this._output.size = this._sizeGetter();
    if (this._proportionGetter)
        this._output.proportions = this._proportionGetter();
}
Modifier.prototype.modify = function modify(target) {
    _update.call(this);
    this._output.target = target;
    return this._output;
};
module.exports = Modifier;
},{"../transitions/Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/TransitionableTransform.js","./Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/OptionsManager.js":[function(require,module,exports){
var EventHandler = require('./EventHandler');
function OptionsManager(value) {
    this._value = value;
    this.eventOutput = null;
}
OptionsManager.patch = function patchObject(source, data) {
    var manager = new OptionsManager(source);
    for (var i = 1; i < arguments.length; i++)
        manager.patch(arguments[i]);
    return source;
};
function _createEventOutput() {
    this.eventOutput = new EventHandler();
    this.eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this.eventOutput);
}
OptionsManager.prototype.patch = function patch() {
    var myState = this._value;
    for (var i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        for (var k in data) {
            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
                if (!myState.hasOwnProperty(k))
                    myState[k] = Object.create(myState[k]);
                this.key(k).patch(data[k]);
                if (this.eventOutput)
                    this.eventOutput.emit('change', {
                        id: k,
                        value: this.key(k).value()
                    });
            } else
                this.set(k, data[k]);
        }
    }
    return this;
};
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
OptionsManager.prototype.key = function key(identifier) {
    var result = new OptionsManager(this._value[identifier]);
    if (!(result._value instanceof Object) || result._value instanceof Array)
        result._value = {};
    return result;
};
OptionsManager.prototype.get = function get(key) {
    return key ? this._value[key] : this._value;
};
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
OptionsManager.prototype.set = function set(key, value) {
    var originalValue = this.get(key);
    this._value[key] = value;
    if (this.eventOutput && value !== originalValue)
        this.eventOutput.emit('change', {
            id: key,
            value: value
        });
    return this;
};
OptionsManager.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
OptionsManager.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
OptionsManager.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
OptionsManager.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = OptionsManager;
},{"./EventHandler":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventHandler.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/RenderNode.js":[function(require,module,exports){
var Entity = require('./Entity');
var SpecParser = require('./SpecParser');
function RenderNode(object) {
    this._object = null;
    this._child = null;
    this._hasMultipleChildren = false;
    this._isRenderable = false;
    this._isModifier = false;
    this._resultCache = {};
    this._prevResults = {};
    this._childResult = null;
    if (object)
        this.set(object);
}
RenderNode.prototype.add = function add(child) {
    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
    if (this._child instanceof Array)
        this._child.push(childNode);
    else if (this._child) {
        this._child = [
            this._child,
            childNode
        ];
        this._hasMultipleChildren = true;
        this._childResult = [];
    } else
        this._child = childNode;
    return childNode;
};
RenderNode.prototype.get = function get() {
    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
};
RenderNode.prototype.set = function set(child) {
    this._childResult = null;
    this._hasMultipleChildren = false;
    this._isRenderable = child.render ? true : false;
    this._isModifier = child.modify ? true : false;
    this._object = child;
    this._child = null;
    if (child instanceof RenderNode)
        return child;
    else
        return this;
};
RenderNode.prototype.getSize = function getSize() {
    var result = null;
    var target = this.get();
    if (target && target.getSize)
        result = target.getSize();
    if (!result && this._child && this._child.getSize)
        result = this._child.getSize();
    return result;
};
function _applyCommit(spec, context, cacheStorage) {
    var result = SpecParser.parse(spec, context);
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var childNode = Entity.get(id);
        var commitParams = result[id];
        commitParams.allocator = context.allocator;
        var commitResult = childNode.commit(commitParams);
        if (commitResult)
            _applyCommit(commitResult, context, cacheStorage);
        else
            cacheStorage[id] = commitParams;
    }
}
RenderNode.prototype.commit = function commit(context) {
    var prevKeys = Object.keys(this._prevResults);
    for (var i = 0; i < prevKeys.length; i++) {
        var id = prevKeys[i];
        if (this._resultCache[id] === undefined) {
            var object = Entity.get(id);
            if (object.cleanup)
                object.cleanup(context.allocator);
        }
    }
    this._prevResults = this._resultCache;
    this._resultCache = {};
    _applyCommit(this.render(), context, this._resultCache);
};
RenderNode.prototype.render = function render() {
    if (this._isRenderable)
        return this._object.render();
    var result = null;
    if (this._hasMultipleChildren) {
        result = this._childResult;
        var children = this._child;
        for (var i = 0; i < children.length; i++) {
            result[i] = children[i].render();
        }
    } else if (this._child)
        result = this._child.render();
    return this._isModifier ? this._object.modify(result) : result;
};
module.exports = RenderNode;
},{"./Entity":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Entity.js","./SpecParser":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/SpecParser.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/SpecParser.js":[function(require,module,exports){
var Transform = require('./Transform');
function SpecParser() {
    this.result = {};
}
SpecParser._instance = new SpecParser();
SpecParser.parse = function parse(spec, context) {
    return SpecParser._instance.parse(spec, context);
};
SpecParser.prototype.parse = function parse(spec, context) {
    this.reset();
    this._parseSpec(spec, context, Transform.identity);
    return this.result;
};
SpecParser.prototype.reset = function reset() {
    this.result = {};
};
function _vecInContext(v, m) {
    return [
        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
    ];
}
var _zeroZero = [
        0,
        0
    ];
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
    var id;
    var target;
    var transform;
    var opacity;
    var origin;
    var align;
    var size;
    if (typeof spec === 'number') {
        id = spec;
        transform = parentContext.transform;
        align = parentContext.align || _zeroZero;
        if (parentContext.size && align && (align[0] || align[1])) {
            var alignAdjust = [
                    align[0] * parentContext.size[0],
                    align[1] * parentContext.size[1],
                    0
                ];
            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
        }
        this.result[id] = {
            transform: transform,
            opacity: parentContext.opacity,
            origin: parentContext.origin || _zeroZero,
            align: parentContext.align || _zeroZero,
            size: parentContext.size
        };
    } else if (!spec) {
        return;
    } else if (spec instanceof Array) {
        for (var i = 0; i < spec.length; i++) {
            this._parseSpec(spec[i], parentContext, sizeContext);
        }
    } else {
        target = spec.target;
        transform = parentContext.transform;
        opacity = parentContext.opacity;
        origin = parentContext.origin;
        align = parentContext.align;
        size = parentContext.size;
        var nextSizeContext = sizeContext;
        if (spec.opacity !== undefined)
            opacity = parentContext.opacity * spec.opacity;
        if (spec.transform)
            transform = Transform.multiply(parentContext.transform, spec.transform);
        if (spec.origin) {
            origin = spec.origin;
            nextSizeContext = parentContext.transform;
        }
        if (spec.align)
            align = spec.align;
        if (spec.size || spec.proportions) {
            var parentSize = size;
            size = [
                size[0],
                size[1]
            ];
            if (spec.size) {
                if (spec.size[0] !== undefined)
                    size[0] = spec.size[0];
                if (spec.size[1] !== undefined)
                    size[1] = spec.size[1];
            }
            if (spec.proportions) {
                if (spec.proportions[0] !== undefined)
                    size[0] = size[0] * spec.proportions[0];
                if (spec.proportions[1] !== undefined)
                    size[1] = size[1] * spec.proportions[1];
            }
            if (parentSize) {
                if (align && (align[0] || align[1]))
                    transform = Transform.thenMove(transform, _vecInContext([
                        align[0] * parentSize[0],
                        align[1] * parentSize[1],
                        0
                    ], sizeContext));
                if (origin && (origin[0] || origin[1]))
                    transform = Transform.moveThen([
                        -origin[0] * size[0],
                        -origin[1] * size[1],
                        0
                    ], transform);
            }
            nextSizeContext = parentContext.transform;
            origin = null;
            align = null;
        }
        this._parseSpec(target, {
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        }, nextSizeContext);
    }
};
module.exports = SpecParser;
},{"./Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Surface.js":[function(require,module,exports){
var ElementOutput = require('./ElementOutput');
function Surface(options) {
    ElementOutput.call(this);
    this.options = {};
    this.properties = {};
    this.attributes = {};
    this.content = '';
    this.classList = [];
    this.size = null;
    this._classesDirty = true;
    this._stylesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._trueSizeCheck = true;
    this._dirtyClasses = [];
    if (options)
        this.setOptions(options);
    this._currentTarget = null;
}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';
Surface.prototype.setAttributes = function setAttributes(attributes) {
    for (var n in attributes) {
        if (n === 'style')
            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
        this.attributes[n] = attributes[n];
    }
    this._attributesDirty = true;
};
Surface.prototype.getAttributes = function getAttributes() {
    return this.attributes;
};
Surface.prototype.setProperties = function setProperties(properties) {
    for (var n in properties) {
        this.properties[n] = properties[n];
    }
    this._stylesDirty = true;
    return this;
};
Surface.prototype.getProperties = function getProperties() {
    return this.properties;
};
Surface.prototype.addClass = function addClass(className) {
    if (this.classList.indexOf(className) < 0) {
        this.classList.push(className);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.removeClass = function removeClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.toggleClass = function toggleClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};
Surface.prototype.setClasses = function setClasses(classList) {
    var i = 0;
    var removal = [];
    for (i = 0; i < this.classList.length; i++) {
        if (classList.indexOf(this.classList[i]) < 0)
            removal.push(this.classList[i]);
    }
    for (i = 0; i < removal.length; i++)
        this.removeClass(removal[i]);
    for (i = 0; i < classList.length; i++)
        this.addClass(classList[i]);
    return this;
};
Surface.prototype.getClassList = function getClassList() {
    return this.classList;
};
Surface.prototype.setContent = function setContent(content) {
    if (this.content !== content) {
        this.content = content;
        this._contentDirty = true;
    }
    return this;
};
Surface.prototype.getContent = function getContent() {
    return this.content;
};
Surface.prototype.setOptions = function setOptions(options) {
    if (options.size)
        this.setSize(options.size);
    if (options.classes)
        this.setClasses(options.classes);
    if (options.properties)
        this.setProperties(options.properties);
    if (options.attributes)
        this.setAttributes(options.attributes);
    if (options.content)
        this.setContent(options.content);
    return this;
};
function _cleanupClasses(target) {
    for (var i = 0; i < this._dirtyClasses.length; i++)
        target.classList.remove(this._dirtyClasses[i]);
    this._dirtyClasses = [];
}
function _applyStyles(target) {
    for (var n in this.properties) {
        target.style[n] = this.properties[n];
    }
}
function _cleanupStyles(target) {
    for (var n in this.properties) {
        target.style[n] = '';
    }
}
function _applyAttributes(target) {
    for (var n in this.attributes) {
        target.setAttribute(n, this.attributes[n]);
    }
}
function _cleanupAttributes(target) {
    for (var n in this.attributes) {
        target.removeAttribute(n);
    }
}
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
Surface.prototype.setup = function setup(allocator) {
    var target = allocator.allocate(this.elementType);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (var i = 0; i < this.elementClass.length; i++) {
                target.classList.add(this.elementClass[i]);
            }
        } else {
            target.classList.add(this.elementClass);
        }
    }
    target.style.display = '';
    this.attach(target);
    this._opacity = null;
    this._currentTarget = target;
    this._stylesDirty = true;
    this._classesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._originDirty = true;
    this._transformDirty = true;
};
Surface.prototype.commit = function commit(context) {
    if (!this._currentTarget)
        this.setup(context.allocator);
    var target = this._currentTarget;
    var size = context.size;
    if (this._classesDirty) {
        _cleanupClasses.call(this, target);
        var classList = this.getClassList();
        for (var i = 0; i < classList.length; i++)
            target.classList.add(classList[i]);
        this._classesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._attributesDirty) {
        _applyAttributes.call(this, target);
        this._attributesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this.size) {
        var origSize = context.size;
        size = [
            this.size[0],
            this.size[1]
        ];
        if (size[0] === undefined)
            size[0] = origSize[0];
        if (size[1] === undefined)
            size[1] = origSize[1];
        if (size[0] === true || size[1] === true) {
            if (size[0] === true) {
                if (this._trueSizeCheck || this._size[0] === 0) {
                    var width = target.offsetWidth;
                    if (this._size && this._size[0] !== width) {
                        this._size[0] = width;
                        this._sizeDirty = true;
                    }
                    size[0] = width;
                } else {
                    if (this._size)
                        size[0] = this._size[0];
                }
            }
            if (size[1] === true) {
                if (this._trueSizeCheck || this._size[1] === 0) {
                    var height = target.offsetHeight;
                    if (this._size && this._size[1] !== height) {
                        this._size[1] = height;
                        this._sizeDirty = true;
                    }
                    size[1] = height;
                } else {
                    if (this._size)
                        size[1] = this._size[1];
                }
            }
            this._trueSizeCheck = false;
        }
    }
    if (_xyNotEquals(this._size, size)) {
        if (!this._size)
            this._size = [
                0,
                0
            ];
        this._size[0] = size[0];
        this._size[1] = size[1];
        this._sizeDirty = true;
    }
    if (this._sizeDirty) {
        if (this._size) {
            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
        }
        this._eventOutput.emit('resize');
    }
    if (this._contentDirty) {
        this.deploy(target);
        this._eventOutput.emit('deploy');
        this._contentDirty = false;
        this._trueSizeCheck = true;
    }
    ElementOutput.prototype.commit.call(this, context);
};
Surface.prototype.cleanup = function cleanup(allocator) {
    var i = 0;
    var target = this._currentTarget;
    this._eventOutput.emit('recall');
    this.recall(target);
    target.style.display = 'none';
    target.style.opacity = '';
    target.style.width = '';
    target.style.height = '';
    _cleanupStyles.call(this, target);
    _cleanupAttributes.call(this, target);
    var classList = this.getClassList();
    _cleanupClasses.call(this, target);
    for (i = 0; i < classList.length; i++)
        target.classList.remove(classList[i]);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (i = 0; i < this.elementClass.length; i++) {
                target.classList.remove(this.elementClass[i]);
            }
        } else {
            target.classList.remove(this.elementClass);
        }
    }
    this.detach(target);
    this._currentTarget = null;
    allocator.deallocate(target);
};
Surface.prototype.deploy = function deploy(target) {
    var content = this.getContent();
    if (content instanceof Node) {
        while (target.hasChildNodes())
            target.removeChild(target.firstChild);
        target.appendChild(content);
    } else
        target.innerHTML = content;
};
Surface.prototype.recall = function recall(target) {
    var df = document.createDocumentFragment();
    while (target.hasChildNodes())
        df.appendChild(target.firstChild);
    this.setContent(df);
};
Surface.prototype.getSize = function getSize() {
    return this._size ? this._size : this.size;
};
Surface.prototype.setSize = function setSize(size) {
    this.size = size ? [
        size[0],
        size[1]
    ] : null;
    this._sizeDirty = true;
    return this;
};
module.exports = Surface;
},{"./ElementOutput":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/ElementOutput.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js":[function(require,module,exports){
var Transform = {};
Transform.precision = 0.000001;
Transform.identity = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
];
Transform.multiply4x4 = function multiply4x4(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
    ];
};
Transform.multiply = function multiply(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
        0,
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
        0,
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
        0,
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
        1
    ];
};
Transform.thenMove = function thenMove(m, t) {
    if (!t[2])
        t[2] = 0;
    return [
        m[0],
        m[1],
        m[2],
        0,
        m[4],
        m[5],
        m[6],
        0,
        m[8],
        m[9],
        m[10],
        0,
        m[12] + t[0],
        m[13] + t[1],
        m[14] + t[2],
        1
    ];
};
Transform.moveThen = function moveThen(v, m) {
    if (!v[2])
        v[2] = 0;
    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.translate = function translate(x, y, z) {
    if (z === undefined)
        z = 0;
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        x,
        y,
        z,
        1
    ];
};
Transform.thenScale = function thenScale(m, s) {
    return [
        s[0] * m[0],
        s[1] * m[1],
        s[2] * m[2],
        0,
        s[0] * m[4],
        s[1] * m[5],
        s[2] * m[6],
        0,
        s[0] * m[8],
        s[1] * m[9],
        s[2] * m[10],
        0,
        s[0] * m[12],
        s[1] * m[13],
        s[2] * m[14],
        1
    ];
};
Transform.scale = function scale(x, y, z) {
    if (z === undefined)
        z = 1;
    if (y === undefined)
        y = x;
    return [
        x,
        0,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        0,
        z,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateX = function rotateX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        1,
        0,
        0,
        0,
        0,
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateY = function rotateY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        0,
        -sinTheta,
        0,
        0,
        1,
        0,
        0,
        sinTheta,
        0,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateZ = function rotateZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotate = function rotate(phi, theta, psi) {
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var result = [
            cosTheta * cosPsi,
            cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
            sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
            0,
            -cosTheta * sinPsi,
            cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
            sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
            0,
            sinTheta,
            -sinPhi * cosTheta,
            cosPhi * cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.rotateAxis = function rotateAxis(v, theta) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var verTheta = 1 - cosTheta;
    var xxV = v[0] * v[0] * verTheta;
    var xyV = v[0] * v[1] * verTheta;
    var xzV = v[0] * v[2] * verTheta;
    var yyV = v[1] * v[1] * verTheta;
    var yzV = v[1] * v[2] * verTheta;
    var zzV = v[2] * v[2] * verTheta;
    var xs = v[0] * sinTheta;
    var ys = v[1] * sinTheta;
    var zs = v[2] * sinTheta;
    var result = [
            xxV + cosTheta,
            xyV + zs,
            xzV - ys,
            0,
            xyV - zs,
            yyV + cosTheta,
            yzV + xs,
            0,
            xzV + ys,
            yzV - xs,
            zzV + cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.aboutOrigin = function aboutOrigin(v, m) {
    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.skew = function skew(phi, theta, psi) {
    return [
        1,
        Math.tan(theta),
        0,
        0,
        Math.tan(psi),
        1,
        0,
        0,
        0,
        Math.tan(phi),
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewX = function skewX(angle) {
    return [
        1,
        0,
        0,
        0,
        Math.tan(angle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewY = function skewY(angle) {
    return [
        1,
        Math.tan(angle),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.perspective = function perspective(focusZ) {
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        -1 / focusZ,
        0,
        0,
        0,
        1
    ];
};
Transform.getTranslate = function getTranslate(m) {
    return [
        m[12],
        m[13],
        m[14]
    ];
};
Transform.inverse = function inverse(m) {
    var c0 = m[5] * m[10] - m[6] * m[9];
    var c1 = m[4] * m[10] - m[6] * m[8];
    var c2 = m[4] * m[9] - m[5] * m[8];
    var c4 = m[1] * m[10] - m[2] * m[9];
    var c5 = m[0] * m[10] - m[2] * m[8];
    var c6 = m[0] * m[9] - m[1] * m[8];
    var c8 = m[1] * m[6] - m[2] * m[5];
    var c9 = m[0] * m[6] - m[2] * m[4];
    var c10 = m[0] * m[5] - m[1] * m[4];
    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
    var invD = 1 / detM;
    var result = [
            invD * c0,
            -invD * c4,
            invD * c8,
            0,
            -invD * c1,
            invD * c5,
            -invD * c9,
            0,
            invD * c2,
            -invD * c6,
            invD * c10,
            0,
            0,
            0,
            0,
            1
        ];
    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
    return result;
};
Transform.transpose = function transpose(m) {
    return [
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15]
    ];
};
function _normSquared(v) {
    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function _norm(v) {
    return Math.sqrt(_normSquared(v));
}
function _sign(n) {
    return n < 0 ? -1 : 1;
}
Transform.interpret = function interpret(M) {
    var x = [
            M[0],
            M[1],
            M[2]
        ];
    var sgn = _sign(x[0]);
    var xNorm = _norm(x);
    var v = [
            x[0] + sgn * xNorm,
            x[1],
            x[2]
        ];
    var mult = 2 / _normSquared(v);
    if (mult >= Infinity) {
        return {
            translate: Transform.getTranslate(M),
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    }
    var Q1 = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q1[0] = 1 - mult * v[0] * v[0];
    Q1[5] = 1 - mult * v[1] * v[1];
    Q1[10] = 1 - mult * v[2] * v[2];
    Q1[1] = -mult * v[0] * v[1];
    Q1[2] = -mult * v[0] * v[2];
    Q1[6] = -mult * v[1] * v[2];
    Q1[4] = Q1[1];
    Q1[8] = Q1[2];
    Q1[9] = Q1[6];
    var MQ1 = Transform.multiply(Q1, M);
    var x2 = [
            MQ1[5],
            MQ1[6]
        ];
    var sgn2 = _sign(x2[0]);
    var x2Norm = _norm(x2);
    var v2 = [
            x2[0] + sgn2 * x2Norm,
            x2[1]
        ];
    var mult2 = 2 / _normSquared(v2);
    var Q2 = [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q2[5] = 1 - mult2 * v2[0] * v2[0];
    Q2[10] = 1 - mult2 * v2[1] * v2[1];
    Q2[6] = -mult2 * v2[0] * v2[1];
    Q2[9] = Q2[6];
    var Q = Transform.multiply(Q2, Q1);
    var R = Transform.multiply(Q, M);
    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
    R = Transform.multiply(R, remover);
    Q = Transform.multiply(remover, Q);
    var result = {};
    result.translate = Transform.getTranslate(M);
    result.rotate = [
        Math.atan2(-Q[6], Q[10]),
        Math.asin(Q[2]),
        Math.atan2(-Q[1], Q[0])
    ];
    if (!result.rotate[0]) {
        result.rotate[0] = 0;
        result.rotate[2] = Math.atan2(Q[4], Q[5]);
    }
    result.scale = [
        R[0],
        R[5],
        R[10]
    ];
    result.skew = [
        Math.atan2(R[9], result.scale[2]),
        Math.atan2(R[8], result.scale[2]),
        Math.atan2(R[4], result.scale[0])
    ];
    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
        result.rotate[1] = Math.PI - result.rotate[1];
        if (result.rotate[1] > Math.PI)
            result.rotate[1] -= 2 * Math.PI;
        if (result.rotate[1] < -Math.PI)
            result.rotate[1] += 2 * Math.PI;
        if (result.rotate[0] < 0)
            result.rotate[0] += Math.PI;
        else
            result.rotate[0] -= Math.PI;
        if (result.rotate[2] < 0)
            result.rotate[2] += Math.PI;
        else
            result.rotate[2] -= Math.PI;
    }
    return result;
};
Transform.average = function average(M1, M2, t) {
    t = t === undefined ? 0.5 : t;
    var specM1 = Transform.interpret(M1);
    var specM2 = Transform.interpret(M2);
    var specAvg = {
            translate: [
                0,
                0,
                0
            ],
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    for (var i = 0; i < 3; i++) {
        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
    }
    return Transform.build(specAvg);
};
Transform.build = function build(spec) {
    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
};
Transform.equals = function equals(a, b) {
    return !Transform.notEquals(a, b);
};
Transform.notEquals = function notEquals(a, b) {
    if (a === b)
        return false;
    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
};
Transform.normalizeRotation = function normalizeRotation(rotation) {
    var result = rotation.slice(0);
    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
        result[0] = -result[0];
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] > Math.PI * 0.5) {
        result[0] = result[0] - Math.PI;
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] < -Math.PI * 0.5) {
        result[0] = result[0] + Math.PI;
        result[1] = -Math.PI - result[1];
        result[2] -= Math.PI;
    }
    while (result[1] < -Math.PI)
        result[1] += 2 * Math.PI;
    while (result[1] >= Math.PI)
        result[1] -= 2 * Math.PI;
    while (result[2] < -Math.PI)
        result[2] += 2 * Math.PI;
    while (result[2] >= Math.PI)
        result[2] -= 2 * Math.PI;
    return result;
};
Transform.inFront = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0.001,
    1
];
Transform.behind = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -0.001,
    1
];
module.exports = Transform;
},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/View.js":[function(require,module,exports){
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var RenderNode = require('./RenderNode');
var Utility = require('../utilities/Utility');
function View(options) {
    this._node = new RenderNode();
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
View.DEFAULT_OPTIONS = {};
View.prototype.getOptions = function getOptions(key) {
    return this._optionsManager.getOptions(key);
};
View.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};
View.prototype.add = function add() {
    return this._node.add.apply(this._node, arguments);
};
View.prototype._add = View.prototype.add;
View.prototype.render = function render() {
    return this._node.render();
};
View.prototype.getSize = function getSize() {
    if (this._node && this._node.getSize) {
        return this._node.getSize.apply(this._node, arguments) || this.options.size;
    } else
        return this.options.size;
};
module.exports = View;
},{"../utilities/Utility":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/utilities/Utility.js","./EventHandler":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/OptionsManager.js","./RenderNode":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/RenderNode.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/famous.css":[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    opacity: .999999; /* ios8 hotfix */\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/Users/benhulan/Developer/browserify-seed/node_modules/cssify"))(css); module.exports = css;
},{"/Users/benhulan/Developer/browserify-seed/node_modules/cssify":"/Users/benhulan/Developer/browserify-seed/node_modules/cssify/browser.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/surfaces/ImageSurface.js":[function(require,module,exports){
var Surface = require('../core/Surface');
function ImageSurface(options) {
    this._imageUrl = undefined;
    Surface.apply(this, arguments);
}
var urlCache = [];
var countCache = [];
var nodeCache = [];
var cacheEnabled = true;
ImageSurface.enableCache = function enableCache() {
    cacheEnabled = true;
};
ImageSurface.disableCache = function disableCache() {
    cacheEnabled = false;
};
ImageSurface.clearCache = function clearCache() {
    urlCache = [];
    countCache = [];
    nodeCache = [];
};
ImageSurface.getCache = function getCache() {
    return {
        urlCache: urlCache,
        countCache: countCache,
        nodeCache: countCache
    };
};
ImageSurface.prototype = Object.create(Surface.prototype);
ImageSurface.prototype.constructor = ImageSurface;
ImageSurface.prototype.elementType = 'img';
ImageSurface.prototype.elementClass = 'famous-surface';
ImageSurface.prototype.setContent = function setContent(imageUrl) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (urlIndex !== -1) {
        if (countCache[urlIndex] === 1) {
            urlCache.splice(urlIndex, 1);
            countCache.splice(urlIndex, 1);
            nodeCache.splice(urlIndex, 1);
        } else {
            countCache[urlIndex]--;
        }
    }
    urlIndex = urlCache.indexOf(imageUrl);
    if (urlIndex === -1) {
        urlCache.push(imageUrl);
        countCache.push(1);
    } else {
        countCache[urlIndex]++;
    }
    this._imageUrl = imageUrl;
    this._contentDirty = true;
};
ImageSurface.prototype.deploy = function deploy(target) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (nodeCache[urlIndex] === undefined && cacheEnabled) {
        var img = new Image();
        img.src = this._imageUrl || '';
        nodeCache[urlIndex] = img;
    }
    target.src = this._imageUrl || '';
};
ImageSurface.prototype.recall = function recall(target) {
    target.src = '';
};
module.exports = ImageSurface;
},{"../core/Surface":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Surface.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Easing.js":[function(require,module,exports){
var Easing = {
        inQuad: function (t) {
            return t * t;
        },
        outQuad: function (t) {
            return -(t -= 1) * t + 1;
        },
        inOutQuad: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t;
            return -0.5 * (--t * (t - 2) - 1);
        },
        inCubic: function (t) {
            return t * t * t;
        },
        outCubic: function (t) {
            return --t * t * t + 1;
        },
        inOutCubic: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t;
            return 0.5 * ((t -= 2) * t * t + 2);
        },
        inQuart: function (t) {
            return t * t * t * t;
        },
        outQuart: function (t) {
            return -(--t * t * t * t - 1);
        },
        inOutQuart: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t * t;
            return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        inQuint: function (t) {
            return t * t * t * t * t;
        },
        outQuint: function (t) {
            return --t * t * t * t * t + 1;
        },
        inOutQuint: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t * t * t;
            return 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        inSine: function (t) {
            return -1 * Math.cos(t * (Math.PI / 2)) + 1;
        },
        outSine: function (t) {
            return Math.sin(t * (Math.PI / 2));
        },
        inOutSine: function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
        },
        inExpo: function (t) {
            return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
        },
        outExpo: function (t) {
            return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
        },
        inOutExpo: function (t) {
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if ((t /= 0.5) < 1)
                return 0.5 * Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, -10 * --t) + 2);
        },
        inCirc: function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
        },
        outCirc: function (t) {
            return Math.sqrt(1 - --t * t);
        },
        inOutCirc: function (t) {
            if ((t /= 0.5) < 1)
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        inElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if (!p)
                p = 0.3;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        },
        outElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if (!p)
                p = 0.3;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
        },
        inOutElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if ((t /= 0.5) === 2)
                return 1;
            if (!p)
                p = 0.3 * 1.5;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (t < 1)
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
        },
        inBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
        outBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            return --t * t * ((s + 1) * t + s) + 1;
        },
        inOutBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            if ((t /= 0.5) < 1)
                return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
            return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        inBounce: function (t) {
            return 1 - Easing.outBounce(1 - t);
        },
        outBounce: function (t) {
            if (t < 1 / 2.75) {
                return 7.5625 * t * t;
            } else if (t < 2 / 2.75) {
                return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
            } else if (t < 2.5 / 2.75) {
                return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
            } else {
                return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }
        },
        inOutBounce: function (t) {
            if (t < 0.5)
                return Easing.inBounce(t * 2) * 0.5;
            return Easing.outBounce(t * 2 - 1) * 0.5 + 0.5;
        }
    };
module.exports = Easing;
},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/MultipleTransition.js":[function(require,module,exports){
var Utility = require('../utilities/Utility');
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}
MultipleTransition.SUPPORTS_MULTIPLE = true;
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};
MultipleTransition.prototype.set = function set(endState, transition, callback) {
    var _allCallback = Utility.after(endState.length, callback);
    for (var i = 0; i < endState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].set(endState[i], transition, _allCallback);
    }
};
MultipleTransition.prototype.reset = function reset(startState) {
    for (var i = 0; i < startState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].reset(startState[i]);
    }
};
module.exports = MultipleTransition;
},{"../utilities/Utility":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/utilities/Utility.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js":[function(require,module,exports){
var MultipleTransition = require('./MultipleTransition');
var TweenTransition = require('./TweenTransition');
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;
    this.set(start);
}
var transitionMethods = {};
Transitionable.register = function register(methods) {
    var success = true;
    for (var method in methods) {
        if (!Transitionable.registerMethod(method, methods[method]))
            success = false;
    }
    return success;
};
Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    } else
        return false;
};
Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    } else
        return false;
};
function _loadNext() {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    if (this.actionQueue.length <= 0) {
        this.set(this.get());
        return;
    }
    this.currentAction = this.actionQueue.shift();
    this._callback = this.callbackQueue.shift();
    var method = null;
    var endValue = this.currentAction[0];
    var transition = this.currentAction[1];
    if (transition instanceof Object && transition.method) {
        method = transition.method;
        if (typeof method === 'string')
            method = transitionMethods[method];
    } else {
        method = TweenTransition;
    }
    if (this._currentMethod !== method) {
        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
            this._engineInstance = new method();
        } else {
            this._engineInstance = new MultipleTransition(method);
        }
        this._currentMethod = method;
    }
    this._engineInstance.reset(this.state, this.velocity);
    if (this.velocity !== undefined)
        transition.velocity = this.velocity;
    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
}
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback)
            callback();
        return this;
    }
    var action = [
            endState,
            transition
        ];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction)
        _loadNext.call(this);
    return this;
};
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};
Transitionable.prototype.delay = function delay(duration, callback) {
    this.set(this.get(), {
        duration: duration,
        curve: function () {
            return 0;
        }
    }, callback);
};
Transitionable.prototype.get = function get(timestamp) {
    if (this._engineInstance) {
        if (this._engineInstance.getVelocity)
            this.velocity = this._engineInstance.getVelocity();
        this.state = this._engineInstance.get(timestamp);
    }
    return this.state;
};
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};
Transitionable.prototype.halt = function halt() {
    return this.set(this.get());
};
module.exports = Transitionable;
},{"./MultipleTransition":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/MultipleTransition.js","./TweenTransition":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/TweenTransition.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/TransitionableTransform.js":[function(require,module,exports){
var Transitionable = require('./Transitionable');
var Transform = require('../core/Transform');
var Utility = require('../utilities/Utility');
function TransitionableTransform(transform) {
    this._final = Transform.identity.slice();
    this._finalTranslate = [
        0,
        0,
        0
    ];
    this._finalRotate = [
        0,
        0,
        0
    ];
    this._finalSkew = [
        0,
        0,
        0
    ];
    this._finalScale = [
        1,
        1,
        1
    ];
    this.translate = new Transitionable(this._finalTranslate);
    this.rotate = new Transitionable(this._finalRotate);
    this.skew = new Transitionable(this._finalSkew);
    this.scale = new Transitionable(this._finalScale);
    if (transform)
        this.set(transform);
}
function _build() {
    return Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
    });
}
function _buildFinal() {
    return Transform.build({
        translate: this._finalTranslate,
        rotate: this._finalRotate,
        skew: this._finalSkew,
        scale: this._finalScale
    });
}
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
    this._finalTranslate = translate;
    this._final = _buildFinal.call(this);
    this.translate.set(translate, transition, callback);
    return this;
};
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
    this._finalScale = scale;
    this._final = _buildFinal.call(this);
    this.scale.set(scale, transition, callback);
    return this;
};
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
    this._finalRotate = eulerAngles;
    this._final = _buildFinal.call(this);
    this.rotate.set(eulerAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
    this._finalSkew = skewAngles;
    this._final = _buildFinal.call(this);
    this.skew.set(skewAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.set = function set(transform, transition, callback) {
    var components = Transform.interpret(transform);
    this._finalTranslate = components.translate;
    this._finalRotate = components.rotate;
    this._finalSkew = components.skew;
    this._finalScale = components.scale;
    this._final = transform;
    var _callback = callback ? Utility.after(4, callback) : null;
    this.translate.set(components.translate, transition, _callback);
    this.rotate.set(components.rotate, transition, _callback);
    this.skew.set(components.skew, transition, _callback);
    this.scale.set(components.scale, transition, _callback);
    return this;
};
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
    this.translate.setDefault(transition);
    this.rotate.setDefault(transition);
    this.skew.setDefault(transition);
    this.scale.setDefault(transition);
};
TransitionableTransform.prototype.get = function get() {
    if (this.isActive()) {
        return _build.call(this);
    } else
        return this._final;
};
TransitionableTransform.prototype.getFinal = function getFinal() {
    return this._final;
};
TransitionableTransform.prototype.isActive = function isActive() {
    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
};
TransitionableTransform.prototype.halt = function halt() {
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
    this._final = this.get();
    this._finalTranslate = this.translate.get();
    this._finalRotate = this.rotate.get();
    this._finalSkew = this.skew.get();
    this._finalScale = this.scale.get();
    return this;
};
module.exports = TransitionableTransform;
},{"../core/Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js","../utilities/Utility":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/utilities/Utility.js","./Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/TweenTransition.js":[function(require,module,exports){
function TweenTransition(options) {
    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._startTime = 0;
    this._startValue = 0;
    this._updateTime = 0;
    this._endValue = 0;
    this._curve = undefined;
    this._duration = 0;
    this._active = false;
    this._callback = undefined;
    this.state = 0;
    this.velocity = undefined;
}
TweenTransition.Curves = {
    linear: function (t) {
        return t;
    },
    easeIn: function (t) {
        return t * t;
    },
    easeOut: function (t) {
        return t * (2 - t);
    },
    easeInOut: function (t) {
        if (t <= 0.5)
            return 2 * t * t;
        else
            return -2 * t * t + 4 * t - 1;
    },
    easeOutBounce: function (t) {
        return t * (3 - 2 * t);
    },
    spring: function (t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};
TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0
};
var registeredCurves = {};
TweenTransition.registerCurve = function registerCurve(curveName, curve) {
    if (!registeredCurves[curveName]) {
        registeredCurves[curveName] = curve;
        return true;
    } else {
        return false;
    }
};
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
    if (registeredCurves[curveName]) {
        delete registeredCurves[curveName];
        return true;
    } else {
        return false;
    }
};
TweenTransition.getCurve = function getCurve(curveName) {
    var curve = registeredCurves[curveName];
    if (curve !== undefined)
        return curve;
    else
        throw new Error('curve not registered');
};
TweenTransition.getCurves = function getCurves() {
    return registeredCurves;
};
function _interpolate(a, b, t) {
    return (1 - t) * a + t * b;
}
function _clone(obj) {
    if (obj instanceof Object) {
        if (obj instanceof Array)
            return obj.slice(0);
        else
            return Object.create(obj);
    } else
        return obj;
}
function _normalize(transition, defaultTransition) {
    var result = { curve: defaultTransition.curve };
    if (defaultTransition.duration)
        result.duration = defaultTransition.duration;
    if (defaultTransition.speed)
        result.speed = defaultTransition.speed;
    if (transition instanceof Object) {
        if (transition.duration !== undefined)
            result.duration = transition.duration;
        if (transition.curve)
            result.curve = transition.curve;
        if (transition.speed)
            result.speed = transition.speed;
    }
    if (typeof result.curve === 'string')
        result.curve = TweenTransition.getCurve(result.curve);
    return result;
}
TweenTransition.prototype.setOptions = function setOptions(options) {
    if (options.curve !== undefined)
        this.options.curve = options.curve;
    if (options.duration !== undefined)
        this.options.duration = options.duration;
    if (options.speed !== undefined)
        this.options.speed = options.speed;
};
TweenTransition.prototype.set = function set(endValue, transition, callback) {
    if (!transition) {
        this.reset(endValue);
        if (callback)
            callback();
        return;
    }
    this._startValue = _clone(this.get());
    transition = _normalize(transition, this.options);
    if (transition.speed) {
        var startValue = this._startValue;
        if (startValue instanceof Object) {
            var variance = 0;
            for (var i in startValue)
                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
            transition.duration = Math.sqrt(variance) / transition.speed;
        } else {
            transition.duration = Math.abs(endValue - startValue) / transition.speed;
        }
    }
    this._startTime = Date.now();
    this._endValue = _clone(endValue);
    this._startVelocity = _clone(transition.velocity);
    this._duration = transition.duration;
    this._curve = transition.curve;
    this._active = true;
    this._callback = callback;
};
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    this.state = _clone(startValue);
    this.velocity = _clone(startVelocity);
    this._startTime = 0;
    this._duration = 0;
    this._updateTime = 0;
    this._startValue = this.state;
    this._startVelocity = this.velocity;
    this._endValue = this.state;
    this._active = false;
};
TweenTransition.prototype.getVelocity = function getVelocity() {
    return this.velocity;
};
TweenTransition.prototype.get = function get(timestamp) {
    this.update(timestamp);
    return this.state;
};
function _calculateVelocity(current, start, curve, duration, t) {
    var velocity;
    var eps = 1e-7;
    var speed = (curve(t) - curve(t - eps)) / eps;
    if (current instanceof Array) {
        velocity = [];
        for (var i = 0; i < current.length; i++) {
            if (typeof current[i] === 'number')
                velocity[i] = speed * (current[i] - start[i]) / duration;
            else
                velocity[i] = 0;
        }
    } else
        velocity = speed * (current - start) / duration;
    return velocity;
}
function _calculateState(start, end, t) {
    var state;
    if (start instanceof Array) {
        state = [];
        for (var i = 0; i < start.length; i++) {
            if (typeof start[i] === 'number')
                state[i] = _interpolate(start[i], end[i], t);
            else
                state[i] = start[i];
        }
    } else
        state = _interpolate(start, end, t);
    return state;
}
TweenTransition.prototype.update = function update(timestamp) {
    if (!this._active) {
        if (this._callback) {
            var callback = this._callback;
            this._callback = undefined;
            callback();
        }
        return;
    }
    if (!timestamp)
        timestamp = Date.now();
    if (this._updateTime >= timestamp)
        return;
    this._updateTime = timestamp;
    var timeSinceStart = timestamp - this._startTime;
    if (timeSinceStart >= this._duration) {
        this.state = this._endValue;
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
        this._active = false;
    } else if (timeSinceStart < 0) {
        this.state = this._startValue;
        this.velocity = this._startVelocity;
    } else {
        var t = timeSinceStart / this._duration;
        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
    }
};
TweenTransition.prototype.isActive = function isActive() {
    return this._active;
};
TweenTransition.prototype.halt = function halt() {
    this.reset(this.get());
};
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0;
    v2 = v2 || 0;
    return function (t) {
        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
    };
};
module.exports = TweenTransition;
},{}],"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/utilities/Utility.js":[function(require,module,exports){
var Utility = {};
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};
Utility.after = function after(count, callback) {
    var counter = count;
    return function () {
        counter--;
        if (counter === 0)
            callback.apply(this, arguments);
    };
};
Utility.loadURL = function loadURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (callback)
                callback(this.responseText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    var result = document.createDocumentFragment();
    while (element.hasChildNodes())
        result.appendChild(element.firstChild);
    return result;
};
Utility.clone = function clone(b) {
    var a;
    if (typeof b === 'object') {
        a = b instanceof Array ? [] : {};
        for (var key in b) {
            if (typeof b[key] === 'object' && b[key] !== null) {
                if (b[key] instanceof Array) {
                    a[key] = new Array(b[key].length);
                    for (var i = 0; i < b[key].length; i++) {
                        a[key][i] = Utility.clone(b[key][i]);
                    }
                } else {
                    a[key] = Utility.clone(b[key]);
                }
            } else {
                a[key] = b[key];
            }
        }
    } else {
        a = b;
    }
    return a;
};
module.exports = Utility;
},{}],"/Users/benhulan/Developer/browserify-seed/src/BgView.js":[function(require,module,exports){
define(function(require,exports, module){

require('./styles');
require('famous-polyfills');

var Engine = require('famous/src/core/Engine');
var Modifier = require('famous/src/core/Modifier');
var Transform = require('famous/src/core/Transform');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var Transitionable = require('famous/src/transitions/Transitionable');
var Easing = require('famous/src/transitions/Easing');
var View = require('famous/src/core/View');



function BgView(){
  View.apply(this, arguments)
  
  // centered background
  var centerBgMod = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5]
  });
  var bg = new ImageSurface({
    size: [400, 579],
    content: 'images/bg.svg'
  });
  this.add(centerBgMod).add(bg);
}
BgView.prototype = Object.create(View.prototype);
BgView.prototype.constructor = BgView;

module.exports = BgView;

});
},{"./styles":"/Users/benhulan/Developer/browserify-seed/src/styles/index.js","famous-polyfills":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Engine.js","famous/src/core/Modifier":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js","famous/src/core/View":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/View.js","famous/src/surfaces/ImageSurface":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/Easing":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Easing.js","famous/src/transitions/Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/benhulan/Developer/browserify-seed/src/ModelView.js":[function(require,module,exports){
define(function(require,exports, module){

require('./styles');
require('famous-polyfills');

var Engine = require('famous/src/core/Engine');
var Modifier = require('famous/src/core/Modifier');
var Transform = require('famous/src/core/Transform');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var Transitionable = require('famous/src/transitions/Transitionable');
var Easing = require('famous/src/transitions/Easing');
var View = require('famous/src/core/View');

function ModelView(){
  View.apply(this, arguments);
  // centered model
  var centerModelMod = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5]
  });
  var model = new ImageSurface({
    size: [114, 530],
    content: 'images/model.svg'
  });
  this.add(centerModelMod).add(model);
}
ModelView.prototype = Object.create(View.prototype);
ModelView.prototype.constructor = ModelView;

module.exports = ModelView;
});


},{"./styles":"/Users/benhulan/Developer/browserify-seed/src/styles/index.js","famous-polyfills":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Engine.js","famous/src/core/Modifier":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js","famous/src/core/View":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/View.js","famous/src/surfaces/ImageSurface":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/Easing":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Easing.js","famous/src/transitions/Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/benhulan/Developer/browserify-seed/src/OutfitView.js":[function(require,module,exports){
define(function(require,exports, module){

require('./styles');
require('famous-polyfills');

var Engine = require('famous/src/core/Engine');
var Modifier = require('famous/src/core/Modifier');
var Transform = require('famous/src/core/Transform');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var Transitionable = require('famous/src/transitions/Transitionable');
var Easing = require('famous/src/transitions/Easing');
var View = require('famous/src/core/View');



function OutfitView(){
  View.call(this)

  // wearing top
  var wearingTopMod = new Modifier({
    align: [0.5, 0.28],
    origin: [0.5, 0]
  });

  // wearing bottom
  var wearingLowMod = new Modifier({
    align: [0.5, 0.434],
    origin: [0.5, 0]
  });

  var blouse1Mod = new Modifier({
    align: [0.75, 0.15],
    origin: [0.5, 0]
  });
  var blouse1 = new ImageSurface({
    size: [100, 106],
    content: 'images/blouse1.svg'
  });
  this.add(blouse1Mod).add(blouse1);

  // blouse 100 x 106
  var blouse2Mod = new Modifier({
    align: [0.85, 0.15],
    origin: [0.5, 0]
  });
  var blouse2 = new ImageSurface({
    size: [100, 106],
    content: 'images/blouse2.svg'
  });
  this.add(blouse2Mod).add(blouse2);

  // blouse3
  var blouse3Mod = new Modifier({
    align: [0.95, 0.15],
    origin: [0.5, 0]
  });
  var blouse3 = new ImageSurface({
    size: [100, 106],
    content: 'images/blouse3.svg'
  });
  this.add(blouse3Mod).add(blouse3);

  // tee shirt1 94 x 112
  var shirt1Mod = new Modifier({
    align: [0.75, 0.325],
    origin: [0.5, 0]
  });
  var shirt1 = new ImageSurface({
    size: [94, 112],
    content: 'images/shirt1.svg'
  });
  this.add(shirt1Mod).add(shirt1);

  // shirt 2
  var shirt2Mod = new Modifier({
    align: [0.85, 0.325],
    origin: [0.5, 0]
  });
  var shirt2 = new ImageSurface({
    size: [94, 112],
    content: 'images/shirt2.svg'
  });
  this.add(shirt2Mod).add(shirt2);

  // shirt3
  var shirt3Mod = new Modifier({
    align: [0.95, 0.325],
    origin: [0.5, 0]
  });
  var shirt3 = new ImageSurface({
    size: [94, 112],
    content: 'images/shirt3.svg'
  });
  this.add(shirt3Mod).add(shirt3);

  // dress1 99 x 178
  var dress1Mod = new Modifier({
    align: [0.1, 0.15],
    origin: [0.5, 0]
  });
  var dress1 = new ImageSurface({
    size: [99, 179],
    content: 'images/dress1.svg'
  });
  this.add(dress1Mod).add(dress1);

  // dress2 99 x 178
  var dress2Mod = new Modifier({
    align: [0.2, 0.15],
    origin: [0.5, 0]
  });
  var dress2 = new ImageSurface({
    size: [99, 179],
    content: 'images/dress2.svg'
  });
  this.add(dress2Mod).add(dress2);

  // dress3 99 x 178
  var dress3Mod = new Modifier({
    align: [0.3, 0.15],
    origin: [0.5, 0]
  });
  var dress3 = new ImageSurface({
    size: [99, 179],
    content: 'images/dress3.svg'
  });
  this.add(dress3Mod).add(dress3);

  // skirt1 90 x 112
  var skirt1Mod = new Modifier({
    align: [0.1, 0.5],
    origin: [0.5, 0]
  });
  var skirt1 = new ImageSurface({
    size: [90, 112],
    content: 'images/skirt1.svg'
  });
  this.add(skirt1Mod).add(skirt1);

  // skirt2 121 x 92
  var skirt2Mod = new Modifier({
    align: [0.2, 0.5],
    origin: [0.5, 0]
  });
  var skirt2 = new ImageSurface({
    size: [121, 92],
    content: 'images/skirt2.svg'
  });
  this.add(skirt2Mod).add(skirt2);

  // skirt3 90 x 146
  var skirt3Mod = new Modifier({
    align: [0.3, 0.5],
    origin: [0.5, 0]
  });
  var skirt3 = new ImageSurface({
    size: [90, 146],
    content: 'images/skirt3.svg'
  });
  this.add(skirt3Mod).add(skirt3);

  // shorts 99 x 55
  var shorts1Mod = new Modifier({
    align: [0.75, 0.5],
    origin: [0.5, 0]
  });
  var shorts1 = new ImageSurface({
    size: [99, 55],
    content:  'images/shorts1.svg'
  });
  this.add(shorts1Mod).add(shorts1);

  // shorts 99 x 55
  var shorts2Mod = new Modifier({
    align: [0.75, 0.6],
    origin: [0.5, 0]
  });
  var shorts2 = new ImageSurface({
    size: [99, 55],
    content:  'images/shorts2.svg'
  });
  this.add(shorts2Mod).add(shorts2);

  // shorts 99 x 55
  var shorts3Mod = new Modifier({
    align: [0.75, 0.7],
    origin: [0.5, 0]
  });
  var shorts3 = new ImageSurface({
    size: [99, 55],
    content:  'images/shorts3.svg'
  });
  this.add(shorts3Mod).add(shorts3);

  // pants 86 x 279
  var pants1Mod = new Modifier({
    align: [0.85, 0.5],
    origin: [0.5, 0]
  });
  var pants1 = new ImageSurface({
    size: [86, 279],
    content: 'images/pants1.svg'
  });
  this.add(pants1Mod).add(pants1);

  // pants2 86 x 279
  var pants2Mod = new Modifier({
    align: [0.95, 0.5],
    origin: [0.5, 0]
  });
  var pants2 = new ImageSurface({
    size: [86, 279],
    content: 'images/pants2.svg'
  });

  this.add(pants2Mod).add(pants2);
}

OutfitView.prototype = Object.create(View.prototype);
OutfitView.prototype.constructor = OutfitView;

module.exports = OutfitView;

});

},{"./styles":"/Users/benhulan/Developer/browserify-seed/src/styles/index.js","famous-polyfills":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Engine.js","famous/src/core/Modifier":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js","famous/src/core/View":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/View.js","famous/src/surfaces/ImageSurface":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/Easing":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Easing.js","famous/src/transitions/Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/benhulan/Developer/browserify-seed/src/index.js":[function(require,module,exports){

define(function(require, exports, module){

require('./styles');
require('famous-polyfills');
require('./BgView.js');
require('./ModelView.js');
require('./OutfitView.js');

var Engine = require('famous/src/core/Engine');
var Modifier = require('famous/src/core/Modifier');
var Transform = require('famous/src/core/Transform');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var Transitionable = require('famous/src/transitions/Transitionable');
var Easing = require('famous/src/transitions/Easing');
var View = require('famous/src/core/View');

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
},{"./BgView.js":"/Users/benhulan/Developer/browserify-seed/src/BgView.js","./ModelView.js":"/Users/benhulan/Developer/browserify-seed/src/ModelView.js","./OutfitView.js":"/Users/benhulan/Developer/browserify-seed/src/OutfitView.js","./styles":"/Users/benhulan/Developer/browserify-seed/src/styles/index.js","famous-polyfills":"/Users/benhulan/Developer/browserify-seed/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Engine.js","famous/src/core/Modifier":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/Transform.js","famous/src/core/View":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/View.js","famous/src/surfaces/ImageSurface":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/Easing":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Easing.js","famous/src/transitions/Transitionable":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/benhulan/Developer/browserify-seed/src/styles/app.css":[function(require,module,exports){
var css = "html {\n  background: #fff;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("/Users/benhulan/Developer/browserify-seed/node_modules/cssify"))(css); module.exports = css;
},{"/Users/benhulan/Developer/browserify-seed/node_modules/cssify":"/Users/benhulan/Developer/browserify-seed/node_modules/cssify/browser.js"}],"/Users/benhulan/Developer/browserify-seed/src/styles/index.js":[function(require,module,exports){
// load css
require('famous/src/core/famous.css');
require('./app.css');

},{"./app.css":"/Users/benhulan/Developer/browserify-seed/src/styles/app.css","famous/src/core/famous.css":"/Users/benhulan/Developer/browserify-seed/node_modules/famous/src/core/famous.css"}]},{},["/Users/benhulan/Developer/browserify-seed/src/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY3NzaWZ5L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudEFsbG9jYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudE91dHB1dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9FbnRpdHkuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL0V2ZW50RW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRXZlbnRIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvT3B0aW9uc01hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1JlbmRlck5vZGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1NwZWNQYXJzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1N1cmZhY2UuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvZmFtb3VzLmNzcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL0Vhc2luZy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL011bHRpcGxlVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9Ud2VlblRyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsInNyYy9CZ1ZpZXcuanMiLCJzcmMvTW9kZWxWaWV3LmpzIiwic3JjL091dGZpdFZpZXcuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvc3R5bGVzL2FwcC5jc3MiLCJzcmMvc3R5bGVzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MsIGN1c3RvbURvY3VtZW50KSB7XG4gIHZhciBkb2MgPSBjdXN0b21Eb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgaWYgKGRvYy5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgdmFyIHNoZWV0ID0gZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKVxuICAgIHNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgcmV0dXJuIHNoZWV0Lm93bmVyTm9kZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5ieVVybCA9IGZ1bmN0aW9uKHVybCkge1xuICBpZiAoZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KHVybCkub3duZXJOb2RlO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgcmV0dXJuIGxpbms7XG4gIH1cbn07XG4iLCJcbi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDIwMTEtMDYtMTVcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBQdWJsaWMgRG9tYWluLlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMqL1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcbiAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgLCBlbGVtQ3RyUHJvdG8gPSAodmlldy5IVE1MRWxlbWVudCB8fCB2aWV3LkVsZW1lbnQpW3Byb3RvUHJvcF1cbiAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG4gICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSB0aGlzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgIH1cbiAgICAsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmNsYXNzTmFtZSlcbiAgICAgICAgICAgICwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG4gICAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuICAgICwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcbiAgICB9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgcmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucHVzaCh0b2tlbik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHZhciBpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLmFkZCh0b2tlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodG9rZW4pO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcbiAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgICBjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICB9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICBlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHNlbGYpKTtcblxufVxuIiwiaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDUgaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgZkJvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1AgJiYgb1RoaXNcbiAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICB9O1xufVxuIiwicmVxdWlyZSgnLi9jbGFzc0xpc3QuanMnKTtcbnJlcXVpcmUoJy4vZnVuY3Rpb25Qcm90b3R5cGVCaW5kLmpzJyk7XG5yZXF1aXJlKCcuL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcycpOyIsIi8vIGFkZHMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uYWxpdHlcbi8vIFNvdXJjZTogaHR0cDovL3N0cmQ2LmNvbS8yMDExLzA1L2JldHRlci13aW5kb3ctcmVxdWVzdGFuaW1hdGlvbmZyYW1lLXNoaW0vXG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gIGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soK25ldyBEYXRlKCkpO1xuICB9LCAxMDAwIC8gNjApO1xufSk7XG4iLCJ2YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4vUmVuZGVyTm9kZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgRWxlbWVudEFsbG9jYXRvciA9IHJlcXVpcmUoJy4vRWxlbWVudEFsbG9jYXRvcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIF96ZXJvWmVybyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG52YXIgdXNlUHJlZml4ID0gISgncGVyc3BlY3RpdmUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSk7XG5mdW5jdGlvbiBfZ2V0RWxlbWVudFNpemUoZWxlbWVudCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIGVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgIGVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgXTtcbn1cbnZhciBfc2V0UGVyc3BlY3RpdmUgPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCwgcGVyc3BlY3RpdmUpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlID8gcGVyc3BlY3RpdmUudG9GaXhlZCgpICsgJ3B4JyA6ICcnO1xuICAgIH0gOiBmdW5jdGlvbiAoZWxlbWVudCwgcGVyc3BlY3RpdmUpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlID8gcGVyc3BlY3RpdmUudG9GaXhlZCgpICsgJ3B4JyA6ICcnO1xuICAgIH07XG5mdW5jdGlvbiBDb250ZXh0KGNvbnRhaW5lcikge1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvciA9IG5ldyBFbGVtZW50QWxsb2NhdG9yKGNvbnRhaW5lcik7XG4gICAgdGhpcy5fbm9kZSA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSgwKTtcbiAgICB0aGlzLl9wZXJzcGVjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9ub2RlQ29udGV4dCA9IHtcbiAgICAgICAgYWxsb2NhdG9yOiB0aGlzLl9hbGxvY2F0b3IsXG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IF96ZXJvWmVybyxcbiAgICAgICAgYWxpZ246IF96ZXJvWmVybyxcbiAgICAgICAgc2l6ZTogdGhpcy5fc2l6ZVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRTaXplKF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcikpO1xuICAgIH0uYmluZCh0aGlzKSk7XG59XG5Db250ZXh0LnByb3RvdHlwZS5nZXRBbGxvY2F0b3IgPSBmdW5jdGlvbiBnZXRBbGxvY2F0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG9jYXRvcjtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQob2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUuYWRkKG9iaik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUubWlncmF0ZSA9IGZ1bmN0aW9uIG1pZ3JhdGUoY29udGFpbmVyKSB7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gdGhpcy5jb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLl9hbGxvY2F0b3IubWlncmF0ZShjb250YWluZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUpIHtcbiAgICBpZiAoIXNpemUpXG4gICAgICAgIHNpemUgPSBfZ2V0RWxlbWVudFNpemUodGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgIHRoaXMuX3NpemVbMV0gPSBzaXplWzFdO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShjb250ZXh0UGFyYW1ldGVycykge1xuICAgIGlmIChjb250ZXh0UGFyYW1ldGVycykge1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMudHJhbnNmb3JtKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQudHJhbnNmb3JtID0gY29udGV4dFBhcmFtZXRlcnMudHJhbnNmb3JtO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMub3BhY2l0eSlcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0Lm9wYWNpdHkgPSBjb250ZXh0UGFyYW1ldGVycy5vcGFjaXR5O1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMub3JpZ2luKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQub3JpZ2luID0gY29udGV4dFBhcmFtZXRlcnMub3JpZ2luO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMuYWxpZ24pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5hbGlnbiA9IGNvbnRleHRQYXJhbWV0ZXJzLmFsaWduO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LnNpemUgPSBjb250ZXh0UGFyYW1ldGVycy5zaXplO1xuICAgIH1cbiAgICB2YXIgcGVyc3BlY3RpdmUgPSB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlLmdldCgpO1xuICAgIGlmIChwZXJzcGVjdGl2ZSAhPT0gdGhpcy5fcGVyc3BlY3RpdmUpIHtcbiAgICAgICAgX3NldFBlcnNwZWN0aXZlKHRoaXMuY29udGFpbmVyLCBwZXJzcGVjdGl2ZSk7XG4gICAgICAgIHRoaXMuX3BlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmU7XG4gICAgfVxuICAgIHRoaXMuX25vZGUuY29tbWl0KHRoaXMuX25vZGVDb250ZXh0KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5nZXRQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIGdldFBlcnNwZWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlLmdldCgpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnNldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gc2V0UGVyc3BlY3RpdmUocGVyc3BlY3RpdmUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuc2V0KHBlcnNwZWN0aXZlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBldmVudCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0Lm9uKHR5cGUsIGhhbmRsZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5yZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQudW5waXBlKHRhcmdldCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0OyIsImZ1bmN0aW9uIEVsZW1lbnRBbGxvY2F0b3IoY29udGFpbmVyKSB7XG4gICAgaWYgKCFjb250YWluZXIpXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLmRldGFjaGVkTm9kZXMgPSB7fTtcbiAgICB0aGlzLm5vZGVDb3VudCA9IDA7XG59XG5FbGVtZW50QWxsb2NhdG9yLnByb3RvdHlwZS5taWdyYXRlID0gZnVuY3Rpb24gbWlncmF0ZShjb250YWluZXIpIHtcbiAgICB2YXIgb2xkQ29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gb2xkQ29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENvbnRhaW5lciBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKG9sZENvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvbGRDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuYWxsb2NhdGUgPSBmdW5jdGlvbiBhbGxvY2F0ZSh0eXBlKSB7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuZGV0YWNoZWROb2RlcykpXG4gICAgICAgIHRoaXMuZGV0YWNoZWROb2Rlc1t0eXBlXSA9IFtdO1xuICAgIHZhciBub2RlU3RvcmUgPSB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV07XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAobm9kZVN0b3JlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0ID0gbm9kZVN0b3JlLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgfVxuICAgIHRoaXMubm9kZUNvdW50Kys7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5FbGVtZW50QWxsb2NhdG9yLnByb3RvdHlwZS5kZWFsbG9jYXRlID0gZnVuY3Rpb24gZGVhbGxvY2F0ZShlbGVtZW50KSB7XG4gICAgdmFyIG5vZGVUeXBlID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBub2RlU3RvcmUgPSB0aGlzLmRldGFjaGVkTm9kZXNbbm9kZVR5cGVdO1xuICAgIG5vZGVTdG9yZS5wdXNoKGVsZW1lbnQpO1xuICAgIHRoaXMubm9kZUNvdW50LS07XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuZ2V0Tm9kZUNvdW50ID0gZnVuY3Rpb24gZ2V0Tm9kZUNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb3VudDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRBbGxvY2F0b3I7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4vRW50aXR5Jyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIHVzZVByZWZpeCA9ICEoJ3RyYW5zZm9ybScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKTtcbnZhciBkZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbmZ1bmN0aW9uIEVsZW1lbnRPdXRwdXQoZWxlbWVudCkge1xuICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgdGhpcy5fb3JpZ2luID0gbnVsbDtcbiAgICB0aGlzLl9zaXplID0gbnVsbDtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICB0aGlzLmV2ZW50Rm9yd2FyZGVyID0gZnVuY3Rpb24gZXZlbnRGb3J3YXJkZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdChldmVudC50eXBlLCBldmVudCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fb3JpZ2luRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX2ludmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmIChlbGVtZW50KVxuICAgICAgICB0aGlzLmF0dGFjaChlbGVtZW50KTtcbn1cbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgZm4pIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudClcbiAgICAgICAgdGhpcy5fZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHRoaXMuZXZlbnRGb3J3YXJkZXIpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0Lm9uKHR5cGUsIGZuKTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKSB7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQucmVtb3ZlTGlzdGVuZXIodHlwZSwgZm4pO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICYmICFldmVudC5vcmlnaW4pXG4gICAgICAgIGV2ZW50Lm9yaWdpbiA9IHRoaXM7XG4gICAgdmFyIGhhbmRsZWQgPSB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGV2ZW50KTtcbiAgICBpZiAoaGFuZGxlZCAmJiBldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHJldHVybiBoYW5kbGVkO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5waXBlKHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC51bnBpcGUodGFyZ2V0KTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG59O1xuZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXJzKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fZXZlbnRPdXRwdXQubGlzdGVuZXJzKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGksIHRoaXMuZXZlbnRGb3J3YXJkZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9yZW1vdmVFdmVudExpc3RlbmVycyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2V2ZW50T3V0cHV0Lmxpc3RlbmVycykge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihpLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfZm9ybWF0Q1NTVHJhbnNmb3JtKG0pIHtcbiAgICBtWzEyXSA9IE1hdGgucm91bmQobVsxMl0gKiBkZXZpY2VQaXhlbFJhdGlvKSAvIGRldmljZVBpeGVsUmF0aW87XG4gICAgbVsxM10gPSBNYXRoLnJvdW5kKG1bMTNdICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIHZhciByZXN1bHQgPSAnbWF0cml4M2QoJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IG1baV0gPCAwLjAwMDAwMSAmJiBtW2ldID4gLTAuMDAwMDAxID8gJzAsJyA6IG1baV0gKyAnLCc7XG4gICAgfVxuICAgIHJlc3VsdCArPSBtWzE1XSArICcpJztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxudmFyIF9zZXRNYXRyaXg7XG5pZiAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xKSB7XG4gICAgX3NldE1hdHJpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS56SW5kZXggPSBtYXRyaXhbMTRdICogMTAwMDAwMCB8IDA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gX2Zvcm1hdENTU1RyYW5zZm9ybShtYXRyaXgpO1xuICAgIH07XG59IGVsc2UgaWYgKHVzZVByZWZpeCkge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gX2Zvcm1hdENTU1RyYW5zZm9ybShtYXRyaXgpO1xuICAgIH07XG59IGVsc2Uge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gX2Zvcm1hdENTU1RyYW5zZm9ybShtYXRyaXgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBfZm9ybWF0Q1NTT3JpZ2luKG9yaWdpbikge1xuICAgIHJldHVybiAxMDAgKiBvcmlnaW5bMF0gKyAnJSAnICsgMTAwICogb3JpZ2luWzFdICsgJyUnO1xufVxudmFyIF9zZXRPcmlnaW4gPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCwgb3JpZ2luKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pO1xuICAgIH0gOiBmdW5jdGlvbiAoZWxlbWVudCwgb3JpZ2luKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pO1xuICAgIH07XG52YXIgX3NldEludmlzaWJsZSA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlM2QoMC4wMDAxLDAuMDAwMSwwLjAwMDEpJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9IDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgwLjAwMDEsMC4wMDAxLDAuMDAwMSknO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIH07XG5mdW5jdGlvbiBfeHlOb3RFcXVhbHMoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBhWzBdICE9PSBiWzBdIHx8IGFbMV0gIT09IGJbMV0gOiBhICE9PSBiO1xufVxuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudDtcbiAgICBpZiAoIXRhcmdldClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBtYXRyaXggPSBjb250ZXh0LnRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luID0gY29udGV4dC5vcmlnaW47XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgaWYgKCFtYXRyaXggJiYgdGhpcy5fbWF0cml4KSB7XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSAwO1xuICAgICAgICBfc2V0SW52aXNpYmxlKHRhcmdldCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF94eU5vdEVxdWFscyh0aGlzLl9vcmlnaW4sIG9yaWdpbikpXG4gICAgICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gdHJ1ZTtcbiAgICBpZiAoVHJhbnNmb3JtLm5vdEVxdWFscyh0aGlzLl9tYXRyaXgsIG1hdHJpeCkpXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5faW52aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuX2ludmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wYWNpdHkgIT09IG9wYWNpdHkpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eSA+PSAxID8gJzAuOTk5OTk5JyA6IG9wYWNpdHk7XG4gICAgfVxuICAgIGlmICh0aGlzLl90cmFuc2Zvcm1EaXJ0eSB8fCB0aGlzLl9vcmlnaW5EaXJ0eSB8fCB0aGlzLl9zaXplRGlydHkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemVEaXJ0eSlcbiAgICAgICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fb3JpZ2luRGlydHkpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29yaWdpbilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5bMF0gPSBvcmlnaW5bMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luWzFdID0gb3JpZ2luWzFdO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIF9zZXRPcmlnaW4odGFyZ2V0LCB0aGlzLl9vcmlnaW4pO1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luRGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdHJpeClcbiAgICAgICAgICAgIG1hdHJpeCA9IFRyYW5zZm9ybS5pZGVudGl0eTtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gbWF0cml4O1xuICAgICAgICB2YXIgYWFNYXRyaXggPSB0aGlzLl9zaXplID8gVHJhbnNmb3JtLnRoZW5Nb3ZlKG1hdHJpeCwgW1xuICAgICAgICAgICAgICAgIC10aGlzLl9zaXplWzBdICogb3JpZ2luWzBdLFxuICAgICAgICAgICAgICAgIC10aGlzLl9zaXplWzFdICogb3JpZ2luWzFdLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pIDogbWF0cml4O1xuICAgICAgICBfc2V0TWF0cml4KHRhcmdldCwgYWFNYXRyaXgpO1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuICAgIH1cbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9pbnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaCh0YXJnZXQpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGFyZ2V0O1xuICAgIF9hZGRFdmVudExpc3RlbmVycy5jYWxsKHRoaXMsIHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgX3JlbW92ZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuX2ludmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5faW52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudE91dHB1dDsiLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgRW5naW5lID0ge307XG52YXIgY29udGV4dHMgPSBbXTtcbnZhciBuZXh0VGlja1F1ZXVlID0gW107XG52YXIgY3VycmVudEZyYW1lID0gMDtcbnZhciBuZXh0VGlja0ZyYW1lID0gMDtcbnZhciBkZWZlclF1ZXVlID0gW107XG52YXIgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xudmFyIGZyYW1lVGltZTtcbnZhciBmcmFtZVRpbWVMaW1pdDtcbnZhciBsb29wRW5hYmxlZCA9IHRydWU7XG52YXIgZXZlbnRGb3J3YXJkZXJzID0ge307XG52YXIgZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xudmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbnRhaW5lclR5cGU6ICdkaXYnLFxuICAgICAgICBjb250YWluZXJDbGFzczogJ2ZhbW91cy1jb250YWluZXInLFxuICAgICAgICBmcHNDYXA6IHVuZGVmaW5lZCxcbiAgICAgICAgcnVuTG9vcDogdHJ1ZSxcbiAgICAgICAgYXBwTW9kZTogdHJ1ZVxuICAgIH07XG52YXIgb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIob3B0aW9ucyk7XG52YXIgTUFYX0RFRkVSX0ZSQU1FX1RJTUUgPSAxMDtcbkVuZ2luZS5zdGVwID0gZnVuY3Rpb24gc3RlcCgpIHtcbiAgICBjdXJyZW50RnJhbWUrKztcbiAgICBuZXh0VGlja0ZyYW1lID0gY3VycmVudEZyYW1lO1xuICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKGZyYW1lVGltZUxpbWl0ICYmIGN1cnJlbnRUaW1lIC0gbGFzdFRpbWUgPCBmcmFtZVRpbWVMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBpID0gMDtcbiAgICBmcmFtZVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3ByZXJlbmRlcicpO1xuICAgIHZhciBudW1GdW5jdGlvbnMgPSBuZXh0VGlja1F1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZSAobnVtRnVuY3Rpb25zLS0pXG4gICAgICAgIG5leHRUaWNrUXVldWUuc2hpZnQoKShjdXJyZW50RnJhbWUpO1xuICAgIHdoaWxlIChkZWZlclF1ZXVlLmxlbmd0aCAmJiBEYXRlLm5vdygpIC0gY3VycmVudFRpbWUgPCBNQVhfREVGRVJfRlJBTUVfVElNRSkge1xuICAgICAgICBkZWZlclF1ZXVlLnNoaWZ0KCkuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRzLmxlbmd0aDsgaSsrKVxuICAgICAgICBjb250ZXh0c1tpXS51cGRhdGUoKTtcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9zdHJlbmRlcicpO1xufTtcbmZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgaWYgKG9wdGlvbnMucnVuTG9vcCkge1xuICAgICAgICBFbmdpbmUuc3RlcCgpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH0gZWxzZVxuICAgICAgICBsb29wRW5hYmxlZCA9IGZhbHNlO1xufVxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbmZ1bmN0aW9uIGhhbmRsZVJlc2l6ZShldmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29udGV4dHNbaV0uZW1pdCgncmVzaXplJyk7XG4gICAgfVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKTtcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUsIGZhbHNlKTtcbmhhbmRsZVJlc2l6ZSgpO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgYWRkUm9vdENsYXNzZXMoKTtcbn1cbnZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xuZnVuY3Rpb24gYWRkUm9vdENsYXNzZXMoKSB7XG4gICAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhhZGRSb290Q2xhc3Nlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtcm9vdCcpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtcm9vdCcpO1xufVxuRW5naW5lLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQuc3Vic2NyaWJlKEVuZ2luZSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnBpcGUodGFyZ2V0KTtcbn07XG5FbmdpbmUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlci51bnBpcGUodGFyZ2V0KTtcbn07XG5FbmdpbmUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEodHlwZSBpbiBldmVudEZvcndhcmRlcnMpKSB7XG4gICAgICAgIGV2ZW50Rm9yd2FyZGVyc1t0eXBlXSA9IGV2ZW50SGFuZGxlci5lbWl0LmJpbmQoZXZlbnRIYW5kbGVyLCB0eXBlKTtcbiAgICAgICAgYWRkRW5naW5lTGlzdGVuZXIodHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKTtcbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5vbih0eXBlLCBoYW5kbGVyKTtcbn07XG5mdW5jdGlvbiBhZGRFbmdpbmVMaXN0ZW5lcih0eXBlLCBmb3J3YXJkZXIpIHtcbiAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgRW5naW5lLm5leHRUaWNrKGFkZEV2ZW50TGlzdGVuZXIuYmluZCh0aGlzLCB0eXBlLCBmb3J3YXJkZXIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm9yd2FyZGVyKTtcbn1cbkVuZ2luZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiBldmVudEhhbmRsZXIuZW1pdCh0eXBlLCBldmVudCk7XG59O1xuRW5naW5lLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHJldHVybiBldmVudEhhbmRsZXIucmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG59O1xuRW5naW5lLmdldEZQUyA9IGZ1bmN0aW9uIGdldEZQUygpIHtcbiAgICByZXR1cm4gMTAwMCAvIGZyYW1lVGltZTtcbn07XG5FbmdpbmUuc2V0RlBTQ2FwID0gZnVuY3Rpb24gc2V0RlBTQ2FwKGZwcykge1xuICAgIGZyYW1lVGltZUxpbWl0ID0gTWF0aC5mbG9vcigxMDAwIC8gZnBzKTtcbn07XG5FbmdpbmUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoa2V5KSB7XG4gICAgcmV0dXJuIG9wdGlvbnNNYW5hZ2VyLmdldE9wdGlvbnMoa2V5KTtcbn07XG5FbmdpbmUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zTWFuYWdlci5zZXRPcHRpb25zLmFwcGx5KG9wdGlvbnNNYW5hZ2VyLCBhcmd1bWVudHMpO1xufTtcbkVuZ2luZS5jcmVhdGVDb250ZXh0ID0gZnVuY3Rpb24gY3JlYXRlQ29udGV4dChlbCkge1xuICAgIGlmICghaW5pdGlhbGl6ZWQgJiYgb3B0aW9ucy5hcHBNb2RlKVxuICAgICAgICBFbmdpbmUubmV4dFRpY2soaW5pdGlhbGl6ZSk7XG4gICAgdmFyIG5lZWRNb3VudENvbnRhaW5lciA9IGZhbHNlO1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG9wdGlvbnMuY29udGFpbmVyVHlwZSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jb250YWluZXJDbGFzcyk7XG4gICAgICAgIG5lZWRNb3VudENvbnRhaW5lciA9IHRydWU7XG4gICAgfVxuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoZWwpO1xuICAgIEVuZ2luZS5yZWdpc3RlckNvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKG5lZWRNb3VudENvbnRhaW5lcilcbiAgICAgICAgbW91bnQoY29udGV4dCwgZWwpO1xuICAgIHJldHVybiBjb250ZXh0O1xufTtcbmZ1bmN0aW9uIG1vdW50KGNvbnRleHQsIGVsKSB7XG4gICAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhtb3VudC5iaW5kKHRoaXMsIGNvbnRleHQsIGVsKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgY29udGV4dC5lbWl0KCdyZXNpemUnKTtcbn1cbkVuZ2luZS5yZWdpc3RlckNvbnRleHQgPSBmdW5jdGlvbiByZWdpc3RlckNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuRW5naW5lLmdldENvbnRleHRzID0gZnVuY3Rpb24gZ2V0Q29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGNvbnRleHRzO1xufTtcbkVuZ2luZS5kZXJlZ2lzdGVyQ29udGV4dCA9IGZ1bmN0aW9uIGRlcmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpIHtcbiAgICB2YXIgaSA9IGNvbnRleHRzLmluZGV4T2YoY29udGV4dCk7XG4gICAgaWYgKGkgPj0gMClcbiAgICAgICAgY29udGV4dHMuc3BsaWNlKGksIDEpO1xufTtcbkVuZ2luZS5uZXh0VGljayA9IGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgbmV4dFRpY2tRdWV1ZS5wdXNoKGZuKTtcbn07XG5FbmdpbmUuZGVmZXIgPSBmdW5jdGlvbiBkZWZlcihmbikge1xuICAgIGRlZmVyUXVldWUucHVzaChmbik7XG59O1xub3B0aW9uc01hbmFnZXIub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEuaWQgPT09ICdmcHNDYXAnKVxuICAgICAgICBFbmdpbmUuc2V0RlBTQ2FwKGRhdGEudmFsdWUpO1xuICAgIGVsc2UgaWYgKGRhdGEuaWQgPT09ICdydW5Mb29wJykge1xuICAgICAgICBpZiAoIWxvb3BFbmFibGVkICYmIGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgIGxvb3BFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsInZhciBlbnRpdGllcyA9IFtdO1xuZnVuY3Rpb24gZ2V0KGlkKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzW2lkXTtcbn1cbmZ1bmN0aW9uIHNldChpZCwgZW50aXR5KSB7XG4gICAgZW50aXRpZXNbaWRdID0gZW50aXR5O1xufVxuZnVuY3Rpb24gcmVnaXN0ZXIoZW50aXR5KSB7XG4gICAgdmFyIGlkID0gZW50aXRpZXMubGVuZ3RoO1xuICAgIHNldChpZCwgZW50aXR5KTtcbiAgICByZXR1cm4gaWQ7XG59XG5mdW5jdGlvbiB1bnJlZ2lzdGVyKGlkKSB7XG4gICAgc2V0KGlkLCBudWxsKTtcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICB1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyLFxuICAgIGdldDogZ2V0LFxuICAgIHNldDogc2V0XG59OyIsImZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIHRoaXMuX293bmVyID0gdGhpcztcbn1cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0uY2FsbCh0aGlzLl9vd25lciwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdmFyIGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICBpZiAobGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgaW5kZXggPSBsaXN0ZW5lci5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMClcbiAgICAgICAgICAgIGxpc3RlbmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYmluZFRoaXMgPSBmdW5jdGlvbiBiaW5kVGhpcyhvd25lcikge1xuICAgIHRoaXMuX293bmVyID0gb3duZXI7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7IiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyJyk7XG5mdW5jdGlvbiBFdmVudEhhbmRsZXIoKSB7XG4gICAgRXZlbnRFbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5kb3duc3RyZWFtID0gW107XG4gICAgdGhpcy5kb3duc3RyZWFtRm4gPSBbXTtcbiAgICB0aGlzLnVwc3RyZWFtID0gW107XG4gICAgdGhpcy51cHN0cmVhbUxpc3RlbmVycyA9IHt9O1xufVxuRXZlbnRIYW5kbGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXZlbnRIYW5kbGVyO1xuRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlciA9IGZ1bmN0aW9uIHNldElucHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBvYmplY3QudHJpZ2dlciA9IGhhbmRsZXIudHJpZ2dlci5iaW5kKGhhbmRsZXIpO1xuICAgIGlmIChoYW5kbGVyLnN1YnNjcmliZSAmJiBoYW5kbGVyLnVuc3Vic2NyaWJlKSB7XG4gICAgICAgIG9iamVjdC5zdWJzY3JpYmUgPSBoYW5kbGVyLnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgICAgICBvYmplY3QudW5zdWJzY3JpYmUgPSBoYW5kbGVyLnVuc3Vic2NyaWJlLmJpbmQoaGFuZGxlcik7XG4gICAgfVxufTtcbkV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0T3V0cHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcilcbiAgICAgICAgaGFuZGxlci5iaW5kVGhpcyhvYmplY3QpO1xuICAgIG9iamVjdC5waXBlID0gaGFuZGxlci5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LnVucGlwZSA9IGhhbmRsZXIudW5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0Lm9uID0gaGFuZGxlci5vbi5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5hZGRMaXN0ZW5lciA9IG9iamVjdC5vbjtcbiAgICBvYmplY3QucmVtb3ZlTGlzdGVuZXIgPSBoYW5kbGVyLnJlbW92ZUxpc3RlbmVyLmJpbmQoaGFuZGxlcik7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcilcbiAgICAgICAgICAgIHRoaXMuZG93bnN0cmVhbVtpXS50cmlnZ2VyKHR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZG93bnN0cmVhbUZuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZG93bnN0cmVhbUZuW2ldKHR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZSh0aGlzKTtcbiAgICB2YXIgZG93bnN0cmVhbUN0eCA9IHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgZG93bnN0cmVhbUN0eC5wdXNoKHRhcmdldCk7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0YXJnZXQoJ3BpcGUnLCBudWxsKTtcbiAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcilcbiAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3BpcGUnLCBudWxsKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZSh0aGlzKTtcbiAgICB2YXIgZG93bnN0cmVhbUN0eCA9IHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgZG93bnN0cmVhbUN0eC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgICAgICB0YXJnZXQoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcilcbiAgICAgICAgICAgIHRhcmdldC50cmlnZ2VyKCd1bnBpcGUnLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykpIHtcbiAgICAgICAgdmFyIHVwc3RyZWFtTGlzdGVuZXIgPSB0aGlzLnRyaWdnZXIuYmluZCh0aGlzLCB0eXBlKTtcbiAgICAgICAgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSA9IHVwc3RyZWFtTGlzdGVuZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51cHN0cmVhbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy51cHN0cmVhbVtpXS5vbih0eXBlLCB1cHN0cmVhbUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbjtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhpcy51cHN0cmVhbS5wdXNoKHNvdXJjZSk7XG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykge1xuICAgICAgICAgICAgc291cmNlLm9uKHR5cGUsIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShzb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVwc3RyZWFtLmluZGV4T2Yoc291cmNlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykge1xuICAgICAgICAgICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKHR5cGUsIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRIYW5kbGVyOyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBNb2RpZmllcihvcHRpb25zKSB7XG4gICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2FsaWduR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9sZWdhY3lTdGF0ZXMgPSB7fTtcbiAgICB0aGlzLl9vdXRwdXQgPSB7XG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IG51bGwsXG4gICAgICAgIGFsaWduOiBudWxsLFxuICAgICAgICBzaXplOiBudWxsLFxuICAgICAgICBwcm9wb3J0aW9uczogbnVsbCxcbiAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybUZyb20ob3B0aW9ucy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAob3B0aW9ucy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHlGcm9tKG9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9yaWdpbilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbShvcHRpb25zLm9yaWdpbik7XG4gICAgICAgIGlmIChvcHRpb25zLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5hbGlnbkZyb20ob3B0aW9ucy5hbGlnbik7XG4gICAgICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKG9wdGlvbnMuc2l6ZSk7XG4gICAgICAgIGlmIChvcHRpb25zLnByb3BvcnRpb25zKVxuICAgICAgICAgICAgdGhpcy5wcm9wb3J0aW9uc0Zyb20ob3B0aW9ucy5wcm9wb3J0aW9ucyk7XG4gICAgfVxufVxuTW9kaWZpZXIucHJvdG90eXBlLnRyYW5zZm9ybUZyb20gPSBmdW5jdGlvbiB0cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSkge1xuICAgIGlmICh0cmFuc2Zvcm0gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gdHJhbnNmb3JtO1xuICAgIGVsc2UgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2Zvcm0uZ2V0KVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm0uZ2V0LmJpbmQodHJhbnNmb3JtKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLm9wYWNpdHlGcm9tID0gZnVuY3Rpb24gb3BhY2l0eUZyb20ob3BhY2l0eSkge1xuICAgIGlmIChvcGFjaXR5IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBvcGFjaXR5O1xuICAgIGVsc2UgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBPYmplY3QgJiYgb3BhY2l0eS5nZXQpXG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBvcGFjaXR5LmdldC5iaW5kKG9wYWNpdHkpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUub3JpZ2luRnJvbSA9IGZ1bmN0aW9uIG9yaWdpbkZyb20ob3JpZ2luKSB7XG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBvcmlnaW47XG4gICAgZWxzZSBpZiAob3JpZ2luIGluc3RhbmNlb2YgT2JqZWN0ICYmIG9yaWdpbi5nZXQpXG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbi5nZXQuYmluZChvcmlnaW4pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gb3JpZ2luO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuYWxpZ25Gcm9tID0gZnVuY3Rpb24gYWxpZ25Gcm9tKGFsaWduKSB7XG4gICAgaWYgKGFsaWduIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gYWxpZ247XG4gICAgZWxzZSBpZiAoYWxpZ24gaW5zdGFuY2VvZiBPYmplY3QgJiYgYWxpZ24uZ2V0KVxuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IGFsaWduLmdldC5iaW5kKGFsaWduKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQuYWxpZ24gPSBhbGlnbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNpemVGcm9tID0gZnVuY3Rpb24gc2l6ZUZyb20oc2l6ZSkge1xuICAgIGlmIChzaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBzaXplO1xuICAgIGVsc2UgaWYgKHNpemUgaW5zdGFuY2VvZiBPYmplY3QgJiYgc2l6ZS5nZXQpXG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBzaXplLmdldC5iaW5kKHNpemUpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnNpemUgPSBzaXplO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUucHJvcG9ydGlvbnNGcm9tID0gZnVuY3Rpb24gcHJvcG9ydGlvbnNGcm9tKHByb3BvcnRpb25zKSB7XG4gICAgaWYgKHByb3BvcnRpb25zIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBwcm9wb3J0aW9ucztcbiAgICBlbHNlIGlmIChwcm9wb3J0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCAmJiBwcm9wb3J0aW9ucy5nZXQpXG4gICAgICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBwcm9wb3J0aW9ucy5nZXQuYmluZChwcm9wb3J0aW9ucyk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQucHJvcG9ydGlvbnMgPSBwcm9wb3J0aW9ucztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIHNldFRyYW5zZm9ybSh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0gPSBuZXcgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odGhpcy5fb3V0cHV0LnRyYW5zZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90cmFuc2Zvcm1HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0uc2V0KHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtRnJvbSh0cmFuc2Zvcm0pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcGFjaXR5ID0gZnVuY3Rpb24gc2V0T3BhY2l0eShvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5ID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5vcGFjaXR5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29wYWNpdHlHZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHlGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5LnNldChvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLm9wYWNpdHlGcm9tKG9wYWNpdHkpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbiBzZXRPcmlnaW4ob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5vcmlnaW4gfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLm9yaWdpbkZyb20odGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbik7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4uc2V0KG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luRnJvbShvcmlnaW4pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRBbGlnbiA9IGZ1bmN0aW9uIHNldEFsaWduKGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbikge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbikge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5hbGlnbiB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2FsaWduR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5hbGlnbkZyb20odGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduLnNldChhbGlnbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ25Gcm9tKGFsaWduKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoc2l6ZSAmJiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LnNpemUgfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9zaXplR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5zaXplRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplLnNldChzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplRnJvbShzaXplKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBzZXRQcm9wb3J0aW9ucyhwcm9wb3J0aW9ucywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAocHJvcG9ydGlvbnMgJiYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3Byb3BvcnRpb25HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnByb3BvcnRpb25zRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMuc2V0KHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wb3J0aW9uc0Zyb20ocHJvcG9ydGlvbnMpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSlcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbi5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucylcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zLmhhbHQoKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybUdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRGaW5hbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldEZpbmFsVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtID8gdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5nZXRGaW5hbCgpIDogdGhpcy5fb3V0cHV0LnRyYW5zZm9ybTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uIGdldE9wYWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wYWNpdHlHZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5HZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0QWxpZ24gPSBmdW5jdGlvbiBnZXRBbGlnbigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxpZ25HZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemVHZXR0ZXIgPyB0aGlzLl9zaXplR2V0dGVyKCkgOiB0aGlzLl9vdXRwdXQuc2l6ZTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBnZXRQcm9wb3J0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcG9ydGlvbkdldHRlciA/IHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIoKSA6IHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucztcbn07XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLl90cmFuc2Zvcm1HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC50cmFuc2Zvcm0gPSB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fb3BhY2l0eUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9wYWNpdHkgPSB0aGlzLl9vcGFjaXR5R2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX29yaWdpbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9yaWdpbiA9IHRoaXMuX29yaWdpbkdldHRlcigpO1xuICAgIGlmICh0aGlzLl9hbGlnbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LmFsaWduID0gdGhpcy5fYWxpZ25HZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fc2l6ZUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnNpemUgPSB0aGlzLl9zaXplR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyA9IHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIoKTtcbn1cbk1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX291dHB1dC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1vZGlmaWVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gT3B0aW9uc01hbmFnZXIodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQgPSBudWxsO1xufVxuT3B0aW9uc01hbmFnZXIucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaE9iamVjdChzb3VyY2UsIGRhdGEpIHtcbiAgICB2YXIgbWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcihzb3VyY2UpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICBtYW5hZ2VyLnBhdGNoKGFyZ3VtZW50c1tpXSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbn07XG5mdW5jdGlvbiBfY3JlYXRlRXZlbnRPdXRwdXQoKSB7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLmV2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRPdXRwdXQpO1xufVxuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gcGF0Y2goKSB7XG4gICAgdmFyIG15U3RhdGUgPSB0aGlzLl92YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoayBpbiBteVN0YXRlICYmIChkYXRhW2tdICYmIGRhdGFba10uY29uc3RydWN0b3IgPT09IE9iamVjdCkgJiYgKG15U3RhdGVba10gJiYgbXlTdGF0ZVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIGlmICghbXlTdGF0ZS5oYXNPd25Qcm9wZXJ0eShrKSlcbiAgICAgICAgICAgICAgICAgICAgbXlTdGF0ZVtrXSA9IE9iamVjdC5jcmVhdGUobXlTdGF0ZVtrXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXkoaykucGF0Y2goZGF0YVtrXSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRPdXRwdXQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGssXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5rZXkoaykudmFsdWUoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIGRhdGFba10pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBhdGNoO1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmtleSA9IGZ1bmN0aW9uIGtleShpZGVudGlmaWVyKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLl92YWx1ZVtpZGVudGlmaWVyXSk7XG4gICAgaWYgKCEocmVzdWx0Ll92YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgcmVzdWx0Ll92YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXN1bHQuX3ZhbHVlID0ge307XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHJldHVybiBrZXkgPyB0aGlzLl92YWx1ZVtrZXldIDogdGhpcy5fdmFsdWU7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgdmFyIG9yaWdpbmFsVmFsdWUgPSB0aGlzLmdldChrZXkpO1xuICAgIHRoaXMuX3ZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5ldmVudE91dHB1dCAmJiB2YWx1ZSAhPT0gb3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICBpZDoga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBPcHRpb25zTWFuYWdlcjsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9FbnRpdHknKTtcbnZhciBTcGVjUGFyc2VyID0gcmVxdWlyZSgnLi9TcGVjUGFyc2VyJyk7XG5mdW5jdGlvbiBSZW5kZXJOb2RlKG9iamVjdCkge1xuICAgIHRoaXMuX29iamVjdCA9IG51bGw7XG4gICAgdGhpcy5fY2hpbGQgPSBudWxsO1xuICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9pc1JlbmRlcmFibGUgPSBmYWxzZTtcbiAgICB0aGlzLl9pc01vZGlmaWVyID0gZmFsc2U7XG4gICAgdGhpcy5fcmVzdWx0Q2FjaGUgPSB7fTtcbiAgICB0aGlzLl9wcmV2UmVzdWx0cyA9IHt9O1xuICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gbnVsbDtcbiAgICBpZiAob2JqZWN0KVxuICAgICAgICB0aGlzLnNldChvYmplY3QpO1xufVxuUmVuZGVyTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKGNoaWxkKSB7XG4gICAgdmFyIGNoaWxkTm9kZSA9IGNoaWxkIGluc3RhbmNlb2YgUmVuZGVyTm9kZSA/IGNoaWxkIDogbmV3IFJlbmRlck5vZGUoY2hpbGQpO1xuICAgIGlmICh0aGlzLl9jaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICB0aGlzLl9jaGlsZC5wdXNoKGNoaWxkTm9kZSk7XG4gICAgZWxzZSBpZiAodGhpcy5fY2hpbGQpIHtcbiAgICAgICAgdGhpcy5fY2hpbGQgPSBbXG4gICAgICAgICAgICB0aGlzLl9jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkTm9kZVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBbXTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGhpcy5fY2hpbGQgPSBjaGlsZE5vZGU7XG4gICAgcmV0dXJuIGNoaWxkTm9kZTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29iamVjdCB8fCAodGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA/IG51bGwgOiB0aGlzLl9jaGlsZCA/IHRoaXMuX2NoaWxkLmdldCgpIDogbnVsbCk7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGNoaWxkKSB7XG4gICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBudWxsO1xuICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9pc1JlbmRlcmFibGUgPSBjaGlsZC5yZW5kZXIgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5faXNNb2RpZmllciA9IGNoaWxkLm1vZGlmeSA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9vYmplY3QgPSBjaGlsZDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUmVuZGVyTm9kZSlcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXM7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0U2l6ZSlcbiAgICAgICAgcmVzdWx0ID0gdGFyZ2V0LmdldFNpemUoKTtcbiAgICBpZiAoIXJlc3VsdCAmJiB0aGlzLl9jaGlsZCAmJiB0aGlzLl9jaGlsZC5nZXRTaXplKVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZC5nZXRTaXplKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5mdW5jdGlvbiBfYXBwbHlDb21taXQoc3BlYywgY29udGV4dCwgY2FjaGVTdG9yYWdlKSB7XG4gICAgdmFyIHJlc3VsdCA9IFNwZWNQYXJzZXIucGFyc2Uoc3BlYywgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXN1bHQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgIHZhciBjb21taXRQYXJhbXMgPSByZXN1bHRbaWRdO1xuICAgICAgICBjb21taXRQYXJhbXMuYWxsb2NhdG9yID0gY29udGV4dC5hbGxvY2F0b3I7XG4gICAgICAgIHZhciBjb21taXRSZXN1bHQgPSBjaGlsZE5vZGUuY29tbWl0KGNvbW1pdFBhcmFtcyk7XG4gICAgICAgIGlmIChjb21taXRSZXN1bHQpXG4gICAgICAgICAgICBfYXBwbHlDb21taXQoY29tbWl0UmVzdWx0LCBjb250ZXh0LCBjYWNoZVN0b3JhZ2UpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjYWNoZVN0b3JhZ2VbaWRdID0gY29tbWl0UGFyYW1zO1xuICAgIH1cbn1cblJlbmRlck5vZGUucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHByZXZLZXlzID0gT2JqZWN0LmtleXModGhpcy5fcHJldlJlc3VsdHMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJldktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gcHJldktleXNbaV07XG4gICAgICAgIGlmICh0aGlzLl9yZXN1bHRDYWNoZVtpZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IEVudGl0eS5nZXQoaWQpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5jbGVhbnVwKVxuICAgICAgICAgICAgICAgIG9iamVjdC5jbGVhbnVwKGNvbnRleHQuYWxsb2NhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9wcmV2UmVzdWx0cyA9IHRoaXMuX3Jlc3VsdENhY2hlO1xuICAgIHRoaXMuX3Jlc3VsdENhY2hlID0ge307XG4gICAgX2FwcGx5Q29tbWl0KHRoaXMucmVuZGVyKCksIGNvbnRleHQsIHRoaXMuX3Jlc3VsdENhY2hlKTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVuZGVyYWJsZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdC5yZW5kZXIoKTtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICBpZiAodGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbikge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZFJlc3VsdDtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IGNoaWxkcmVuW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jaGlsZClcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fY2hpbGQucmVuZGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuX2lzTW9kaWZpZXIgPyB0aGlzLl9vYmplY3QubW9kaWZ5KHJlc3VsdCkgOiByZXN1bHQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJOb2RlOyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xuZnVuY3Rpb24gU3BlY1BhcnNlcigpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHt9O1xufVxuU3BlY1BhcnNlci5faW5zdGFuY2UgPSBuZXcgU3BlY1BhcnNlcigpO1xuU3BlY1BhcnNlci5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHNwZWMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gU3BlY1BhcnNlci5faW5zdGFuY2UucGFyc2Uoc3BlYywgY29udGV4dCk7XG59O1xuU3BlY1BhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShzcGVjLCBjb250ZXh0KSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuX3BhcnNlU3BlYyhzcGVjLCBjb250ZXh0LCBUcmFuc2Zvcm0uaWRlbnRpdHkpO1xuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbn07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHRoaXMucmVzdWx0ID0ge307XG59O1xuZnVuY3Rpb24gX3ZlY0luQ29udGV4dCh2LCBtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdLFxuICAgICAgICB2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV0sXG4gICAgICAgIHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF1cbiAgICBdO1xufVxudmFyIF96ZXJvWmVybyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5fcGFyc2VTcGVjID0gZnVuY3Rpb24gX3BhcnNlU3BlYyhzcGVjLCBwYXJlbnRDb250ZXh0LCBzaXplQ29udGV4dCkge1xuICAgIHZhciBpZDtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciB0cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbjtcbiAgICB2YXIgYWxpZ247XG4gICAgdmFyIHNpemU7XG4gICAgaWYgKHR5cGVvZiBzcGVjID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZCA9IHNwZWM7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBhbGlnbiA9IHBhcmVudENvbnRleHQuYWxpZ24gfHwgX3plcm9aZXJvO1xuICAgICAgICBpZiAocGFyZW50Q29udGV4dC5zaXplICYmIGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpIHtcbiAgICAgICAgICAgIHZhciBhbGlnbkFkanVzdCA9IFtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRDb250ZXh0LnNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgIGFsaWduWzFdICogcGFyZW50Q29udGV4dC5zaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoYWxpZ25BZGp1c3QsIHNpemVDb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXN1bHRbaWRdID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJlbnRDb250ZXh0Lm9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IHBhcmVudENvbnRleHQub3JpZ2luIHx8IF96ZXJvWmVybyxcbiAgICAgICAgICAgIGFsaWduOiBwYXJlbnRDb250ZXh0LmFsaWduIHx8IF96ZXJvWmVybyxcbiAgICAgICAgICAgIHNpemU6IHBhcmVudENvbnRleHQuc2l6ZVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIXNwZWMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoc3BlYyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcGFyc2VTcGVjKHNwZWNbaV0sIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHNwZWMudGFyZ2V0O1xuICAgICAgICB0cmFuc2Zvcm0gPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgb3BhY2l0eSA9IHBhcmVudENvbnRleHQub3BhY2l0eTtcbiAgICAgICAgb3JpZ2luID0gcGFyZW50Q29udGV4dC5vcmlnaW47XG4gICAgICAgIGFsaWduID0gcGFyZW50Q29udGV4dC5hbGlnbjtcbiAgICAgICAgc2l6ZSA9IHBhcmVudENvbnRleHQuc2l6ZTtcbiAgICAgICAgdmFyIG5leHRTaXplQ29udGV4dCA9IHNpemVDb250ZXh0O1xuICAgICAgICBpZiAoc3BlYy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5ICogc3BlYy5vcGFjaXR5O1xuICAgICAgICBpZiAoc3BlYy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubXVsdGlwbHkocGFyZW50Q29udGV4dC50cmFuc2Zvcm0sIHNwZWMudHJhbnNmb3JtKTtcbiAgICAgICAgaWYgKHNwZWMub3JpZ2luKSB7XG4gICAgICAgICAgICBvcmlnaW4gPSBzcGVjLm9yaWdpbjtcbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGVjLmFsaWduKVxuICAgICAgICAgICAgYWxpZ24gPSBzcGVjLmFsaWduO1xuICAgICAgICBpZiAoc3BlYy5zaXplIHx8IHNwZWMucHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRTaXplID0gc2l6ZTtcbiAgICAgICAgICAgIHNpemUgPSBbXG4gICAgICAgICAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgICAgICAgICBzaXplWzFdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHNwZWMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnNpemVbMF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHNwZWMuc2l6ZVswXTtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5zaXplWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSBzcGVjLnNpemVbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BlYy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zWzBdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSBzaXplWzBdICogc3BlYy5wcm9wb3J0aW9uc1swXTtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5wcm9wb3J0aW9uc1sxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzFdID0gc2l6ZVsxXSAqIHNwZWMucHJvcG9ydGlvbnNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyZW50U2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhbGlnbiAmJiAoYWxpZ25bMF0gfHwgYWxpZ25bMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0udGhlbk1vdmUodHJhbnNmb3JtLCBfdmVjSW5Db250ZXh0KFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduWzBdICogcGFyZW50U2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduWzFdICogcGFyZW50U2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXSwgc2l6ZUNvbnRleHQpKTtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luICYmIChvcmlnaW5bMF0gfHwgb3JpZ2luWzFdKSlcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC1vcmlnaW5bMF0gKiBzaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgLW9yaWdpblsxXSAqIHNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF0sIHRyYW5zZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0U2l6ZUNvbnRleHQgPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG9yaWdpbiA9IG51bGw7XG4gICAgICAgICAgICBhbGlnbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGFyc2VTcGVjKHRhcmdldCwge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgICAgICBhbGlnbjogYWxpZ24sXG4gICAgICAgICAgICBzaXplOiBzaXplXG4gICAgICAgIH0sIG5leHRTaXplQ29udGV4dCk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gU3BlY1BhcnNlcjsiLCJ2YXIgRWxlbWVudE91dHB1dCA9IHJlcXVpcmUoJy4vRWxlbWVudE91dHB1dCcpO1xuZnVuY3Rpb24gU3VyZmFjZShvcHRpb25zKSB7XG4gICAgRWxlbWVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xuICAgIHRoaXMuY29udGVudCA9ICcnO1xuICAgIHRoaXMuY2xhc3NMaXN0ID0gW107XG4gICAgdGhpcy5zaXplID0gbnVsbDtcbiAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB0aGlzLl9kaXJ0eUNsYXNzZXMgPSBbXTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xufVxuU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVsZW1lbnRPdXRwdXQucHJvdG90eXBlKTtcblN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3VyZmFjZTtcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2Rpdic7XG5TdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcykge1xuICAgIGZvciAodmFyIG4gaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAobiA9PT0gJ3N0eWxlJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCBzdHlsZXMgdmlhIFwic2V0QXR0cmlidXRlc1wiIGFzIGl0IHdpbGwgYnJlYWsgRmFtby51cy4gIFVzZSBcInNldFByb3BlcnRpZXNcIiBpbnN0ZWFkLicpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbbl0gPSBhdHRyaWJ1dGVzW25dO1xuICAgIH1cbiAgICB0aGlzLl9hdHRyaWJ1dGVzRGlydHkgPSB0cnVlO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNldFByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGZvciAodmFyIG4gaW4gcHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbbl0gPSBwcm9wZXJ0aWVzW25dO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHRoaXMuX2RpcnR5Q2xhc3Nlcy5wdXNoKHRoaXMuY2xhc3NMaXN0LnNwbGljZShpLCAxKVswXSk7XG4gICAgICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDbGFzc2VzID0gZnVuY3Rpb24gc2V0Q2xhc3NlcyhjbGFzc0xpc3QpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlbW92YWwgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNsYXNzTGlzdC5pbmRleE9mKHRoaXMuY2xhc3NMaXN0W2ldKSA8IDApXG4gICAgICAgICAgICByZW1vdmFsLnB1c2godGhpcy5jbGFzc0xpc3RbaV0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVtb3ZhbC5sZW5ndGg7IGkrKylcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhyZW1vdmFsW2ldKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTGlzdFtpXSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0Q2xhc3NMaXN0ID0gZnVuY3Rpb24gZ2V0Q2xhc3NMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdDtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuY29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gZ2V0Q29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5zaXplKVxuICAgICAgICB0aGlzLnNldFNpemUob3B0aW9ucy5zaXplKTtcbiAgICBpZiAob3B0aW9ucy5jbGFzc2VzKVxuICAgICAgICB0aGlzLnNldENsYXNzZXMob3B0aW9ucy5jbGFzc2VzKTtcbiAgICBpZiAob3B0aW9ucy5wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucy5wcm9wZXJ0aWVzKTtcbiAgICBpZiAob3B0aW9ucy5hdHRyaWJ1dGVzKVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMob3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgICBpZiAob3B0aW9ucy5jb250ZW50KVxuICAgICAgICB0aGlzLnNldENvbnRlbnQob3B0aW9ucy5jb250ZW50KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5mdW5jdGlvbiBfY2xlYW51cENsYXNzZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXJ0eUNsYXNzZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2RpcnR5Q2xhc3Nlc1tpXSk7XG4gICAgdGhpcy5fZGlydHlDbGFzc2VzID0gW107XG59XG5mdW5jdGlvbiBfYXBwbHlTdHlsZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlW25dID0gdGhpcy5wcm9wZXJ0aWVzW25dO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9jbGVhbnVwU3R5bGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZVtuXSA9ICcnO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9hcHBseUF0dHJpYnV0ZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShuLCB0aGlzLmF0dHJpYnV0ZXNbbl0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9jbGVhbnVwQXR0cmlidXRlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKG4pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF94eU5vdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSA6IGEgIT09IGI7XG59XG5TdXJmYWNlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uIHNldHVwKGFsbG9jYXRvcikge1xuICAgIHZhciB0YXJnZXQgPSBhbGxvY2F0b3IuYWxsb2NhdGUodGhpcy5lbGVtZW50VHlwZSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgdGhpcy5hdHRhY2godGFyZ2V0KTtcbiAgICB0aGlzLl9vcGFjaXR5ID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYXJnZXQpXG4gICAgICAgIHRoaXMuc2V0dXAoY29udGV4dC5hbGxvY2F0b3IpO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIGlmICh0aGlzLl9jbGFzc2VzRGlydHkpIHtcbiAgICAgICAgX2NsZWFudXBDbGFzc2VzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0W2ldKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc3R5bGVzRGlydHkpIHtcbiAgICAgICAgX2FwcGx5U3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fc3R5bGVzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9hdHRyaWJ1dGVzRGlydHkpIHtcbiAgICAgICAgX2FwcGx5QXR0cmlidXRlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICB2YXIgb3JpZ1NpemUgPSBjb250ZXh0LnNpemU7XG4gICAgICAgIHNpemUgPSBbXG4gICAgICAgICAgICB0aGlzLnNpemVbMF0sXG4gICAgICAgICAgICB0aGlzLnNpemVbMV1cbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHNpemVbMF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNpemVbMF0gPSBvcmlnU2l6ZVswXTtcbiAgICAgICAgaWYgKHNpemVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNpemVbMV0gPSBvcmlnU2l6ZVsxXTtcbiAgICAgICAgaWYgKHNpemVbMF0gPT09IHRydWUgfHwgc2l6ZVsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNpemVbMF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJ1ZVNpemVDaGVjayB8fCB0aGlzLl9zaXplWzBdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUgJiYgdGhpcy5fc2l6ZVswXSAhPT0gd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVbMF0gPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHdpZHRoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaXplKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHRoaXMuX3NpemVbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpemVbMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJ1ZVNpemVDaGVjayB8fCB0aGlzLl9zaXplWzFdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzFdICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVbMV0gPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplWzFdID0gdGhpcy5fc2l6ZVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKF94eU5vdEVxdWFscyh0aGlzLl9zaXplLCBzaXplKSkge1xuICAgICAgICBpZiAoIXRoaXMuX3NpemUpXG4gICAgICAgICAgICB0aGlzLl9zaXplID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX3NpemVbMV0gPSBzaXplWzFdO1xuICAgICAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUud2lkdGggPSB0aGlzLnNpemUgJiYgdGhpcy5zaXplWzBdID09PSB0cnVlID8gJycgOiB0aGlzLl9zaXplWzBdICsgJ3B4JztcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNpemUgJiYgdGhpcy5zaXplWzFdID09PSB0cnVlID8gJycgOiB0aGlzLl9zaXplWzFdICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZXNpemUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRlbnREaXJ0eSkge1xuICAgICAgICB0aGlzLmRlcGxveSh0YXJnZXQpO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdkZXBsb3knKTtcbiAgICAgICAgdGhpcy5fY29udGVudERpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBFbGVtZW50T3V0cHV0LnByb3RvdHlwZS5jb21taXQuY2FsbCh0aGlzLCBjb250ZXh0KTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cChhbGxvY2F0b3IpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2N1cnJlbnRUYXJnZXQ7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVjYWxsJyk7XG4gICAgdGhpcy5yZWNhbGwodGFyZ2V0KTtcbiAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9ICcnO1xuICAgIHRhcmdldC5zdHlsZS53aWR0aCA9ICcnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICBfY2xlYW51cFN0eWxlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgX2NsZWFudXBBdHRyaWJ1dGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5nZXRDbGFzc0xpc3QoKTtcbiAgICBfY2xlYW51cENsYXNzZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTGlzdFtpXSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50Q2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVsZW1lbnRDbGFzc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVsZW1lbnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZXRhY2godGFyZ2V0KTtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICBhbGxvY2F0b3IuZGVhbGxvY2F0ZSh0YXJnZXQpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpO1xuICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSlcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDaGlsZCh0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHZhciBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSlcbiAgICAgICAgZGYuYXBwZW5kQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgIHRoaXMuc2V0Q29udGVudChkZik7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUgPyB0aGlzLl9zaXplIDogdGhpcy5zaXplO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplID8gW1xuICAgICAgICBzaXplWzBdLFxuICAgICAgICBzaXplWzFdXG4gICAgXSA6IG51bGw7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFN1cmZhY2U7IiwidmFyIFRyYW5zZm9ybSA9IHt9O1xuVHJhbnNmb3JtLnByZWNpc2lvbiA9IDAuMDAwMDAxO1xuVHJhbnNmb3JtLmlkZW50aXR5ID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDFcbl07XG5UcmFuc2Zvcm0ubXVsdGlwbHk0eDQgPSBmdW5jdGlvbiBtdWx0aXBseTR4NChhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqIGJbMF0gKyBhWzRdICogYlsxXSArIGFbOF0gKiBiWzJdICsgYVsxMl0gKiBiWzNdLFxuICAgICAgICBhWzFdICogYlswXSArIGFbNV0gKiBiWzFdICsgYVs5XSAqIGJbMl0gKyBhWzEzXSAqIGJbM10sXG4gICAgICAgIGFbMl0gKiBiWzBdICsgYVs2XSAqIGJbMV0gKyBhWzEwXSAqIGJbMl0gKyBhWzE0XSAqIGJbM10sXG4gICAgICAgIGFbM10gKiBiWzBdICsgYVs3XSAqIGJbMV0gKyBhWzExXSAqIGJbMl0gKyBhWzE1XSAqIGJbM10sXG4gICAgICAgIGFbMF0gKiBiWzRdICsgYVs0XSAqIGJbNV0gKyBhWzhdICogYls2XSArIGFbMTJdICogYls3XSxcbiAgICAgICAgYVsxXSAqIGJbNF0gKyBhWzVdICogYls1XSArIGFbOV0gKiBiWzZdICsgYVsxM10gKiBiWzddLFxuICAgICAgICBhWzJdICogYls0XSArIGFbNl0gKiBiWzVdICsgYVsxMF0gKiBiWzZdICsgYVsxNF0gKiBiWzddLFxuICAgICAgICBhWzNdICogYls0XSArIGFbN10gKiBiWzVdICsgYVsxMV0gKiBiWzZdICsgYVsxNV0gKiBiWzddLFxuICAgICAgICBhWzBdICogYls4XSArIGFbNF0gKiBiWzldICsgYVs4XSAqIGJbMTBdICsgYVsxMl0gKiBiWzExXSxcbiAgICAgICAgYVsxXSAqIGJbOF0gKyBhWzVdICogYls5XSArIGFbOV0gKiBiWzEwXSArIGFbMTNdICogYlsxMV0sXG4gICAgICAgIGFbMl0gKiBiWzhdICsgYVs2XSAqIGJbOV0gKyBhWzEwXSAqIGJbMTBdICsgYVsxNF0gKiBiWzExXSxcbiAgICAgICAgYVszXSAqIGJbOF0gKyBhWzddICogYls5XSArIGFbMTFdICogYlsxMF0gKyBhWzE1XSAqIGJbMTFdLFxuICAgICAgICBhWzBdICogYlsxMl0gKyBhWzRdICogYlsxM10gKyBhWzhdICogYlsxNF0gKyBhWzEyXSAqIGJbMTVdLFxuICAgICAgICBhWzFdICogYlsxMl0gKyBhWzVdICogYlsxM10gKyBhWzldICogYlsxNF0gKyBhWzEzXSAqIGJbMTVdLFxuICAgICAgICBhWzJdICogYlsxMl0gKyBhWzZdICogYlsxM10gKyBhWzEwXSAqIGJbMTRdICsgYVsxNF0gKiBiWzE1XSxcbiAgICAgICAgYVszXSAqIGJbMTJdICsgYVs3XSAqIGJbMTNdICsgYVsxMV0gKiBiWzE0XSArIGFbMTVdICogYlsxNV1cbiAgICBdO1xufTtcblRyYW5zZm9ybS5tdWx0aXBseSA9IGZ1bmN0aW9uIG11bHRpcGx5KGEsIGIpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBhWzBdICogYlswXSArIGFbNF0gKiBiWzFdICsgYVs4XSAqIGJbMl0sXG4gICAgICAgIGFbMV0gKiBiWzBdICsgYVs1XSAqIGJbMV0gKyBhWzldICogYlsyXSxcbiAgICAgICAgYVsyXSAqIGJbMF0gKyBhWzZdICogYlsxXSArIGFbMTBdICogYlsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbNF0gKyBhWzRdICogYls1XSArIGFbOF0gKiBiWzZdLFxuICAgICAgICBhWzFdICogYls0XSArIGFbNV0gKiBiWzVdICsgYVs5XSAqIGJbNl0sXG4gICAgICAgIGFbMl0gKiBiWzRdICsgYVs2XSAqIGJbNV0gKyBhWzEwXSAqIGJbNl0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzhdICsgYVs0XSAqIGJbOV0gKyBhWzhdICogYlsxMF0sXG4gICAgICAgIGFbMV0gKiBiWzhdICsgYVs1XSAqIGJbOV0gKyBhWzldICogYlsxMF0sXG4gICAgICAgIGFbMl0gKiBiWzhdICsgYVs2XSAqIGJbOV0gKyBhWzEwXSAqIGJbMTBdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYlsxMl0gKyBhWzRdICogYlsxM10gKyBhWzhdICogYlsxNF0gKyBhWzEyXSxcbiAgICAgICAgYVsxXSAqIGJbMTJdICsgYVs1XSAqIGJbMTNdICsgYVs5XSAqIGJbMTRdICsgYVsxM10sXG4gICAgICAgIGFbMl0gKiBiWzEyXSArIGFbNl0gKiBiWzEzXSArIGFbMTBdICogYlsxNF0gKyBhWzE0XSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnRoZW5Nb3ZlID0gZnVuY3Rpb24gdGhlbk1vdmUobSwgdCkge1xuICAgIGlmICghdFsyXSlcbiAgICAgICAgdFsyXSA9IDA7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVswXSxcbiAgICAgICAgbVsxXSxcbiAgICAgICAgbVsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgbVs0XSxcbiAgICAgICAgbVs1XSxcbiAgICAgICAgbVs2XSxcbiAgICAgICAgMCxcbiAgICAgICAgbVs4XSxcbiAgICAgICAgbVs5XSxcbiAgICAgICAgbVsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bMTJdICsgdFswXSxcbiAgICAgICAgbVsxM10gKyB0WzFdLFxuICAgICAgICBtWzE0XSArIHRbMl0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5tb3ZlVGhlbiA9IGZ1bmN0aW9uIG1vdmVUaGVuKHYsIG0pIHtcbiAgICBpZiAoIXZbMl0pXG4gICAgICAgIHZbMl0gPSAwO1xuICAgIHZhciB0MCA9IHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XTtcbiAgICB2YXIgdDEgPSB2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV07XG4gICAgdmFyIHQyID0gdlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKG0sIFtcbiAgICAgICAgdDAsXG4gICAgICAgIHQxLFxuICAgICAgICB0MlxuICAgIF0pO1xufTtcblRyYW5zZm9ybS50cmFuc2xhdGUgPSBmdW5jdGlvbiB0cmFuc2xhdGUoeCwgeSwgeikge1xuICAgIGlmICh6ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHogPSAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHosXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS50aGVuU2NhbGUgPSBmdW5jdGlvbiB0aGVuU2NhbGUobSwgcykge1xuICAgIHJldHVybiBbXG4gICAgICAgIHNbMF0gKiBtWzBdLFxuICAgICAgICBzWzFdICogbVsxXSxcbiAgICAgICAgc1syXSAqIG1bMl0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzRdLFxuICAgICAgICBzWzFdICogbVs1XSxcbiAgICAgICAgc1syXSAqIG1bNl0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzhdLFxuICAgICAgICBzWzFdICogbVs5XSxcbiAgICAgICAgc1syXSAqIG1bMTBdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVsxMl0sXG4gICAgICAgIHNbMV0gKiBtWzEzXSxcbiAgICAgICAgc1syXSAqIG1bMTRdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2NhbGUgPSBmdW5jdGlvbiBzY2FsZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZClcbiAgICAgICAgeiA9IDE7XG4gICAgaWYgKHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgeSA9IHg7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgeCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgeSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgeixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVZID0gZnVuY3Rpb24gcm90YXRlWSh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVoodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZSA9IGZ1bmN0aW9uIHJvdGF0ZShwaGksIHRoZXRhLCBwc2kpIHtcbiAgICB2YXIgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICB2YXIgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NQc2kgPSBNYXRoLmNvcyhwc2kpO1xuICAgIHZhciBzaW5Qc2kgPSBNYXRoLnNpbihwc2kpO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICBjb3NUaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIGNvc1BoaSAqIHNpblBzaSArIHNpblBoaSAqIHNpblRoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgc2luUGhpICogc2luUHNpIC0gY29zUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgLWNvc1RoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgY29zUGhpICogY29zUHNpIC0gc2luUGhpICogc2luVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICBzaW5QaGkgKiBjb3NQc2kgKyBjb3NQaGkgKiBzaW5UaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgICAgIC1zaW5QaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgICAgIGNvc1BoaSAqIGNvc1RoZXRhLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5yb3RhdGVBeGlzID0gZnVuY3Rpb24gcm90YXRlQXhpcyh2LCB0aGV0YSkge1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHZlclRoZXRhID0gMSAtIGNvc1RoZXRhO1xuICAgIHZhciB4eFYgPSB2WzBdICogdlswXSAqIHZlclRoZXRhO1xuICAgIHZhciB4eVYgPSB2WzBdICogdlsxXSAqIHZlclRoZXRhO1xuICAgIHZhciB4elYgPSB2WzBdICogdlsyXSAqIHZlclRoZXRhO1xuICAgIHZhciB5eVYgPSB2WzFdICogdlsxXSAqIHZlclRoZXRhO1xuICAgIHZhciB5elYgPSB2WzFdICogdlsyXSAqIHZlclRoZXRhO1xuICAgIHZhciB6elYgPSB2WzJdICogdlsyXSAqIHZlclRoZXRhO1xuICAgIHZhciB4cyA9IHZbMF0gKiBzaW5UaGV0YTtcbiAgICB2YXIgeXMgPSB2WzFdICogc2luVGhldGE7XG4gICAgdmFyIHpzID0gdlsyXSAqIHNpblRoZXRhO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICB4eFYgKyBjb3NUaGV0YSxcbiAgICAgICAgICAgIHh5ViArIHpzLFxuICAgICAgICAgICAgeHpWIC0geXMsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeHlWIC0genMsXG4gICAgICAgICAgICB5eVYgKyBjb3NUaGV0YSxcbiAgICAgICAgICAgIHl6ViArIHhzLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHh6ViArIHlzLFxuICAgICAgICAgICAgeXpWIC0geHMsXG4gICAgICAgICAgICB6elYgKyBjb3NUaGV0YSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uYWJvdXRPcmlnaW4gPSBmdW5jdGlvbiBhYm91dE9yaWdpbih2LCBtKSB7XG4gICAgdmFyIHQwID0gdlswXSAtICh2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF0pO1xuICAgIHZhciB0MSA9IHZbMV0gLSAodlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldKTtcbiAgICB2YXIgdDIgPSB2WzJdIC0gKHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW1xuICAgICAgICB0MCxcbiAgICAgICAgdDEsXG4gICAgICAgIHQyXG4gICAgXSk7XG59O1xuVHJhbnNmb3JtLnNrZXcgPSBmdW5jdGlvbiBza2V3KHBoaSwgdGhldGEsIHBzaSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIE1hdGgudGFuKHRoZXRhKSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4ocHNpKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4ocGhpKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNrZXdYID0gZnVuY3Rpb24gc2tld1goYW5nbGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihhbmdsZSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5za2V3WSA9IGZ1bmN0aW9uIHNrZXdZKGFuZ2xlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC50YW4oYW5nbGUpLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBwZXJzcGVjdGl2ZShmb2N1c1opIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAtMSAvIGZvY3VzWixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLmdldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZShtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVsxMl0sXG4gICAgICAgIG1bMTNdLFxuICAgICAgICBtWzE0XVxuICAgIF07XG59O1xuVHJhbnNmb3JtLmludmVyc2UgPSBmdW5jdGlvbiBpbnZlcnNlKG0pIHtcbiAgICB2YXIgYzAgPSBtWzVdICogbVsxMF0gLSBtWzZdICogbVs5XTtcbiAgICB2YXIgYzEgPSBtWzRdICogbVsxMF0gLSBtWzZdICogbVs4XTtcbiAgICB2YXIgYzIgPSBtWzRdICogbVs5XSAtIG1bNV0gKiBtWzhdO1xuICAgIHZhciBjNCA9IG1bMV0gKiBtWzEwXSAtIG1bMl0gKiBtWzldO1xuICAgIHZhciBjNSA9IG1bMF0gKiBtWzEwXSAtIG1bMl0gKiBtWzhdO1xuICAgIHZhciBjNiA9IG1bMF0gKiBtWzldIC0gbVsxXSAqIG1bOF07XG4gICAgdmFyIGM4ID0gbVsxXSAqIG1bNl0gLSBtWzJdICogbVs1XTtcbiAgICB2YXIgYzkgPSBtWzBdICogbVs2XSAtIG1bMl0gKiBtWzRdO1xuICAgIHZhciBjMTAgPSBtWzBdICogbVs1XSAtIG1bMV0gKiBtWzRdO1xuICAgIHZhciBkZXRNID0gbVswXSAqIGMwIC0gbVsxXSAqIGMxICsgbVsyXSAqIGMyO1xuICAgIHZhciBpbnZEID0gMSAvIGRldE07XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIGludkQgKiBjMCxcbiAgICAgICAgICAgIC1pbnZEICogYzQsXG4gICAgICAgICAgICBpbnZEICogYzgsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgLWludkQgKiBjMSxcbiAgICAgICAgICAgIGludkQgKiBjNSxcbiAgICAgICAgICAgIC1pbnZEICogYzksXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgaW52RCAqIGMyLFxuICAgICAgICAgICAgLWludkQgKiBjNixcbiAgICAgICAgICAgIGludkQgKiBjMTAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJlc3VsdFsxMl0gPSAtbVsxMl0gKiByZXN1bHRbMF0gLSBtWzEzXSAqIHJlc3VsdFs0XSAtIG1bMTRdICogcmVzdWx0WzhdO1xuICAgIHJlc3VsdFsxM10gPSAtbVsxMl0gKiByZXN1bHRbMV0gLSBtWzEzXSAqIHJlc3VsdFs1XSAtIG1bMTRdICogcmVzdWx0WzldO1xuICAgIHJlc3VsdFsxNF0gPSAtbVsxMl0gKiByZXN1bHRbMl0gLSBtWzEzXSAqIHJlc3VsdFs2XSAtIG1bMTRdICogcmVzdWx0WzEwXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS50cmFuc3Bvc2UgPSBmdW5jdGlvbiB0cmFuc3Bvc2UobSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMF0sXG4gICAgICAgIG1bNF0sXG4gICAgICAgIG1bOF0sXG4gICAgICAgIG1bMTJdLFxuICAgICAgICBtWzFdLFxuICAgICAgICBtWzVdLFxuICAgICAgICBtWzldLFxuICAgICAgICBtWzEzXSxcbiAgICAgICAgbVsyXSxcbiAgICAgICAgbVs2XSxcbiAgICAgICAgbVsxMF0sXG4gICAgICAgIG1bMTRdLFxuICAgICAgICBtWzNdLFxuICAgICAgICBtWzddLFxuICAgICAgICBtWzExXSxcbiAgICAgICAgbVsxNV1cbiAgICBdO1xufTtcbmZ1bmN0aW9uIF9ub3JtU3F1YXJlZCh2KSB7XG4gICAgcmV0dXJuIHYubGVuZ3RoID09PSAyID8gdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSA6IHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gKyB2WzJdICogdlsyXTtcbn1cbmZ1bmN0aW9uIF9ub3JtKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KF9ub3JtU3F1YXJlZCh2KSk7XG59XG5mdW5jdGlvbiBfc2lnbihuKSB7XG4gICAgcmV0dXJuIG4gPCAwID8gLTEgOiAxO1xufVxuVHJhbnNmb3JtLmludGVycHJldCA9IGZ1bmN0aW9uIGludGVycHJldChNKSB7XG4gICAgdmFyIHggPSBbXG4gICAgICAgICAgICBNWzBdLFxuICAgICAgICAgICAgTVsxXSxcbiAgICAgICAgICAgIE1bMl1cbiAgICAgICAgXTtcbiAgICB2YXIgc2duID0gX3NpZ24oeFswXSk7XG4gICAgdmFyIHhOb3JtID0gX25vcm0oeCk7XG4gICAgdmFyIHYgPSBbXG4gICAgICAgICAgICB4WzBdICsgc2duICogeE5vcm0sXG4gICAgICAgICAgICB4WzFdLFxuICAgICAgICAgICAgeFsyXVxuICAgICAgICBdO1xuICAgIHZhciBtdWx0ID0gMiAvIF9ub3JtU3F1YXJlZCh2KTtcbiAgICBpZiAobXVsdCA+PSBJbmZpbml0eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJhbnNsYXRlOiBUcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlKE0pLFxuICAgICAgICAgICAgcm90YXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2FsZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2tldzogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuICAgIHZhciBRMSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICBRMVswXSA9IDEgLSBtdWx0ICogdlswXSAqIHZbMF07XG4gICAgUTFbNV0gPSAxIC0gbXVsdCAqIHZbMV0gKiB2WzFdO1xuICAgIFExWzEwXSA9IDEgLSBtdWx0ICogdlsyXSAqIHZbMl07XG4gICAgUTFbMV0gPSAtbXVsdCAqIHZbMF0gKiB2WzFdO1xuICAgIFExWzJdID0gLW11bHQgKiB2WzBdICogdlsyXTtcbiAgICBRMVs2XSA9IC1tdWx0ICogdlsxXSAqIHZbMl07XG4gICAgUTFbNF0gPSBRMVsxXTtcbiAgICBRMVs4XSA9IFExWzJdO1xuICAgIFExWzldID0gUTFbNl07XG4gICAgdmFyIE1RMSA9IFRyYW5zZm9ybS5tdWx0aXBseShRMSwgTSk7XG4gICAgdmFyIHgyID0gW1xuICAgICAgICAgICAgTVExWzVdLFxuICAgICAgICAgICAgTVExWzZdXG4gICAgICAgIF07XG4gICAgdmFyIHNnbjIgPSBfc2lnbih4MlswXSk7XG4gICAgdmFyIHgyTm9ybSA9IF9ub3JtKHgyKTtcbiAgICB2YXIgdjIgPSBbXG4gICAgICAgICAgICB4MlswXSArIHNnbjIgKiB4Mk5vcm0sXG4gICAgICAgICAgICB4MlsxXVxuICAgICAgICBdO1xuICAgIHZhciBtdWx0MiA9IDIgLyBfbm9ybVNxdWFyZWQodjIpO1xuICAgIHZhciBRMiA9IFtcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICBRMls1XSA9IDEgLSBtdWx0MiAqIHYyWzBdICogdjJbMF07XG4gICAgUTJbMTBdID0gMSAtIG11bHQyICogdjJbMV0gKiB2MlsxXTtcbiAgICBRMls2XSA9IC1tdWx0MiAqIHYyWzBdICogdjJbMV07XG4gICAgUTJbOV0gPSBRMls2XTtcbiAgICB2YXIgUSA9IFRyYW5zZm9ybS5tdWx0aXBseShRMiwgUTEpO1xuICAgIHZhciBSID0gVHJhbnNmb3JtLm11bHRpcGx5KFEsIE0pO1xuICAgIHZhciByZW1vdmVyID0gVHJhbnNmb3JtLnNjYWxlKFJbMF0gPCAwID8gLTEgOiAxLCBSWzVdIDwgMCA/IC0xIDogMSwgUlsxMF0gPCAwID8gLTEgOiAxKTtcbiAgICBSID0gVHJhbnNmb3JtLm11bHRpcGx5KFIsIHJlbW92ZXIpO1xuICAgIFEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkocmVtb3ZlciwgUSk7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC50cmFuc2xhdGUgPSBUcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlKE0pO1xuICAgIHJlc3VsdC5yb3RhdGUgPSBbXG4gICAgICAgIE1hdGguYXRhbjIoLVFbNl0sIFFbMTBdKSxcbiAgICAgICAgTWF0aC5hc2luKFFbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKC1RWzFdLCBRWzBdKVxuICAgIF07XG4gICAgaWYgKCFyZXN1bHQucm90YXRlWzBdKSB7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gPSAwO1xuICAgICAgICByZXN1bHQucm90YXRlWzJdID0gTWF0aC5hdGFuMihRWzRdLCBRWzVdKTtcbiAgICB9XG4gICAgcmVzdWx0LnNjYWxlID0gW1xuICAgICAgICBSWzBdLFxuICAgICAgICBSWzVdLFxuICAgICAgICBSWzEwXVxuICAgIF07XG4gICAgcmVzdWx0LnNrZXcgPSBbXG4gICAgICAgIE1hdGguYXRhbjIoUls5XSwgcmVzdWx0LnNjYWxlWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMihSWzhdLCByZXN1bHQuc2NhbGVbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKFJbNF0sIHJlc3VsdC5zY2FsZVswXSlcbiAgICBdO1xuICAgIGlmIChNYXRoLmFicyhyZXN1bHQucm90YXRlWzBdKSArIE1hdGguYWJzKHJlc3VsdC5yb3RhdGVbMl0pID4gMS41ICogTWF0aC5QSSkge1xuICAgICAgICByZXN1bHQucm90YXRlWzFdID0gTWF0aC5QSSAtIHJlc3VsdC5yb3RhdGVbMV07XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzFdID4gTWF0aC5QSSlcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzFdIDwgLU1hdGguUEkpXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzFdICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVswXSA8IDApXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzBdICs9IE1hdGguUEk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gLT0gTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMl0gPCAwKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmF2ZXJhZ2UgPSBmdW5jdGlvbiBhdmVyYWdlKE0xLCBNMiwgdCkge1xuICAgIHQgPSB0ID09PSB1bmRlZmluZWQgPyAwLjUgOiB0O1xuICAgIHZhciBzcGVjTTEgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KE0xKTtcbiAgICB2YXIgc3BlY00yID0gVHJhbnNmb3JtLmludGVycHJldChNMik7XG4gICAgdmFyIHNwZWNBdmcgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNrZXc6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHNwZWNBdmcudHJhbnNsYXRlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS50cmFuc2xhdGVbaV0gKyB0ICogc3BlY00yLnRyYW5zbGF0ZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5yb3RhdGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnJvdGF0ZVtpXSArIHQgKiBzcGVjTTIucm90YXRlW2ldO1xuICAgICAgICBzcGVjQXZnLnNjYWxlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS5zY2FsZVtpXSArIHQgKiBzcGVjTTIuc2NhbGVbaV07XG4gICAgICAgIHNwZWNBdmcuc2tld1tpXSA9ICgxIC0gdCkgKiBzcGVjTTEuc2tld1tpXSArIHQgKiBzcGVjTTIuc2tld1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIFRyYW5zZm9ybS5idWlsZChzcGVjQXZnKTtcbn07XG5UcmFuc2Zvcm0uYnVpbGQgPSBmdW5jdGlvbiBidWlsZChzcGVjKSB7XG4gICAgdmFyIHNjYWxlTWF0cml4ID0gVHJhbnNmb3JtLnNjYWxlKHNwZWMuc2NhbGVbMF0sIHNwZWMuc2NhbGVbMV0sIHNwZWMuc2NhbGVbMl0pO1xuICAgIHZhciBza2V3TWF0cml4ID0gVHJhbnNmb3JtLnNrZXcoc3BlYy5za2V3WzBdLCBzcGVjLnNrZXdbMV0sIHNwZWMuc2tld1syXSk7XG4gICAgdmFyIHJvdGF0ZU1hdHJpeCA9IFRyYW5zZm9ybS5yb3RhdGUoc3BlYy5yb3RhdGVbMF0sIHNwZWMucm90YXRlWzFdLCBzcGVjLnJvdGF0ZVsyXSk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShUcmFuc2Zvcm0ubXVsdGlwbHkoVHJhbnNmb3JtLm11bHRpcGx5KHJvdGF0ZU1hdHJpeCwgc2tld01hdHJpeCksIHNjYWxlTWF0cml4KSwgc3BlYy50cmFuc2xhdGUpO1xufTtcblRyYW5zZm9ybS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICAgIHJldHVybiAhVHJhbnNmb3JtLm5vdEVxdWFscyhhLCBiKTtcbn07XG5UcmFuc2Zvcm0ubm90RXF1YWxzID0gZnVuY3Rpb24gbm90RXF1YWxzKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhKGEgJiYgYikgfHwgYVsxMl0gIT09IGJbMTJdIHx8IGFbMTNdICE9PSBiWzEzXSB8fCBhWzE0XSAhPT0gYlsxNF0gfHwgYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIHx8IGFbMl0gIT09IGJbMl0gfHwgYVs0XSAhPT0gYls0XSB8fCBhWzVdICE9PSBiWzVdIHx8IGFbNl0gIT09IGJbNl0gfHwgYVs4XSAhPT0gYls4XSB8fCBhWzldICE9PSBiWzldIHx8IGFbMTBdICE9PSBiWzEwXTtcbn07XG5UcmFuc2Zvcm0ubm9ybWFsaXplUm90YXRpb24gPSBmdW5jdGlvbiBub3JtYWxpemVSb3RhdGlvbihyb3RhdGlvbikge1xuICAgIHZhciByZXN1bHQgPSByb3RhdGlvbi5zbGljZSgwKTtcbiAgICBpZiAocmVzdWx0WzBdID09PSBNYXRoLlBJICogMC41IHx8IHJlc3VsdFswXSA9PT0gLU1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gLXJlc3VsdFswXTtcbiAgICAgICAgcmVzdWx0WzFdID0gTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChyZXN1bHRbMF0gPiBNYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IHJlc3VsdFswXSAtIE1hdGguUEk7XG4gICAgICAgIHJlc3VsdFsxXSA9IE1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICBpZiAocmVzdWx0WzBdIDwgLU1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gcmVzdWx0WzBdICsgTWF0aC5QSTtcbiAgICAgICAgcmVzdWx0WzFdID0gLU1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICB3aGlsZSAocmVzdWx0WzFdIDwgLU1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsxXSArPSAyICogTWF0aC5QSTtcbiAgICB3aGlsZSAocmVzdWx0WzFdID49IE1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsxXSAtPSAyICogTWF0aC5QSTtcbiAgICB3aGlsZSAocmVzdWx0WzJdIDwgLU1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsyXSArPSAyICogTWF0aC5QSTtcbiAgICB3aGlsZSAocmVzdWx0WzJdID49IE1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsyXSAtPSAyICogTWF0aC5QSTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5pbkZyb250ID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLjAwMSxcbiAgICAxXG5dO1xuVHJhbnNmb3JtLmJlaGluZCA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgLTAuMDAxLFxuICAgIDFcbl07XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zZm9ybTsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJy4vT3B0aW9uc01hbmFnZXInKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi9SZW5kZXJOb2RlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBWaWV3KG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMub3B0aW9ucyA9IFV0aWxpdHkuY2xvbmUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMgfHwgVmlldy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cblZpZXcuREVGQVVMVF9PUFRJT05TID0ge307XG5WaWV3LnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuZ2V0T3B0aW9ucyhrZXkpO1xufTtcblZpZXcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlci5wYXRjaChvcHRpb25zKTtcbn07XG5WaWV3LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUuYWRkLmFwcGx5KHRoaXMuX25vZGUsIGFyZ3VtZW50cyk7XG59O1xuVmlldy5wcm90b3R5cGUuX2FkZCA9IFZpZXcucHJvdG90eXBlLmFkZDtcblZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5yZW5kZXIoKTtcbn07XG5WaWV3LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICBpZiAodGhpcy5fbm9kZSAmJiB0aGlzLl9ub2RlLmdldFNpemUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUuZ2V0U2l6ZS5hcHBseSh0aGlzLl9ub2RlLCBhcmd1bWVudHMpIHx8IHRoaXMub3B0aW9ucy5zaXplO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpemU7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWaWV3OyIsInZhciBjc3MgPSBcIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXFxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cXG4gKlxcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcXG4gKiBAbGljZW5zZSBNUEwgMi4wXFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XFxuICovXFxuXFxuLmZhbW91cy1yb290IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgb3BhY2l0eTogLjk5OTk5OTsgLyogaW9zOCBob3RmaXggKi9cXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbn1cXG5cXG4uZmFtb3VzLWNvbnRhaW5lciwgLmZhbW91cy1ncm91cCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwcHg7XFxuICAgIGxlZnQ6IDBweDtcXG4gICAgYm90dG9tOiAwcHg7XFxuICAgIHJpZ2h0OiAwcHg7XFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5mYW1vdXMtZ3JvdXAge1xcbiAgICB3aWR0aDogMHB4O1xcbiAgICBoZWlnaHQ6IDBweDtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIHBhZGRpbmc6IDBweDtcXG59XFxuXFxuLmZhbW91cy1zdXJmYWNlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XFxuICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4uZmFtb3VzLWNvbnRhaW5lci1ncm91cCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCI7IChyZXF1aXJlKFwiL1VzZXJzL2Jlbmh1bGFuL0RldmVsb3Blci9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2Nzc2lmeVwiKSkoY3NzKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIEltYWdlU3VyZmFjZShvcHRpb25zKSB7XG4gICAgdGhpcy5faW1hZ2VVcmwgPSB1bmRlZmluZWQ7XG4gICAgU3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxudmFyIHVybENhY2hlID0gW107XG52YXIgY291bnRDYWNoZSA9IFtdO1xudmFyIG5vZGVDYWNoZSA9IFtdO1xudmFyIGNhY2hlRW5hYmxlZCA9IHRydWU7XG5JbWFnZVN1cmZhY2UuZW5hYmxlQ2FjaGUgPSBmdW5jdGlvbiBlbmFibGVDYWNoZSgpIHtcbiAgICBjYWNoZUVuYWJsZWQgPSB0cnVlO1xufTtcbkltYWdlU3VyZmFjZS5kaXNhYmxlQ2FjaGUgPSBmdW5jdGlvbiBkaXNhYmxlQ2FjaGUoKSB7XG4gICAgY2FjaGVFbmFibGVkID0gZmFsc2U7XG59O1xuSW1hZ2VTdXJmYWNlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHVybENhY2hlID0gW107XG4gICAgY291bnRDYWNoZSA9IFtdO1xuICAgIG5vZGVDYWNoZSA9IFtdO1xufTtcbkltYWdlU3VyZmFjZS5nZXRDYWNoZSA9IGZ1bmN0aW9uIGdldENhY2hlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVybENhY2hlOiB1cmxDYWNoZSxcbiAgICAgICAgY291bnRDYWNoZTogY291bnRDYWNoZSxcbiAgICAgICAgbm9kZUNhY2hlOiBjb3VudENhY2hlXG4gICAgfTtcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW1hZ2VTdXJmYWNlO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdpbWcnO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChpbWFnZVVybCkge1xuICAgIHZhciB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YodGhpcy5faW1hZ2VVcmwpO1xuICAgIGlmICh1cmxJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaWYgKGNvdW50Q2FjaGVbdXJsSW5kZXhdID09PSAxKSB7XG4gICAgICAgICAgICB1cmxDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICAgICAgY291bnRDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICAgICAgbm9kZUNhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudENhY2hlW3VybEluZGV4XS0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZihpbWFnZVVybCk7XG4gICAgaWYgKHVybEluZGV4ID09PSAtMSkge1xuICAgICAgICB1cmxDYWNoZS5wdXNoKGltYWdlVXJsKTtcbiAgICAgICAgY291bnRDYWNoZS5wdXNoKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50Q2FjaGVbdXJsSW5kZXhdKys7XG4gICAgfVxuICAgIHRoaXMuX2ltYWdlVXJsID0gaW1hZ2VVcmw7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB2YXIgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKHRoaXMuX2ltYWdlVXJsKTtcbiAgICBpZiAobm9kZUNhY2hlW3VybEluZGV4XSA9PT0gdW5kZWZpbmVkICYmIGNhY2hlRW5hYmxlZCkge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSB0aGlzLl9pbWFnZVVybCB8fCAnJztcbiAgICAgICAgbm9kZUNhY2hlW3VybEluZGV4XSA9IGltZztcbiAgICB9XG4gICAgdGFyZ2V0LnNyYyA9IHRoaXMuX2ltYWdlVXJsIHx8ICcnO1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHRhcmdldC5zcmMgPSAnJztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlU3VyZmFjZTsiLCJ2YXIgRWFzaW5nID0ge1xuICAgICAgICBpblF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLSh0IC09IDEpICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhZDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgtLXQgKiAodCAtIDIpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluQ3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRDdWJpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdDtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0oLS10ICogdCAqIHQgKiB0IC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1aW50OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCAqIHQgKiB0ICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblNpbmU6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0ICogKE1hdGguUEkgLyAyKSkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBvdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluRXhwbzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgICAgIH0sXG4gICAgICAgIG91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdCkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0ID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpbkNpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRDaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5FbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA9PT0gMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zICogMS41O1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIGlmICh0IDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIDAuNSArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluQmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0QmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gLS10ICogdCAqICgocyArIDEpICogdCArIHMpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRCYWNrOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSk7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5Cb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5vdXRCb3VuY2UoMSAtIHQpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA8IDEgLyAyLjc1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHQgKiB0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgMC43NTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQgPCAwLjUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5pbkJvdW5jZSh0ICogMikgKiAwLjU7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLm91dEJvdW5jZSh0ICogMiAtIDEpICogMC41ICsgMC41O1xuICAgICAgICB9XG4gICAgfTtcbm1vZHVsZS5leHBvcnRzID0gRWFzaW5nOyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpIHtcbiAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB0aGlzLl9pbnN0YW5jZXMgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gW107XG59XG5NdWx0aXBsZVRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zdGF0ZVtpXSA9IHRoaXMuX2luc3RhbmNlc1tpXS5nZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIF9hbGxDYWxsYmFjayA9IFV0aWxpdHkuYWZ0ZXIoZW5kU3RhdGUubGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmRTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlc1tpXSlcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyB0aGlzLm1ldGhvZCgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0uc2V0KGVuZFN0YXRlW2ldLCB0cmFuc2l0aW9uLCBfYWxsQ2FsbGJhY2spO1xuICAgIH1cbn07XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlc1tpXSlcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyB0aGlzLm1ldGhvZCgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0ucmVzZXQoc3RhcnRTdGF0ZVtpXSk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVUcmFuc2l0aW9uOyIsInZhciBNdWx0aXBsZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL011bHRpcGxlVHJhbnNpdGlvbicpO1xudmFyIFR3ZWVuVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vVHdlZW5UcmFuc2l0aW9uJyk7XG5mdW5jdGlvbiBUcmFuc2l0aW9uYWJsZShzdGFydCkge1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuICAgIHRoaXMuc2V0KHN0YXJ0KTtcbn1cbnZhciB0cmFuc2l0aW9uTWV0aG9kcyA9IHt9O1xuVHJhbnNpdGlvbmFibGUucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihtZXRob2RzKSB7XG4gICAgdmFyIHN1Y2Nlc3MgPSB0cnVlO1xuICAgIGZvciAodmFyIG1ldGhvZCBpbiBtZXRob2RzKSB7XG4gICAgICAgIGlmICghVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QobWV0aG9kLCBtZXRob2RzW21ldGhvZF0pKVxuICAgICAgICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc3VjY2Vzcztcbn07XG5UcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZCA9IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kKG5hbWUsIGVuZ2luZUNsYXNzKSB7XG4gICAgaWYgKCEobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykpIHtcbiAgICAgICAgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV0gPSBlbmdpbmVDbGFzcztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5UcmFuc2l0aW9uYWJsZS51bnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gdW5yZWdpc3Rlck1ldGhvZChuYW1lKSB7XG4gICAgaWYgKG5hbWUgaW4gdHJhbnNpdGlvbk1ldGhvZHMpIHtcbiAgICAgICAgZGVsZXRlIHRyYW5zaXRpb25NZXRob2RzW25hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcbmZ1bmN0aW9uIF9sb2FkTmV4dCgpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSB0aGlzLmFjdGlvblF1ZXVlLnNoaWZ0KCk7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrUXVldWUuc2hpZnQoKTtcbiAgICB2YXIgbWV0aG9kID0gbnVsbDtcbiAgICB2YXIgZW5kVmFsdWUgPSB0aGlzLmN1cnJlbnRBY3Rpb25bMF07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLmN1cnJlbnRBY3Rpb25bMV07XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBPYmplY3QgJiYgdHJhbnNpdGlvbi5tZXRob2QpIHtcbiAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbi5tZXRob2Q7XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIG1ldGhvZCA9IHRyYW5zaXRpb25NZXRob2RzW21ldGhvZF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWV0aG9kID0gVHdlZW5UcmFuc2l0aW9uO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY3VycmVudE1ldGhvZCAhPT0gbWV0aG9kKSB7XG4gICAgICAgIGlmICghKGVuZFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBtZXRob2QuU1VQUE9SVFNfTVVMVElQTEUgPT09IHRydWUgfHwgZW5kVmFsdWUubGVuZ3RoIDw9IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSkge1xuICAgICAgICAgICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBuZXcgbWV0aG9kKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbWV0aG9kO1xuICAgIH1cbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZS5yZXNldCh0aGlzLnN0YXRlLCB0aGlzLnZlbG9jaXR5KTtcbiAgICBpZiAodGhpcy52ZWxvY2l0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0cmFuc2l0aW9uLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZS5zZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIF9sb2FkTmV4dC5iaW5kKHRoaXMpKTtcbn1cblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kU3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIGFjdGlvbiA9IFtcbiAgICAgICAgICAgIGVuZFN0YXRlLFxuICAgICAgICAgICAgdHJhbnNpdGlvblxuICAgICAgICBdO1xuICAgIHRoaXMuYWN0aW9uUXVldWUucHVzaChhY3Rpb24pO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoIXRoaXMuY3VycmVudEFjdGlvbilcbiAgICAgICAgX2xvYWROZXh0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlID0gc3RhcnRTdGF0ZTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gc3RhcnRWZWxvY2l0eTtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiBkZWxheShkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpLCB7XG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgY3VydmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSwgY2FsbGJhY2spO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQodGltZXN0YW1wKSB7XG4gICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXRWZWxvY2l0eSlcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXRWZWxvY2l0eSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0KHRpbWVzdGFtcCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudEFjdGlvbjtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGU7IiwidmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICB0aGlzLl9maW5hbCA9IFRyYW5zZm9ybS5pZGVudGl0eS5zbGljZSgpO1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9maW5hbFJvdGF0ZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9maW5hbFNjYWxlID0gW1xuICAgICAgICAxLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgXTtcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFRyYW5zbGF0ZSk7XG4gICAgdGhpcy5yb3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxSb3RhdGUpO1xuICAgIHRoaXMuc2tldyA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFNrZXcpO1xuICAgIHRoaXMuc2NhbGUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxTY2FsZSk7XG4gICAgaWYgKHRyYW5zZm9ybSlcbiAgICAgICAgdGhpcy5zZXQodHJhbnNmb3JtKTtcbn1cbmZ1bmN0aW9uIF9idWlsZCgpIHtcbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHtcbiAgICAgICAgdHJhbnNsYXRlOiB0aGlzLnRyYW5zbGF0ZS5nZXQoKSxcbiAgICAgICAgcm90YXRlOiB0aGlzLnJvdGF0ZS5nZXQoKSxcbiAgICAgICAgc2tldzogdGhpcy5za2V3LmdldCgpLFxuICAgICAgICBzY2FsZTogdGhpcy5zY2FsZS5nZXQoKVxuICAgIH0pO1xufVxuZnVuY3Rpb24gX2J1aWxkRmluYWwoKSB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS5idWlsZCh7XG4gICAgICAgIHRyYW5zbGF0ZTogdGhpcy5fZmluYWxUcmFuc2xhdGUsXG4gICAgICAgIHJvdGF0ZTogdGhpcy5fZmluYWxSb3RhdGUsXG4gICAgICAgIHNrZXc6IHRoaXMuX2ZpbmFsU2tldyxcbiAgICAgICAgc2NhbGU6IHRoaXMuX2ZpbmFsU2NhbGVcbiAgICB9KTtcbn1cblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiBzZXRUcmFuc2xhdGUodHJhbnNsYXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gdHJhbnNsYXRlO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXQodHJhbnNsYXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFNjYWxlID0gZnVuY3Rpb24gc2V0U2NhbGUoc2NhbGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnNjYWxlLnNldChzY2FsZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRSb3RhdGUgPSBmdW5jdGlvbiBzZXRSb3RhdGUoZXVsZXJBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBldWxlckFuZ2xlcztcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy5yb3RhdGUuc2V0KGV1bGVyQW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFNrZXcgPSBmdW5jdGlvbiBzZXRTa2V3KHNrZXdBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gc2tld0FuZ2xlcztcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy5za2V3LnNldChza2V3QW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbXBvbmVudHMgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KHRyYW5zZm9ybSk7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSBjb21wb25lbnRzLnRyYW5zbGF0ZTtcbiAgICB0aGlzLl9maW5hbFJvdGF0ZSA9IGNvbXBvbmVudHMucm90YXRlO1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IGNvbXBvbmVudHMuc2tldztcbiAgICB0aGlzLl9maW5hbFNjYWxlID0gY29tcG9uZW50cy5zY2FsZTtcbiAgICB0aGlzLl9maW5hbCA9IHRyYW5zZm9ybTtcbiAgICB2YXIgX2NhbGxiYWNrID0gY2FsbGJhY2sgPyBVdGlsaXR5LmFmdGVyKDQsIGNhbGxiYWNrKSA6IG51bGw7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0KGNvbXBvbmVudHMudHJhbnNsYXRlLCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMucm90YXRlLnNldChjb21wb25lbnRzLnJvdGF0ZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICB0aGlzLnNrZXcuc2V0KGNvbXBvbmVudHMuc2tldywgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICB0aGlzLnNjYWxlLnNldChjb21wb25lbnRzLnNjYWxlLCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXREZWZhdWx0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIHNldERlZmF1bHRUcmFuc2l0aW9uKHRyYW5zaXRpb24pIHtcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMucm90YXRlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG4gICAgdGhpcy5za2V3LnNldERlZmF1bHQodHJhbnNpdGlvbik7XG4gICAgdGhpcy5zY2FsZS5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICByZXR1cm4gX2J1aWxkLmNhbGwodGhpcyk7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLl9maW5hbDtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0RmluYWwgPSBmdW5jdGlvbiBnZXRGaW5hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmluYWw7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmlzQWN0aXZlKCkgfHwgdGhpcy5yb3RhdGUuaXNBY3RpdmUoKSB8fCB0aGlzLnNjYWxlLmlzQWN0aXZlKCkgfHwgdGhpcy5za2V3LmlzQWN0aXZlKCk7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMudHJhbnNsYXRlLmhhbHQoKTtcbiAgICB0aGlzLnJvdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5za2V3LmhhbHQoKTtcbiAgICB0aGlzLnNjYWxlLmhhbHQoKTtcbiAgICB0aGlzLl9maW5hbCA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSB0aGlzLnRyYW5zbGF0ZS5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFJvdGF0ZSA9IHRoaXMucm90YXRlLmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IHRoaXMuc2tldy5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFNjYWxlID0gdGhpcy5zY2FsZS5nZXQoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtOyIsImZ1bmN0aW9uIFR3ZWVuVHJhbnNpdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShUd2VlblRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IDA7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSAwO1xuICAgIHRoaXMuX2N1cnZlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdW5kZWZpbmVkO1xufVxuVHdlZW5UcmFuc2l0aW9uLkN1cnZlcyA9IHtcbiAgICBsaW5lYXI6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgIH0sXG4gICAgZWFzZUluOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgfSxcbiAgICBlYXNlT3V0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgyIC0gdCk7XG4gICAgfSxcbiAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0IDw9IDAuNSlcbiAgICAgICAgICAgIHJldHVybiAyICogdCAqIHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAtMiAqIHQgKiB0ICsgNCAqIHQgLSAxO1xuICAgIH0sXG4gICAgZWFzZU91dEJvdW5jZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiAoMyAtIDIgKiB0KTtcbiAgICB9LFxuICAgIHNwcmluZzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuICgxIC0gdCkgKiBNYXRoLnNpbig2ICogTWF0aC5QSSAqIHQpICsgdDtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcblR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY3VydmU6IFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyLFxuICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgc3BlZWQ6IDBcbn07XG52YXIgcmVnaXN0ZXJlZEN1cnZlcyA9IHt9O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiByZWdpc3RlckN1cnZlKGN1cnZlTmFtZSwgY3VydmUpIHtcbiAgICBpZiAoIXJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0gPSBjdXJ2ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24udW5yZWdpc3RlckN1cnZlID0gZnVuY3Rpb24gdW5yZWdpc3RlckN1cnZlKGN1cnZlTmFtZSkge1xuICAgIGlmIChyZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0pIHtcbiAgICAgICAgZGVsZXRlIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uZ2V0Q3VydmUgPSBmdW5jdGlvbiBnZXRDdXJ2ZShjdXJ2ZU5hbWUpIHtcbiAgICB2YXIgY3VydmUgPSByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV07XG4gICAgaWYgKGN1cnZlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBjdXJ2ZTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY3VydmUgbm90IHJlZ2lzdGVyZWQnKTtcbn07XG5Ud2VlblRyYW5zaXRpb24uZ2V0Q3VydmVzID0gZnVuY3Rpb24gZ2V0Q3VydmVzKCkge1xuICAgIHJldHVybiByZWdpc3RlcmVkQ3VydmVzO1xufTtcbmZ1bmN0aW9uIF9pbnRlcnBvbGF0ZShhLCBiLCB0KSB7XG4gICAgcmV0dXJuICgxIC0gdCkgKiBhICsgdCAqIGI7XG59XG5mdW5jdGlvbiBfY2xvbmUob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gb2JqLnNsaWNlKDApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShvYmopO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gb2JqO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZSh0cmFuc2l0aW9uLCBkZWZhdWx0VHJhbnNpdGlvbikge1xuICAgIHZhciByZXN1bHQgPSB7IGN1cnZlOiBkZWZhdWx0VHJhbnNpdGlvbi5jdXJ2ZSB9O1xuICAgIGlmIChkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbilcbiAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gZGVmYXVsdFRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICByZXN1bHQuc3BlZWQgPSBkZWZhdWx0VHJhbnNpdGlvbi5zcGVlZDtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gdHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uY3VydmUpXG4gICAgICAgICAgICByZXN1bHQuY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5zcGVlZClcbiAgICAgICAgICAgIHJlc3VsdC5zcGVlZCA9IHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0LmN1cnZlID09PSAnc3RyaW5nJylcbiAgICAgICAgcmVzdWx0LmN1cnZlID0gVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlKHJlc3VsdC5jdXJ2ZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmN1cnZlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5jdXJ2ZSA9IG9wdGlvbnMuY3VydmU7XG4gICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcbiAgICBpZiAob3B0aW9ucy5zcGVlZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuc3BlZWQgPSBvcHRpb25zLnNwZWVkO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFZhbHVlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghdHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KGVuZFZhbHVlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zdGFydFZhbHVlID0gX2Nsb25lKHRoaXMuZ2V0KCkpO1xuICAgIHRyYW5zaXRpb24gPSBfbm9ybWFsaXplKHRyYW5zaXRpb24sIHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKHRyYW5zaXRpb24uc3BlZWQpIHtcbiAgICAgICAgdmFyIHN0YXJ0VmFsdWUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICBpZiAoc3RhcnRWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhcmlhbmNlID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3RhcnRWYWx1ZSlcbiAgICAgICAgICAgICAgICB2YXJpYW5jZSArPSAoZW5kVmFsdWVbaV0gLSBzdGFydFZhbHVlW2ldKSAqIChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5kdXJhdGlvbiA9IE1hdGguc3FydCh2YXJpYW5jZSkgLyB0cmFuc2l0aW9uLnNwZWVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5kdXJhdGlvbiA9IE1hdGguYWJzKGVuZFZhbHVlIC0gc3RhcnRWYWx1ZSkgLyB0cmFuc2l0aW9uLnNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSBfY2xvbmUoZW5kVmFsdWUpO1xuICAgIHRoaXMuX3N0YXJ0VmVsb2NpdHkgPSBfY2xvbmUodHJhbnNpdGlvbi52ZWxvY2l0eSk7XG4gICAgdGhpcy5fZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgIHRoaXMuX2N1cnZlID0gdHJhbnNpdGlvbi5jdXJ2ZTtcbiAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0VmFsdWUsIHN0YXJ0VmVsb2NpdHkpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gX2Nsb25lKHN0YXJ0VmFsdWUpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBfY2xvbmUoc3RhcnRWZWxvY2l0eSk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IDA7XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICB0aGlzLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcbmZ1bmN0aW9uIF9jYWxjdWxhdGVWZWxvY2l0eShjdXJyZW50LCBzdGFydCwgY3VydmUsIGR1cmF0aW9uLCB0KSB7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIHZhciBlcHMgPSAxZS03O1xuICAgIHZhciBzcGVlZCA9IChjdXJ2ZSh0KSAtIGN1cnZlKHQgLSBlcHMpKSAvIGVwcztcbiAgICBpZiAoY3VycmVudCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZlbG9jaXR5ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eVtpXSA9IHNwZWVkICogKGN1cnJlbnRbaV0gLSBzdGFydFtpXSkgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eVtpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9IGVsc2VcbiAgICAgICAgdmVsb2NpdHkgPSBzcGVlZCAqIChjdXJyZW50IC0gc3RhcnQpIC8gZHVyYXRpb247XG4gICAgcmV0dXJuIHZlbG9jaXR5O1xufVxuZnVuY3Rpb24gX2NhbGN1bGF0ZVN0YXRlKHN0YXJ0LCBlbmQsIHQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKHN0YXJ0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgc3RhdGUgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydFtpXSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgc3RhdGVbaV0gPSBfaW50ZXJwb2xhdGUoc3RhcnRbaV0sIGVuZFtpXSwgdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3RhdGVbaV0gPSBzdGFydFtpXTtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICBzdGF0ZSA9IF9pbnRlcnBvbGF0ZShzdGFydCwgZW5kLCB0KTtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSh0aW1lc3RhbXApIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aW1lc3RhbXApXG4gICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMuX3VwZGF0ZVRpbWUgPj0gdGltZXN0YW1wKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IHRpbWVzdGFtcDtcbiAgICB2YXIgdGltZVNpbmNlU3RhcnQgPSB0aW1lc3RhbXAgLSB0aGlzLl9zdGFydFRpbWU7XG4gICAgaWYgKHRpbWVTaW5jZVN0YXJ0ID49IHRoaXMuX2R1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9lbmRWYWx1ZTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIDEpO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRpbWVTaW5jZVN0YXJ0IDwgMCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fc3RhcnRWYWx1ZTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMuX3N0YXJ0VmVsb2NpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHQgPSB0aW1lU2luY2VTdGFydCAvIHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gX2NhbGN1bGF0ZVN0YXRlKHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2VuZFZhbHVlLCB0aGlzLl9jdXJ2ZSh0KSk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBfY2FsY3VsYXRlVmVsb2NpdHkodGhpcy5zdGF0ZSwgdGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fY3VydmUsIHRoaXMuX2R1cmF0aW9uLCB0KTtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnJlc2V0KHRoaXMuZ2V0KCkpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdsaW5lYXInLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmxpbmVhcik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW4pO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXQnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VJbk91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZUluT3V0KTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlT3V0Qm91bmNlJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlT3V0Qm91bmNlKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdzcHJpbmcnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLnNwcmluZyk7XG5Ud2VlblRyYW5zaXRpb24uY3VzdG9tQ3VydmUgPSBmdW5jdGlvbiBjdXN0b21DdXJ2ZSh2MSwgdjIpIHtcbiAgICB2MSA9IHYxIHx8IDA7XG4gICAgdjIgPSB2MiB8fCAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdjEgKiB0ICsgKC0yICogdjEgLSB2MiArIDMpICogdCAqIHQgKyAodjEgKyB2MiAtIDIpICogdCAqIHQgKiB0O1xuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUd2VlblRyYW5zaXRpb247IiwidmFyIFV0aWxpdHkgPSB7fTtcblV0aWxpdHkuRGlyZWN0aW9uID0ge1xuICAgIFg6IDAsXG4gICAgWTogMSxcbiAgICBaOiAyXG59O1xuVXRpbGl0eS5hZnRlciA9IGZ1bmN0aW9uIGFmdGVyKGNvdW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjb3VudGVyID0gY291bnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY291bnRlci0tO1xuICAgICAgICBpZiAoY291bnRlciA9PT0gMClcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5VdGlsaXR5LmxvYWRVUkwgPSBmdW5jdGlvbiBsb2FkVVJMKHVybCwgY2FsbGJhY2spIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIG9ucmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5VdGlsaXR5LmNyZWF0ZURvY3VtZW50RnJhZ21lbnRGcm9tSFRNTCA9IGZ1bmN0aW9uIGNyZWF0ZURvY3VtZW50RnJhZ21lbnRGcm9tSFRNTChodG1sKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVXRpbGl0eS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKGIpIHtcbiAgICB2YXIgYTtcbiAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGEgPSBiIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiW2tleV0gPT09ICdvYmplY3QnICYmIGJba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChiW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBuZXcgQXJyYXkoYltrZXldLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYltrZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhW2tleV1baV0gPSBVdGlsaXR5LmNsb25lKGJba2V5XVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBVdGlsaXR5LmNsb25lKGJba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhID0gYjtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBVdGlsaXR5OyIsImRlZmluZShmdW5jdGlvbihyZXF1aXJlLGV4cG9ydHMsIG1vZHVsZSl7XG5cbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5cbnZhciBFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvRW5naW5lJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgSW1hZ2VTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9zdXJmYWNlcy9JbWFnZVN1cmZhY2UnKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBFYXNpbmcgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL0Vhc2luZycpO1xudmFyIFZpZXcgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVmlldycpO1xuXG5cblxuZnVuY3Rpb24gQmdWaWV3KCl7XG4gIFZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICBcbiAgLy8gY2VudGVyZWQgYmFja2dyb3VuZFxuICB2YXIgY2VudGVyQmdNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC41LCAwLjVdLFxuICAgIG9yaWdpbjogWzAuNSwgMC41XVxuICB9KTtcbiAgdmFyIGJnID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzQwMCwgNTc5XSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL2JnLnN2ZydcbiAgfSk7XG4gIHRoaXMuYWRkKGNlbnRlckJnTW9kKS5hZGQoYmcpO1xufVxuQmdWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVmlldy5wcm90b3R5cGUpO1xuQmdWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJnVmlldztcblxubW9kdWxlLmV4cG9ydHMgPSBCZ1ZpZXc7XG5cbn0pOyIsImRlZmluZShmdW5jdGlvbihyZXF1aXJlLGV4cG9ydHMsIG1vZHVsZSl7XG5cbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5cbnZhciBFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvRW5naW5lJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgSW1hZ2VTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9zdXJmYWNlcy9JbWFnZVN1cmZhY2UnKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBFYXNpbmcgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL0Vhc2luZycpO1xudmFyIFZpZXcgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVmlldycpO1xuXG5mdW5jdGlvbiBNb2RlbFZpZXcoKXtcbiAgVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAvLyBjZW50ZXJlZCBtb2RlbFxuICB2YXIgY2VudGVyTW9kZWxNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC41LCAwLjVdLFxuICAgIG9yaWdpbjogWzAuNSwgMC41XVxuICB9KTtcbiAgdmFyIG1vZGVsID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzExNCwgNTMwXSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL21vZGVsLnN2ZydcbiAgfSk7XG4gIHRoaXMuYWRkKGNlbnRlck1vZGVsTW9kKS5hZGQobW9kZWwpO1xufVxuTW9kZWxWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVmlldy5wcm90b3R5cGUpO1xuTW9kZWxWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1vZGVsVmlldztcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbFZpZXc7XG59KTtcblxuIiwiZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsZXhwb3J0cywgbW9kdWxlKXtcblxucmVxdWlyZSgnLi9zdHlsZXMnKTtcbnJlcXVpcmUoJ2ZhbW91cy1wb2x5ZmlsbHMnKTtcblxudmFyIEVuZ2luZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9FbmdpbmUnKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBJbWFnZVN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIEVhc2luZyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvRWFzaW5nJyk7XG52YXIgVmlldyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9WaWV3Jyk7XG5cblxuXG5mdW5jdGlvbiBPdXRmaXRWaWV3KCl7XG4gIFZpZXcuY2FsbCh0aGlzKVxuXG4gIC8vIHdlYXJpbmcgdG9wXG4gIHZhciB3ZWFyaW5nVG9wTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuNSwgMC4yOF0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcblxuICAvLyB3ZWFyaW5nIGJvdHRvbVxuICB2YXIgd2VhcmluZ0xvd01vZCA9IG5ldyBNb2RpZmllcih7XG4gICAgYWxpZ246IFswLjUsIDAuNDM0XSxcbiAgICBvcmlnaW46IFswLjUsIDBdXG4gIH0pO1xuXG4gIHZhciBibG91c2UxTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuNzUsIDAuMTVdLFxuICAgIG9yaWdpbjogWzAuNSwgMF1cbiAgfSk7XG4gIHZhciBibG91c2UxID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzEwMCwgMTA2XSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL2Jsb3VzZTEuc3ZnJ1xuICB9KTtcbiAgdGhpcy5hZGQoYmxvdXNlMU1vZCkuYWRkKGJsb3VzZTEpO1xuXG4gIC8vIGJsb3VzZSAxMDAgeCAxMDZcbiAgdmFyIGJsb3VzZTJNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC44NSwgMC4xNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIGJsb3VzZTIgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbMTAwLCAxMDZdLFxuICAgIGNvbnRlbnQ6ICdpbWFnZXMvYmxvdXNlMi5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChibG91c2UyTW9kKS5hZGQoYmxvdXNlMik7XG5cbiAgLy8gYmxvdXNlM1xuICB2YXIgYmxvdXNlM01vZCA9IG5ldyBNb2RpZmllcih7XG4gICAgYWxpZ246IFswLjk1LCAwLjE1XSxcbiAgICBvcmlnaW46IFswLjUsIDBdXG4gIH0pO1xuICB2YXIgYmxvdXNlMyA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFsxMDAsIDEwNl0sXG4gICAgY29udGVudDogJ2ltYWdlcy9ibG91c2UzLnN2ZydcbiAgfSk7XG4gIHRoaXMuYWRkKGJsb3VzZTNNb2QpLmFkZChibG91c2UzKTtcblxuICAvLyB0ZWUgc2hpcnQxIDk0IHggMTEyXG4gIHZhciBzaGlydDFNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC43NSwgMC4zMjVdLFxuICAgIG9yaWdpbjogWzAuNSwgMF1cbiAgfSk7XG4gIHZhciBzaGlydDEgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbOTQsIDExMl0sXG4gICAgY29udGVudDogJ2ltYWdlcy9zaGlydDEuc3ZnJ1xuICB9KTtcbiAgdGhpcy5hZGQoc2hpcnQxTW9kKS5hZGQoc2hpcnQxKTtcblxuICAvLyBzaGlydCAyXG4gIHZhciBzaGlydDJNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC44NSwgMC4zMjVdLFxuICAgIG9yaWdpbjogWzAuNSwgMF1cbiAgfSk7XG4gIHZhciBzaGlydDIgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbOTQsIDExMl0sXG4gICAgY29udGVudDogJ2ltYWdlcy9zaGlydDIuc3ZnJ1xuICB9KTtcbiAgdGhpcy5hZGQoc2hpcnQyTW9kKS5hZGQoc2hpcnQyKTtcblxuICAvLyBzaGlydDNcbiAgdmFyIHNoaXJ0M01vZCA9IG5ldyBNb2RpZmllcih7XG4gICAgYWxpZ246IFswLjk1LCAwLjMyNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIHNoaXJ0MyA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFs5NCwgMTEyXSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL3NoaXJ0My5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChzaGlydDNNb2QpLmFkZChzaGlydDMpO1xuXG4gIC8vIGRyZXNzMSA5OSB4IDE3OFxuICB2YXIgZHJlc3MxTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuMSwgMC4xNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIGRyZXNzMSA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFs5OSwgMTc5XSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL2RyZXNzMS5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChkcmVzczFNb2QpLmFkZChkcmVzczEpO1xuXG4gIC8vIGRyZXNzMiA5OSB4IDE3OFxuICB2YXIgZHJlc3MyTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuMiwgMC4xNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIGRyZXNzMiA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFs5OSwgMTc5XSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL2RyZXNzMi5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChkcmVzczJNb2QpLmFkZChkcmVzczIpO1xuXG4gIC8vIGRyZXNzMyA5OSB4IDE3OFxuICB2YXIgZHJlc3MzTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuMywgMC4xNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIGRyZXNzMyA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFs5OSwgMTc5XSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL2RyZXNzMy5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChkcmVzczNNb2QpLmFkZChkcmVzczMpO1xuXG4gIC8vIHNraXJ0MSA5MCB4IDExMlxuICB2YXIgc2tpcnQxTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuMSwgMC41XSxcbiAgICBvcmlnaW46IFswLjUsIDBdXG4gIH0pO1xuICB2YXIgc2tpcnQxID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzkwLCAxMTJdLFxuICAgIGNvbnRlbnQ6ICdpbWFnZXMvc2tpcnQxLnN2ZydcbiAgfSk7XG4gIHRoaXMuYWRkKHNraXJ0MU1vZCkuYWRkKHNraXJ0MSk7XG5cbiAgLy8gc2tpcnQyIDEyMSB4IDkyXG4gIHZhciBza2lydDJNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC4yLCAwLjVdLFxuICAgIG9yaWdpbjogWzAuNSwgMF1cbiAgfSk7XG4gIHZhciBza2lydDIgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbMTIxLCA5Ml0sXG4gICAgY29udGVudDogJ2ltYWdlcy9za2lydDIuc3ZnJ1xuICB9KTtcbiAgdGhpcy5hZGQoc2tpcnQyTW9kKS5hZGQoc2tpcnQyKTtcblxuICAvLyBza2lydDMgOTAgeCAxNDZcbiAgdmFyIHNraXJ0M01vZCA9IG5ldyBNb2RpZmllcih7XG4gICAgYWxpZ246IFswLjMsIDAuNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIHNraXJ0MyA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFs5MCwgMTQ2XSxcbiAgICBjb250ZW50OiAnaW1hZ2VzL3NraXJ0My5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChza2lydDNNb2QpLmFkZChza2lydDMpO1xuXG4gIC8vIHNob3J0cyA5OSB4IDU1XG4gIHZhciBzaG9ydHMxTW9kID0gbmV3IE1vZGlmaWVyKHtcbiAgICBhbGlnbjogWzAuNzUsIDAuNV0sXG4gICAgb3JpZ2luOiBbMC41LCAwXVxuICB9KTtcbiAgdmFyIHNob3J0czEgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbOTksIDU1XSxcbiAgICBjb250ZW50OiAgJ2ltYWdlcy9zaG9ydHMxLnN2ZydcbiAgfSk7XG4gIHRoaXMuYWRkKHNob3J0czFNb2QpLmFkZChzaG9ydHMxKTtcblxuICAvLyBzaG9ydHMgOTkgeCA1NVxuICB2YXIgc2hvcnRzMk1vZCA9IG5ldyBNb2RpZmllcih7XG4gICAgYWxpZ246IFswLjc1LCAwLjZdLFxuICAgIG9yaWdpbjogWzAuNSwgMF1cbiAgfSk7XG4gIHZhciBzaG9ydHMyID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzk5LCA1NV0sXG4gICAgY29udGVudDogICdpbWFnZXMvc2hvcnRzMi5zdmcnXG4gIH0pO1xuICB0aGlzLmFkZChzaG9ydHMyTW9kKS5hZGQoc2hvcnRzMik7XG5cbiAgLy8gc2hvcnRzIDk5IHggNTVcbiAgdmFyIHNob3J0czNNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC43NSwgMC43XSxcbiAgICBvcmlnaW46IFswLjUsIDBdXG4gIH0pO1xuICB2YXIgc2hvcnRzMyA9IG5ldyBJbWFnZVN1cmZhY2Uoe1xuICAgIHNpemU6IFs5OSwgNTVdLFxuICAgIGNvbnRlbnQ6ICAnaW1hZ2VzL3Nob3J0czMuc3ZnJ1xuICB9KTtcbiAgdGhpcy5hZGQoc2hvcnRzM01vZCkuYWRkKHNob3J0czMpO1xuXG4gIC8vIHBhbnRzIDg2IHggMjc5XG4gIHZhciBwYW50czFNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC44NSwgMC41XSxcbiAgICBvcmlnaW46IFswLjUsIDBdXG4gIH0pO1xuICB2YXIgcGFudHMxID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzg2LCAyNzldLFxuICAgIGNvbnRlbnQ6ICdpbWFnZXMvcGFudHMxLnN2ZydcbiAgfSk7XG4gIHRoaXMuYWRkKHBhbnRzMU1vZCkuYWRkKHBhbnRzMSk7XG5cbiAgLy8gcGFudHMyIDg2IHggMjc5XG4gIHZhciBwYW50czJNb2QgPSBuZXcgTW9kaWZpZXIoe1xuICAgIGFsaWduOiBbMC45NSwgMC41XSxcbiAgICBvcmlnaW46IFswLjUsIDBdXG4gIH0pO1xuICB2YXIgcGFudHMyID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgc2l6ZTogWzg2LCAyNzldLFxuICAgIGNvbnRlbnQ6ICdpbWFnZXMvcGFudHMyLnN2ZydcbiAgfSk7XG5cbiAgdGhpcy5hZGQocGFudHMyTW9kKS5hZGQocGFudHMyKTtcbn1cblxuT3V0Zml0Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFZpZXcucHJvdG90eXBlKTtcbk91dGZpdFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gT3V0Zml0VmlldztcblxubW9kdWxlLmV4cG9ydHMgPSBPdXRmaXRWaWV3O1xuXG59KTtcbiIsIlxuZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSl7XG5cbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5yZXF1aXJlKCcuL0JnVmlldy5qcycpO1xucmVxdWlyZSgnLi9Nb2RlbFZpZXcuanMnKTtcbnJlcXVpcmUoJy4vT3V0Zml0Vmlldy5qcycpO1xuXG52YXIgRW5naW5lID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL0VuZ2luZScpO1xudmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL01vZGlmaWVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIEltYWdlU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvc3VyZmFjZXMvSW1hZ2VTdXJmYWNlJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgRWFzaW5nID0gcmVxdWlyZSgnZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9FYXNpbmcnKTtcbnZhciBWaWV3ID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1ZpZXcnKTtcblxudmFyIG1haW5Db250ZXh0ID0gRW5naW5lLmNyZWF0ZUNvbnRleHQoKTtcblxuZnVuY3Rpb24gTWFpblZpZXcoKXtcbiAgVmlldy5jYWxsKHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgdmFyIGJnVmlldyA9IG5ldyBCZ1ZpZXcoKTtcbiAgdmFyIG1vZGVsVmlldyA9IG5ldyBNb2RlbFZpZXcoKTtcbiAgdmFyIG91dGZpdFZpZXcgPSBuZXcgT3V0Zml0VmlldygpO1xuXG4gIHRoaXMuc3Vic2NyaWJlKGJnVmlldyk7XG4gIHRoaXMuc3Vic2NyaWJlKG1vZGVsVmlldyk7XG4gIHRoaXMuc3Vic2NyaWJlKG91dGZpdFZpZXcpO1xuXG4gIHRoaXMuYWRkKGJnVmlldyk7XG4gIHRoaXMuYWRkKG91dGZpdFZpZXcpO1xuXG4gIHRoaXMuX2V2ZW50SW5wdXQub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBvdXRmaXRWaWV3LnN3YXBNb2RpZmllcnMoKTtcbiAgfSk7XG59XG5cbk1haW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVmlldy5wcm90b3R5cGUpO1xuTWFpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblZpZXc7XG5cbnZhciBtYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xubWFpbkNvbnRleHQuYWRkKG1haW5WaWV3KTtcblxufSk7IiwidmFyIGNzcyA9IFwiaHRtbCB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4uYmFja2ZhY2VWaXNpYmlsaXR5IHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblwiOyAocmVxdWlyZShcIi9Vc2Vycy9iZW5odWxhbi9EZXZlbG9wZXIvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9jc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsIi8vIGxvYWQgY3NzXG5yZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvZmFtb3VzLmNzcycpO1xucmVxdWlyZSgnLi9hcHAuY3NzJyk7XG4iXX0=
