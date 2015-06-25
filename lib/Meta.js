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
//# sourceMappingURL=Meta.js.map