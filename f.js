(function ($) {
    var root = this;
    var previousF = root.f;
    var fProto = {};

    f = function(o) {
        if (f.isFunction (o)) {
            return f.f({name: "partial", args: arguments}, f.partial.apply(this, arguments));
        }
        if (arguments.length == 0) {
            return f(f.id);
        } else {
            return f(f.id, o);
        }
    };

    f.extend = $.extend;

    f.f = function(op, g) {
        f.extend(g, fProto);
        g.__f_op_ = op;
        return g;
    };

    var arraySlice = Array.prototype.slice;
    f.concat = Array.prototype.concat;

    f.partial = function(g) {
        var args = arraySlice.call(arguments, 1);
        var r = function() {
            return g.apply(this, args.concat(arraySlice.call(arguments)));
        };
        return r;
    };

    f.flip = function(g) {
        return function(a,b) {
            return g(b,a);
        };
    };

    f.map = $.map;

    f.filter = $.filter;

    f.id = function(o) {
        return o;
    };

    f.const = f.partial(f.partial, f.id);

    f.compose = function(f1,f2) {
	return function() {
            return f1(f2.apply(this, arguments));
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

    f.add = function(x,y) {
        return x+y;
    }

    f.inc = function(x) {
        return x+1;
    }

    f.noConflict = function() {
	var theF = f;
	root.f = previousF;
	return theF;
    };


    f.extend(fProto, {
        map: function(g) { return f(f.map, this(), g); },
        $map: function(g) { return this.c(f.$map(g)); },
        args: function() {
            var old = arraySlice.call (this.__f_op_.args);
            var new_ = arraySlice.call (arguments);
            return f.apply(this, old.concat(new_));
        },
        compose: function(g) {
            return f(f.compose(this, g));
        }
    });
    // aliases
    f.extend(fProto, {
        c: fProto.compose
    });

    // partial applied map and filter
    f.$map = f(f, f.flip(f.map));

    f.$filter = f(f, f.flip(f.filter));

    // aliases
}).call(this, jQuery);
