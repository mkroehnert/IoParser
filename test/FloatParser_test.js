var helper = require('./TestHelpers');

exports.FloatTests = {
    testFloat: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '1.2');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 1.2);
        test.done();
    },

    testSignedPositiveFloat: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+1233.2642');
        test.strictEqual(result.length, 2);
        // result = +(1233.2642)
        test.deepEqual(result, ['OP:+', 1233.2642]);
        test.done();
    },

    testSignedNegativeFloat: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-92384.2642');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 92384.2642]);
        test.done();
    },

    testFloatStartingZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0.2');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0.2);
        test.done();
    },

    testSignedPositiveFloatStartingZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+0.4934');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 0.4934]);
        test.done();
    },

    testSignedNegativeFloatStartingZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-0.0929834');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 0.0929834]);
        test.done();
    },

    testFloatStartingDot: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '.2');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0.2);
        test.done();
    },

    testSignedPositiveFloatStartingDot: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+.4934');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 0.4934]);
        test.done();
    },

    testSignedNegativeFloatStartingDot: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-.0929834');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 0.0929834]);
        test.done();
    },

    testFloatStartingDoubleZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '00.2');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0.2);
        test.done();
    },

    testSignePositiveFloatStartingDoubleZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+00.022');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 0.022]);
        test.done();
    },

    testSignedNegativeFloatStartingDoubleZero: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-00.123');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 0.123]);
        test.done();
    },

};
