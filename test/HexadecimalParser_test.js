var helper = require('./TestHelpers');

exports.HexadecimalTests = {
    testSmallX: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0x123');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0x123);
        test.done();
    },

    testBigX: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0X123');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0x123);
        test.done();
    },

    testLettersUppercase: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0xABCDEF');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0xABCDEF);
        test.done();
    },

    testLettersLowercase: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0xabcdef');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0xABCDEF);
        test.done();
    },

    testLettersUppercaseBigX: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0XABCDEF');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0xABCDEF);
        test.done();
    },

    testLettersLowercaseBigX: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0Xabcdef');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 0xABCDEF);
        test.done();
    },

    testMissingDigits: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0x');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, [0, 'ID:x']);
        test.done();
    },

    testWrongLetterG: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '0xg');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, [0, 'ID:xg']);
        test.done();
    },
};
