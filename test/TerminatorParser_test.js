var helper = require('./TestHelpers');

exports.TerminatorTests = {
    testEmptyInput: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '');
        test.strictEqual(result.length, 0);
        test.deepEqual(result, []);
        test.done();
    },
    testSemicolon: function(test){
        test.expect(3);
        var result = helper.parseOk(test, ';');
        // result = nil
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['T']);
        test.done();
    },
    testNewline: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '\n');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['T']);
        test.done();
    },
    testCarriageReturn: function(test){
        test.expect(1);
        helper.parseFail(test, '\r');
        test.done();
    },
    testCarriageReturnNewline: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '\r\n');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['T']);
        test.done();
    }
};
