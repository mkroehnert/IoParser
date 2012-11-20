var helper = require('./TestHelpers');

exports.ScientificFloatTests = {
    testScientificNegativeExponent: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '12.0E-2');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [1.2e-1]);
        test.done();
    },

    testSignedPositiveScientificNegativeExponent: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+12.0E-2');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 1.2e-1]);
        test.done();
    },

    testSignedNegativeScientificNegativeExponent: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-12.0E-2');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1.2e-1]);
        test.done();
    },

    testScientificPositiveExponent: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '12.0E+20');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [1.2e21]);
        test.done();
    },

    testSignedPositiveScientificPositiveExponent: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '+12.0E+20');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 1.2e21]);
        test.done();
    },

    testSignedNegativeScientificPositiveExponent: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '-12.0E+20');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1.2e21]);
        test.done();
    },

    testScientificNoPoint: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '12E-2');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [0.12]);
        test.done();
    }
};
