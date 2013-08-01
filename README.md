Overview
========

`loadScript()` is a global function for performing asynchronous script loads.

[Run unit tests.](http://zynga.github.io/loadScript/test.html)

Features
========

 * Tiny! (1kB minified)
 * Supports .noConflict()
 * For developers, allows you to rewrite script URLs based on localStorage
   string substitution rules, making it easy to develop a new version of your
   JS products, even working off of a production site!


How does that work, exactly?
============================

Include loadScript.js via a script tag:

```html
	<script src="loadScript.js" type="text/javascript"></script>
```

If you want to make use of the URL substitution feature, do this:

```javascript
	loadScript.key = 'my_localStorage_key';
```

Actually loading a script is easy:

```javascript
	var jqURL = '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
	loadScript(jsURL, function () {
		// jQuery is now loaded!
	});
```

Now if you, as a developer, want to test out your production site with the
non-minified jQuery source for debugging purposes, just use the browser's dev
tools to set a localStorage value:

```javascript
	localStorage.setItem('my_localStorage_key', '[[".min",""]]');
```

Now when you refresh the page, loadScript() will perform a string substitution
on your URLs to remove the '.min' substring.  This will only affect you, not
other users of the site.

The localStorage value must be a valid JSON stringified array of arrays, where
each inner array has exactly two elements: `[<searchtext>,<replacetext>]`
