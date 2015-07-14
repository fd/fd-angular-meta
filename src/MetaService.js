import {Service, Inject} from 'fd-angular-core';

@Service('Meta')
@Inject('$rootScope', '$location')
class MetaService {

  constructor($rootScope, $location) {
    this.$rootScope = $rootScope;
    this.$location  = $location;

    this.stack = [];
    this.top = null;

    this.push({});
  }

  push(data) {
    let top = this.top;
    let loc = this.$location;

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

    data.image = toAbsUrl(data.image);

    data.url = toAbsUrl(data.url);

    this.stack.push(data);
    this.top = data;
    this.$rootScope.meta = this.top;
  }

  pop(data) {
    this.stack.pop();
    this.top = this.stack[this.stack.length-1];
    this.$rootScope.meta = this.top;
  }

}

function toAbsUrl(url) {
    if ( !url ) {
        return null;
    }

    if (url.indexOf('http') === 0) {
        return url;
    }

    if (url.indexOf('//') === 0) {
      return `${window.location.protocol}${url}`;
    }

    if (url.indexOf('/') === 0) {
      return `${window.location.protocol}//${window.location.host}${url}`;
    }

    return `${window.location.protocol}//${window.location.host}/${url}`;
}
