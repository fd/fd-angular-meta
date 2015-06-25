'use strict';

var _fdAngularCore = require('fd-angular-core');

_fdAngularCore.app.directive('fdMeta', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    link: function link($scope, $element) {
      var elems = $compile(TMPL)($scope);
      $element.prepend(elems);
    }
  };
}]);

var TMPL = '\n<title ng-bind-template="{{ meta.title }}"></title>\n<meta name="description" content="{{ meta.description }}" />\n\n<meta name="prerender-status-code" content="{{ meta.status }}">\n<link rel="canonical" ng-href="{{ meta.url }}" />\n\n<meta property="og:site_name"\n  ng-if="meta.siteName"\n  content="{{ meta.siteName }}" />\n<meta property="og:url"\n  ng-if="meta.url"\n  content="{{ meta.url }}" />\n<meta property="og:title"\n  ng-if="meta.title"\n  content="{{ meta.title }}" />\n<meta property="og:type"\n  ng-if="meta.type"\n  content="{{ meta.type }}" />\n<meta property="og:description"\n  ng-if="meta.description"\n  content="{{ meta.description }}" />\n<meta property="og:image"\n  ng-if="meta.image"\n  content="{{ meta.image }}" />\n\n<meta name="twitter:card"\n  ng-if="meta.twitterHandle"\n  content="summary_large_image">\n<meta name="twitter:site"\n  ng-if="meta.twitterHandle"\n  content="{{ meta.twitterHandle }}">\n<meta name="twitter:title"\n  ng-if="meta.title"\n  content="{{ meta.title }}">\n<meta name="twitter:description"\n  ng-if="meta.description"\n  content="{{ meta.description }}">\n<meta name="twitter:image"\n  ng-if="meta.image"\n  content="{{ meta.image }}">\n\n';
//# sourceMappingURL=MetaDirective.js.map