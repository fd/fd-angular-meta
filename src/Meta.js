import {State} from 'fd-angular-core';

export function Meta(object, name, desc) {
  let func = desc.value;

  function pushMeta(Meta){
    let args = Array.prototype.slice.call(arguments, 1);
    Meta.push(func.apply(this, args));
  }
  pushMeta.$inject = ['Meta'].concat((func && func.$inject) || []);
  State.onAttach(object, 'pushMeta', { value: pushMeta });

  function popMeta(Meta) {
    Meta.pop();
  }
  popMeta.$inject = ['Meta'];
  State.onAttach(object, 'popMeta', { value: popMeta });
}
