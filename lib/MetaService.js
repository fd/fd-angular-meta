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

	var _MetaService = MetaService;

	_createClass(_MetaService, [{
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

			// apply defaults
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
//# sourceMappingURL=MetaService.js.map