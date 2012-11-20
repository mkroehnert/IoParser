var helper = require('./TestHelpers');

exports.StringTests = {
    testEmptyString: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '""');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:']);
        test.done();
    },

    testSomeString: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '"abc"');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:abc']);
        test.done();
    },

    testSomeMoreString: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '"This could be a Hello World 123 ^ str4nge Str!ng"');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:This could be a Hello World 123 ^ str4nge Str!ng']);
        test.done();
    },

    testMultilineString: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '"""abc\ndef"""');
        test.strictEqual(result.length, 1);
        /* result =
        """abc
        def"""
        */
        test.deepEqual(result, ['S:abc\ndef']);
        test.done();
    },

     testEscapedQuote: function(test){
        test.expect(3);
        // escaped \ is needed since \" is regarded as " in Javascript
        var result = helper.parseOk(test, '"abc\\"def"');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:abc\\"def']);
        test.done();
    },

    testBrokenString: function(test){
        test.expect(1);
        helper.parseFail(test, '"Invalid"String"');
        test.done();
    }
};
