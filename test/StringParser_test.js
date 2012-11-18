var IoParser = require('../lib/IoParser');

function makeParser(input){
    try{
        console.log(IoParser);
        var result = IoParser.parse(input);
        console.log();
        console.log(input);
        console.log();
        console.log(result);
        return result;
    }
    catch(e){
        var strArray = [];
        var col = e.column;
        for (var i = 0; i < input.length; ++i){
            strArray[i] = '-';
        };
        strArray[col - 1] = '^';

        var out = strArray.join('');
        console.log();
        console.log(input);
        console.log(out);
        console.log();
        console.log(e);
        throw(e);
    }
}


function parseOk(test, input){
    var result;
    test.doesNotThrow(function(){result = makeParser(input)});
    return result;
}

function parseFail(test, input){
    var result;
    test.throws(function(){result = makeParser(input)});
    return result;
}


exports.StringTests = {
    testEmptyString: function(test){
        test.expect(3);
        var result = parseOk(test, '""');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:']);
        test.done();
    },

    testSomeString: function(test){
        test.expect(3);
        var result = parseOk(test, '"abc"');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:abc']);
        test.done();
    },

    testSomeMoreString: function(test){
        test.expect(3);
        var result = parseOk(test, '"This could be a Hello World 123 ^ str4nge Str!ng"');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:This could be a Hello World 123 ^ str4nge Str!ng']);
        test.done();
    },

    testMultilineString: function(test){
        test.expect(3);
        var result = parseOk(test, '"""abc\ndef"""');
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
        var result = parseOk(test, '"abc\\"def"');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['S:abc\\"def']);
        test.done();
    },

    testBrokenString: function(test){
        test.expect(1);
        parseFail(test, '"Invalid"String"');
        test.done();
    }
};
