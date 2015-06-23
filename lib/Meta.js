'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Meta = Meta;

function Meta(object, name, desc) {
  var func = desc.value;

  function pushMeta(Meta) {
    var args = Array.prototype.slice.call(arguments, 1);
    Meta.push(func.apply(this, args));
  }
  pushMeta.$inject = ['Meta'].concat(func && func.$inject || []);
  if (!object.$$afterConstructor) {
    object.$$afterConstructor = [];
  }
  object.$$afterConstructor.push(pushMeta);

  function popMeta(Meta) {
    Meta.pop();
  }
  popMeta.$inject = ['Meta'];
  if (!object.$$onExit) {
    object.$$onExit = [];
  }
  object.$$onExit.push(popMeta);
}
//# sourceMappingURL=Meta.js.map