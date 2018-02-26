const isEqual = require('../isEqual');
const expect = require('chai').expect;
describe('isEqual', function() {
    it('should give right answers for both equal and unequal inputs', function() {
        const equalInputs = [
            [1, 1],
            [true, true],
            ['foo', 'foo']
        ];
        equalInputs.forEach(function(input) {
            const answer = isEqual(input[0], input[1]);
            expect(answer).to.be.true;
        });
        const unequalInputs = [
            ['1', 1],
            ['true', false],
            [1, 2],
            [1, true],
            [0, false]
        ];
        unequalInputs.forEach(function(input) {
            const answer = isEqual(input[0], input[1]);
            expect(answer).to.be.false;
        });
    });
});