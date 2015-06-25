'use strict';

var _fdAngularCore = require('fd-angular-core');

_fdAngularCore.app.directive('fdMeta', function () {
  return {
    restrict: 'M',
    template: TMPL
  };
});

var TMPL = '\n<title ng-bind-template="{{ meta.title }}"></title>\n<meta name="description" content="{{ meta.description }}" />\n\n<meta name="prerender-status-code" content="{{ meta.status }}">\n<link rel="canonical" ng-href="{{ meta.url }}" />\n\n<meta property="og:site_name" content="{{ meta.siteName }}" />\n<meta property="og:url" content="{{ meta.url }}" />\n<meta property="og:title" content="{{ meta.title }}" />\n<meta property="og:type" content="{{ meta.type }}" />\n<meta property="og:description" content="{{ meta.description }}" />\n<meta property="og:image" content="{{ meta.image }}" />\n\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:site" content="{{ meta.twitterHandle }}">\n<meta name="twitter:title" content="{{ meta.title }}">\n<meta name="twitter:description" content="{{ meta.description }}">\n<meta name="twitter:image" content="{{ meta.image }}">\n';
//# sourceMappingURL=MetaDirective.js.map