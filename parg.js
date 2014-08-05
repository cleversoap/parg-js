(
    /*
    * p, arg, or param is acceptable
    * t or type is acceptable
    * i or instance is acceptable
    * d or default is acceptable
    * v or value is acceptable
    *
    * parg.eval is instanceof checked and will be called if the set is
    * selected as the correct one. It is passed the object with the arguments
    * parsed up to that point.
    *
    *  [
    *      {p: 'arg1', t: 'type'},
    *      {p: 'arg2', i: Class},
    *      {p: 'arg3', nt: 'type'},
    *      {p: 'arg4', ni: Class},
    *      {d: 'arg5', v: 'SomeValue'},
    *      {d: 'arg6', v: new parg.eval(function(){})}
    *  ]
    *
    * [
    *  // Checks the first param always
    *  {p: 'arg1', t: 'type'}, // Perhaps does some additional parsing eg. parseInt?
    *  // Only checks the second parameter, it will evaluate it to the first name
    *  // that matches.
    *  [
    *      {p: 'arg2', t: 'type'},
    *      {p: 'arg3', i: Class}
    *  ]
    * ]
    */

    function parg (args, fmt) {
    }

    parg.eval = function (func) {
    };


)(this);
