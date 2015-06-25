import {app} from 'fd-angular-core';

app.directive('fdMeta', function() {
  return {
    restrict: 'M',
    template: TMPL
  };
});

const TMPL = `
<title ng-bind-template="{{ meta.title }}"></title>
<meta name="description" content="{{ meta.description }}" />

<meta name="prerender-status-code" content="{{ meta.status }}">
<link rel="canonical" ng-href="{{ meta.url }}" />

<meta property="og:site_name" content="{{ meta.siteName }}" />
<meta property="og:url" content="{{ meta.url }}" />
<meta property="og:title" content="{{ meta.title }}" />
<meta property="og:type" content="{{ meta.type }}" />
<meta property="og:description" content="{{ meta.description }}" />
<meta property="og:image" content="{{ meta.image }}" />

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{{ meta.twitterHandle }}">
<meta name="twitter:title" content="{{ meta.title }}">
<meta name="twitter:description" content="{{ meta.description }}">
<meta name="twitter:image" content="{{ meta.image }}">
`;
