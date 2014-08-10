//---------------------------------------------------------------------[ SETUP ]

/**
* Does a very basic type check and should always return an argument
* that matches.
*/
function _typeCheck () {
    return parg(arguments, {p: 'arg1', t: typeof arguments[0]});
}

/**
* Basic class used for comparisons.
*/
function Class () {
}

/**
* "ParentClass" used for inheritance checks
*/
function ParentClass() {
}

/**
* "ChildClass" used for inheritance checks - inherits from ParentClass
*/
function ChildClass() {
}
ChildClass.prototype = Object.create(ParentClass.prototype);

//---------------------------------------------------------------------[ TESTS ]

/**
* These are tests for simple type and position.
*/
describe('Single Value Type Check', function () {

    it('type string', function () {
        expect(_typeCheck('hello').arg1).toBe('hello');
    });

    it('type number', function () {
        expect(_typeCheck(1).arg1).toBe(1);
        expect(_typeCheck(42).arg1).toBe(42);
        expect(_typeCheck(0).arg1).toBe(0);
        expect(_typeCheck(-1).arg1).toBe(-1);
        // Using toEqual as toBe uses strict equality
        expect(_typeCheck(NaN).arg1).toEqual(NaN);
    });

    it('type boolean', function () {
        expect(_typeCheck(true).arg1).toBe(true);
        expect(_typeCheck(false).arg1).toBe(false);
    });

    it('type object', function () {
        // Simple definition as object instances can't be compared with
        // strict equality as they are separate.
        expect(_typeCheck({}).arg1).toBeDefined();

        // However a reference should work
        var obj = {};
        expect(_typeCheck(obj).arg1).toBe(obj);
    });

    it('type function', function () {
        // Simple definition as function instances can't be compared with
        // strict equality as they are separate.
        expect(_typeCheck(function(){}).arg1).toBeDefined();

        // However a reference should work
        function func () {};
        expect(_typeCheck(func).arg1).toBe(func);
    });

});

/**
* These tests are still for single values but they now check based on
* instanceof complex comparisons.
*/
describe('Single Value Instance Check', function () {

    it('accepts both type and instance declarations', function () {
        expect(parg([new Class()], {p:'arg1',t:Class}).arg1).toBeDefined();
        expect(parg([new Class()], {p:'arg1',i:Class}).arg1).toBeDefined();
    });

    it('is class object', function () {
        expect(parg([new Class()], {p:'arg1',t:Class}).arg1).toBeDefined();
    });

    it('respects inheritance', function () {
        expect(parg([new ChildClass()], {p:'arg1',t:ChildClass}).arg1).toBeDefined();
        expect(parg([new ChildClass()], {p:'arg1',t:ParentClass}).arg1).toBeDefined();
        expect(parg([new ParentClass()], {p:'arg1',t:ChildClass}).arg1).not.toBeDefined();
    });

});

/**
* These are tests of multiple parameters and complex substitutions.
*/
describe('Multiple values and substitutions', function () {

    it('only returns the correct argument', function () {
        var fmt = [{p:'arg1', t:'number'}, {p:'arg2', t:'string'}];
        expect(parg([1], fmt).arg1).toBe(1);
        expect(parg([1], fmt).arg2).not.toBeDefined();
        expect(parg(['hello'],fmt).arg1).not.toBeDefined();
        expect(parg(['hello'],fmt).arg2).not.toBeDefined();
    });

});
