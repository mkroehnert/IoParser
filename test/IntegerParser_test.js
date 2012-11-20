var helper = require('./TestHelpers');

exports.IntegerTests = {
    testNumber: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '133');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [133]);
        test.done();
    },

    testPositiveSignNumber: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+15464');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 15464]);
        test.done();
    },

    testNegativeSignNumber: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-1456');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1456]);
        test.done();
    },

    testNumberStartingZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '01356');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [1356]);
        test.done();
    },

    testNegativeSignNumberStartingZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-01456');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1456]);
        test.done();
    },

    testPositiveSignNumberStartingZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+01456');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 1456]);
        test.done();
    }
};
