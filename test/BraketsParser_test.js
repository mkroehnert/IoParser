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


exports.Identifier = {
    testEmptyRoundBrackets: function(test){
        test.expect(3);
        var result = parseOk(test, '()');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['roundBrackets'] ]);
        test.done();
    },

    testRoundBrackets: function(test){
        test.expect(3);
        var result = parseOk(test, '(12)');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['roundBrackets', [12]] ]);
        test.done();
    },

    testEmptyBrackets: function(test){
        test.expect(3);
        var result = parseOk(test, '{}');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['curlyBrackets'] ]);
        test.done();
    },

    testCurlyBrackets: function(test){
        test.expect(3);
        var result = parseOk(test, '{12}');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['curlyBrackets', [12]] ]);
        test.done();
    },

    testEmptySquareBrackets: function(test){
        test.expect(3);
        var result = parseOk(test, '[]');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['squareBrackets'] ]);
        test.done();
    },

    testSquareBrackets: function(test){
        test.expect(3);
        var result = parseOk(test, '[12]');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [ ['squareBrackets', [12]] ]);
        test.done();
    },
};
