# `fd-angular-meta`

[![Build Status](https://travis-ci.org/fd/fd-angular-meta.svg?branch=master)](https://travis-ci.org/fd/fd-angular-meta)

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


```html
<head fd-meta>
</head>
```


## Options


* **url** The cannonical url to the current page (defaults to `$location.absUrl()`)
* **image** Link to an image
* **title** Title of the current page.
* **description** Description of the current page.
* **siteName** Name of the website
* **type** og:type (defaults to `"website"`)
* **twitterHandle** for the the twitter card.
* **status** of the current page (default to `200`)
