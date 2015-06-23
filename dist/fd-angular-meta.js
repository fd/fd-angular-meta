(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FdAngularMeta = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Meta = Meta;

function Meta(object, name, desc) {
  var klass = object.constructor;
  var func = desc.value;

  function pushMeta(Meta) {
    var args = Array.prototype.slice.call(arguments, 1);
    Meta.push(func.apply(this, args));
  }
  pushMeta.$inject = ['Meta'].concat(func && func.$inject || []);
  if (!klass.$$afterTransition) {
    klass.$$afterTransition = [];
  }
  klass.$$afterTransition.push(pushMeta);

  function popMeta(Meta) {
    Meta.pop();
  }
  popMeta.$inject = ['Meta'];
  if (!klass.$$onExit) {
    klass.$$onExit = [];
  }
  klass.$$onExit.push(popMeta);
}

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fdAngularCore = require('fd-angular-core');

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

      if (!data.url) {
        data.url = loc.absUrl();
      }

      if (top) {
        if (!data.siteName) {
          data.siteName = top.siteName;
        }

        if (!data.title) {
          data.title = top.title;
        }

        if (!data.image) {
          data.image = top.image;
        }

        if (!data.description) {
          data.description = top.description;
        }

        if (!data.type) {
          data.type = top.type;
        }

        if (!data.twitterHandle) {
          data.twitterHandle = top.twitterHandle;
        }

        if (!data.status) {
          data.status = top.status;
        }
      }

      if (!data.type) {
        data.type = 'website';
      }

      if (!data.status) {
        data.status = 200;
      }

      if (data.image && data.image.indexOf('http') !== 0) {
        data.image = loc.protocol() + '://' + loc.host() + data.image;
      }

      if (data.url && data.url.indexOf('http') !== 0) {
        data.url = loc.protocol() + '://' + loc.host() + data.url;
      }

      this.stack.push(data);
      this.top = data;
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

},{"fd-angular-core":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('./MetaService');

var _Meta = require('./Meta');

Object.defineProperty(exports, 'Meta', {
  enumerable: true,
  get: function get() {
    return _Meta.Meta;
  }
});

},{"./Meta":1,"./MetaService":2}]},{},[3])(3)
});
//# sourceMappingURL=fd-angular-meta.js.map
