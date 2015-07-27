import {Service, Inject} from 'fd-angular-core';

let defaults = {
	type:         'website',
	status:       200,
	distribution: 'global',
	revisitAfter: 7,
}

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
		let entry = {};

		// normalize
		if (!data.url) { data.url = loc.absUrl(); }
		if (data.image) { data.image = toAbsUrl(data.image); }
		if (data.url) { data.url = toAbsUrl(data.url); }

		data.author = (data.author || data.copyright || data.publisher);
		data.copyright = (data.copyright || data.author || data.publisher);
		data.publisher = (data.publisher || data.author || data.copyright);

		// inherit from top
		if (top) {
			Object.assign(entry, top);
		}

		// assign data
		for (let key of Object.keys(data)) {
			if (data[key] !== undefined) {
				entry[key] = data[key];
			}
		}

		// apply defaults
		for (let key of Object.keys(defaults)) {
			if (entry[key] === undefined) {
				entry[key] = defaults[key];
			}
		}

		this.stack.push(entry);
		this.top = entry;
		this.$rootScope.meta = this.top;
	}

	pop(data) {
		this.stack.pop();
		this.top = this.stack[this.stack.length-1];
		this.$rootScope.meta = this.top;
	}

}

function toAbsUrl(url) {
	if (!url) {
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
