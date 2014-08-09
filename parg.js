/*!
* MIT License
* https://github.com/cleversoap/parg-js
*/
(function () {

    function parg (args, fmt) {
        if (!(fmt instanceof Array)) {
            fmt = [fmt];
        }

        if (args instanceof Array) {
            var result = {};

            args.forEach(function (arg, i) {
                if (i < fmt.length) {
                    var r = parg._parse(arg, fmt[i]);
                    if (r) {
                        result[r.p] = args[i];
                    }
                }
            });

            return result;
        } else {
            // Parse argument array
            return parg(Array.prototype.slice.call(args), fmt);
        }
    }

    parg.default = function (func) {
    };

    parg._TYPE = 'type';
    parg._INSTANCE = 'instance';
    parg._NOT_TYPE = 'not_type';
    parg._NOT_INSTANCE = 'not_instance';

    parg._parse = function (arg, param) {
        if (param instanceof Array) {
            return param.filter(function (p) { return parg._parse(arg, p); })[0];
        } else {
            if (parg._eval(arg, parg._compType(param), parg._getTarget(param))) {
                return param;
            }
        }
    };

    parg._compType = function (p) {
        if (p.hasOwnProperty('t') || p.hasOwnProperty('type')) {
            // On the type comparison if a string is passed then it will be
            // a normal typeof check however anything else is actually an
            // instanceof check.
            return typeof parg._getTarget(p) === 'string' ? parg._TYPE : parg._INSTANCE;
        } else if (p.hasOwnProperty('i') || p.hasOwnProperty('instance')) {
            return parg._INSTANCE;
        } else if (p.hasOwnProperty('nt') || p.hasOwnProperty('not_type')) {
            return typeof parg._getTarget(p) === 'string' ? parg._NOT_TYPE : parg._NOT_INSTANCE;
        } else if (p.hasOwnProperty('ni') || p.hasOwnProperty('not_instance')) {
            return parg._NOT_INSTANCE;
        }
    };

    parg._getTarget = function (p) {
        return p['t'] || p['nt'] || p['i'] || p['ni'] || p['type'] || p['not_type'] || p['instance'] || p['not_instance'];
    };

    parg._eval = function (arg, comp, target) {
        switch (comp) {
            case parg._TYPE:
                return typeof arg === target;

            case parg._INSTANCE:
                return arg instanceof target;

            case parg._NOT_TYPE:
                return !parg.eval(arg, parg._TYPE, target);

            case parg._NOT_INSTANCE:
                return !parg.eval(arg, parg._NOT_INSTANCE, target);
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = parg;
    } else if (typeof define === 'function' && define.amd) {
        define([], function() {
            return parg;
        });
    } else {
        window.parg = parg;
    }

})();
