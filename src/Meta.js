
export function Meta(object, name, desc) {
  let klass = object.constructor;
  let func = desc.value;


  function pushMeta(Meta){
    let args = Array.prototype.slice.call(arguments, 1);
    Meta.push(func.apply(this, args));
  }
  pushMeta.$inject = ['Meta'].concat((func && func.$inject) || []);
  if (!klass.$$afterTransition) { klass.$$afterTransition = []; }
  klass.$$afterTransition.push(pushMeta);


  function popMeta(Meta) {
    Meta.pop();
  }
  popMeta.$inject = ['Meta'];
  if (!klass.$$onExit) { klass.$$onExit = []; }
  klass.$$onExit.push(popMeta);
}
