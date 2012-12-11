/*global console*/
(function (win, doc, undef) {
	var
		func,
		funcName = 'loadScript',
		VERSION = '0.1.0',
		had = Object.prototype.hasOwnProperty.call(win, funcName),
		previous = win[funcName],
		loading = {},
		loaded = {},
		substitutions
	;

	function log(msg) {
		if (typeof console !== 'undefined' && console && console.log) {
			console.log(msg);
		}
	}

	function rewrite(origURL) {
		var i, len = substitutions.length, rule, url = origURL;
		while (++i < len) {
			rule = substitutions[i];
			url = url.replace(rule[0], rule[1]);
		}
		if (url !== origURL) {
			log(funcName + ': rewrite("' + origURL + '")');
			log(' => "' + url + '"');
		}
		return url;
	}

	func = win[funcName] = function (requestURL, callback) {
		var
			el,
			url = rewrite(requestURL),
			needToLoad = !loading[url],
			q = loading[url] = loading[url] || []
		;
		function doCallback() {
			if (callback) {
				callback();
			}
		}
		if (loaded[url]) {
			doCallback();
			return;
		}
		q.push(doCallback);
		function onLoad() {
			while (q.length) {
				q.shift()();
			}
		}
		if (needToLoad) {
			el = doc.createElement('script');
			el.type = 'text/javascript';
			el.charset = 'utf-8';
			if (el.addEventListener) {
				el.addEventListener('load', onLoad, false);
			} else { // IE
				el.attachEvent('onreadystatechange', onLoad);
			}
			if (url !== requestURL) {
				el.setAttribute('data-requested', requestURL);
			}
			el.src = url;
			doc.getElementsByTagName('head')[0].appendChild(el);
		}
	};

	func.VERSION = VERSION;

	func.key = 'loader_rules';

	func.noConflict = function () {
		if (win[name] === func) {
			win[name] = had ? previous : undef;
			if (!had) {
				try {
					delete win[name];
				} catch (ex) {
				}
			}
		}
		return func;
	};
}(window, document));
