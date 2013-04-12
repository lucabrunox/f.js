(function _______________($) {
	var originalF = typeof f != "undefined" ? f : undefined;

	f = function(o) {
		var r = [];
		r.c = function(f) {
			return function() {
				return o(f.apply (this, arguments));
			};
		};
		return r;
	};

	f.const = function(o) {
		return function() {
			return o;
		};
	};

	f.compose = function(f1) {
		return function(f2) {
			return f(f1).c(f2);
		};
	};
	f.c = f.compose;

	f.attr = function(attr) {
		return function(o) {
			return f(o).attr(attr);
		};
	};
	f.a = f.attr;

	f.prop = function(prop) {
		return function(o) {
			return f(o).prop(attr);
		}
	};
	f.p = f.prop;

	f.isArray = $.isArray;

	f.isFunction = $.isFunction;

	f.noConflict = function() {
		var theF = f;
		f = originalF;
		return theF;
	};
})(jQuery);
