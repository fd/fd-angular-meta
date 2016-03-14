'use strict';

var _fdAngularCore = require('fd-angular-core');

_fdAngularCore.app.directive('fdMeta', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		link: function link($scope, $element) {
			var elems = $compile(TMPL)($scope);
			$element.find('title').remove();
			$element.prepend(elems);
		}
	};
}]);

var TMPL = '\n<title ng-bind-template="{{ meta.title }}"></title>\n\n<meta name="description"\n\tng-if="meta.description"\n\tcontent="{{ meta.description }}" />\n<meta name="author"\n\tng-if="meta.author"\n\tcontent="{{ meta.author }}">\n<meta name="publisher"\n\tng-if="meta.publisher"\n\tcontent="{{ meta.publisher }}">\n<meta name="copyright"\n\tng-if="meta.copyright"\n\tcontent="{{ meta.copyright }}">\n<meta name="distribution"\n\tng-if="meta.distribution"\n\tcontent="{{ meta.distribution }}">\n<meta name="revisit-after"\n\tng-if="meta.revisitAfter"\n\tcontent="{{ meta.revisitAfter }} Days">\n\n<meta name="prerender-status-code" content="{{ meta.status }}">\n<link rel="canonical" ng-href="{{ meta.url }}" />\n\n<meta property="fb:app_id"\n\tng-if="meta.fbAppId"\n\tcontent="{{ meta.fbAppId }}" />\n<meta property="og:site_name"\n\tng-if="meta.siteName"\n\tcontent="{{ meta.siteName }}" />\n<meta property="og:url"\n\tng-if="meta.url"\n\tcontent="{{ meta.url }}" />\n<meta property="og:title"\n\tng-if="meta.title"\n\tcontent="{{ meta.title }}" />\n<meta property="og:type"\n\tng-if="meta.type"\n\tcontent="{{ meta.type }}" />\n<meta property="og:description"\n\tng-if="meta.description"\n\tcontent="{{ meta.description }}" />\n<meta property="og:image"\n\tng-if="meta.image"\n\tcontent="{{ meta.image }}" />\n\n<meta name="twitter:card"\n\tng-if="meta.twitterHandle"\n\tcontent="summary_large_image">\n<meta name="twitter:site"\n\tng-if="meta.twitterHandle"\n\tcontent="{{ meta.twitterHandle }}">\n<meta name="twitter:title"\n\tng-if="meta.title"\n\tcontent="{{ meta.title }}">\n<meta name="twitter:description"\n\tng-if="meta.description"\n\tcontent="{{ meta.description }}">\n<meta name="twitter:image"\n\tng-if="meta.image"\n\tcontent="{{ meta.image }}">\n\n';
//# sourceMappingURL=MetaDirective.js.map