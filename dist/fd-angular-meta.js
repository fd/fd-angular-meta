(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FdAngularMeta = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.Meta = Meta;

var _fdAngularCore = require('fd-angular-core');

function Meta(object, name, desc) {
	var func = desc.value;

	function pushMeta(Meta) {
		var args = Array.prototype.slice.call(arguments, 1);
		Meta.push(func.apply(this, args));
	}
	pushMeta.$inject = ['Meta'].concat(func && func.$inject || []);
	_fdAngularCore.State.onAttach(object, 'pushMeta', { value: pushMeta });

	function popMeta(Meta) {
		Meta.pop();
	}
	popMeta.$inject = ['Meta'];
	_fdAngularCore.State.onDetach(object, 'popMeta', { value: popMeta });
}

},{"fd-angular-core":undefined}],2:[function(require,module,exports){
'use strict';

var _fdAngularCore = require('fd-angular-core');

_fdAngularCore.app.directive('fdMeta', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		link: function link($scope, $element) {
			var elems = $compile(TMPL)($scope);
			$element.find('title').remove();
			$element.prepend(elems);
		}
	};
}]);

var TMPL = '\n<title ng-bind-template="{{ meta.title }}"></title>\n\n<meta name="description"\n\tng-if="meta.description"\n\tcontent="{{ meta.description }}" />\n<meta name="author"\n\tng-if="meta.author"\n\tcontent="{{ meta.author }}">\n<meta name="publisher"\n\tng-if="meta.publisher"\n\tcontent="{{ meta.publisher }}">\n<meta name="copyright"\n\tng-if="meta.copyright"\n\tcontent="{{ meta.copyright }}">\n<meta name="distribution"\n\tng-if="meta.distribution"\n\tcontent="{{ meta.distribution }}">\n<meta name="revisit-after"\n\tng-if="meta.revisitAfter"\n\tcontent="{{ meta.revisitAfter }} Days">\n\n<meta name="prerender-status-code" content="{{ meta.status }}">\n<link rel="canonical" ng-href="{{ meta.url }}" />\n\n<meta property="fb:app_id"\n\tng-if="meta.fbAppId"\n\tcontent="{{ meta.fbAppId }}" />\n<meta property="og:site_name"\n\tng-if="meta.siteName"\n\tcontent="{{ meta.siteName }}" />\n<meta property="og:url"\n\tng-if="meta.url"\n\tcontent="{{ meta.url }}" />\n<meta property="og:title"\n\tng-if="meta.title"\n\tcontent="{{ meta.title }}" />\n<meta property="og:type"\n\tng-if="meta.type"\n\tcontent="{{ meta.type }}" />\n<meta property="og:description"\n\tng-if="meta.description"\n\tcontent="{{ meta.description }}" />\n<meta property="og:image"\n\tng-if="meta.image"\n\tcontent="{{ meta.image }}" />\n\n<meta name="twitter:card"\n\tng-if="meta.twitterHandle"\n\tcontent="summary_large_image">\n<meta name="twitter:site"\n\tng-if="meta.twitterHandle"\n\tcontent="{{ meta.twitterHandle }}">\n<meta name="twitter:title"\n\tng-if="meta.title"\n\tcontent="{{ meta.title }}">\n<meta name="twitter:description"\n\tng-if="meta.description"\n\tcontent="{{ meta.description }}">\n<meta name="twitter:image"\n\tng-if="meta.image"\n\tcontent="{{ meta.image }}">\n\n';

},{"fd-angular-core":undefined}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fdAngularCore = require('fd-angular-core');

var defaults = {
	type: 'website',
	status: 200,
	distribution: 'global',
	revisitAfter: 7
};

var MetaService = (function () {
	function MetaService($rootScope, $location) {
		_classCallCheck(this, _MetaService);

		this.$rootScope = $rootScope;
		this.$location = $location;

		this.stack = [];
		this.top = null;

		this.push({});
	}

	_createClass(MetaService, [{
		key: 'push',
		value: function push(data) {
			var top = this.top;
			var loc = this.$location;
			var entry = {};

			// normalize
			if (!data.url) {
				data.url = loc.absUrl();
			}
			if (data.image) {
				data.image = toAbsUrl(data.image);
			}
			if (data.url) {
				data.url = toAbsUrl(data.url);
			}

			data.author = data.author || data.copyright || data.publisher;
			data.copyright = data.copyright || data.author || data.publisher;
			data.publisher = data.publisher || data.author || data.copyright;

			// inherit from top
			if (top) {
				Object.assign(entry, top);
			}

			// assign data
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;

					if (data[key] !== undefined) {
						entry[key] = data[key];
					}
				}

				// apply defaults
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Object.keys(defaults)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var key = _step2.value;

					if (entry[key] === undefined) {
						entry[key] = defaults[key];
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.stack.push(entry);
			this.top = entry;
			this.$rootScope.meta = this.top;
		}
	}, {
		key: 'pop',
		value: function pop(data) {
			this.stack.pop();
			this.top = this.stack[this.stack.length - 1];
			this.$rootScope.meta = this.top;
		}
	}]);

	var _MetaService = MetaService;
	MetaService = (0, _fdAngularCore.Inject)('$rootScope', '$location')(MetaService) || MetaService;
	MetaService = (0, _fdAngularCore.Service)('Meta')(MetaService) || MetaService;
	return MetaService;
})();

function toAbsUrl(url) {
	if (!url) {
		return null;
	}

	if (url.indexOf('http') === 0) {
		return url;
	}

	if (url.indexOf('//') === 0) {
		return '' + window.location.protocol + url;
	}

	if (url.indexOf('/') === 0) {
		return window.location.protocol + '//' + window.location.host + url;
	}

	return window.location.protocol + '//' + window.location.host + '/' + url;
}

},{"fd-angular-core":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('./MetaService');

require('./MetaDirective');

var _Meta = require('./Meta');

Object.defineProperty(exports, 'Meta', {
  enumerable: true,
  get: function get() {
    return _Meta.Meta;
  }
});

},{"./Meta":1,"./MetaDirective":2,"./MetaService":3}]},{},[4])(4)
});
//# sourceMappingURL=fd-angular-meta.js.map
