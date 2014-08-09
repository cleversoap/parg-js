/**
 * These are tests for simple type and position.
 */
describe('Single Value', function () {

    it("type string", function () {
        expect(
            function () {
                return parg(arguments, {p: 'arg1', t: 'string'});
            }('hello').arg1
        ).toBe('hello'); 
    });

});
