var helper = require('./TestHelpers');

exports.Identifier = {
    testEmptyRoundBrackets: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '()');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['roundBrackets'] ]);
        test.done();
    },

    testRoundBrackets: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '(12)');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['roundBrackets', [12]] ]);
        test.done();
    },

    testEmptyBrackets: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '{}');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['curlyBrackets'] ]);
        test.done();
    },

    testCurlyBrackets: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '{12}');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['curlyBrackets', [12]] ]);
        test.done();
    },

    testEmptySquareBrackets: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '[]');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['squareBrackets'] ]);
        test.done();
    },

    testSquareBrackets: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '[12]');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['squareBrackets', [12]] ]);
        test.done();
    },
};
