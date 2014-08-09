/**
 * These are tests for simple type and position.
 */
describe('Single Value Type Check', function () {

    function _typeCheck () {
        return parg(arguments, {p: 'arg1', t: typeof arguments[0]});
    }

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
