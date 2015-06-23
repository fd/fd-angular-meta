# `fd-angular-meta`

## Getting started

```js
import {bootstrap, State, Inject} from 'npm:fd-angular-core';
import {Meta} 'npm:fd-angular-meta';

@State({
  template: `<p>{{ app.message }}</p>`
})
class AppController {

  constructor() {
    this.message = "Hello world!";
  }

  @Meta
  @Inject('$location')
  pushMeta($location) {
    return {
      url: $location.url(),
      description: this.message
    };
  }

}

bootstrap(AppController); // => Promise
```
