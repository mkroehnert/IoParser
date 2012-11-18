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
};


function parseOk(test, input){
    var result;
    test.doesNotThrow(function(){result = makeParser(input)});
    return result;
};


exports.IntegerTests = {
    testNumber: function(test){
        test.expect(3);
        var result = parseOk(test, '133');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [133]);
        test.done();
    },

    testPositiveSignNumber: function(test){
        test.expect(3);
        var result = parseOk(test, '+15464');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 15464]);
        test.done();
    },

    testNegativeSignNumber: function(test){
        test.expect(3);
        var result = parseOk(test, '-1456');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1456]);
        test.done();
    },

    testNumberStartingZero: function(test){
        test.expect(3);
        var result = parseOk(test, '01356');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [1356]);
        test.done();
    },

    testNegativeSignNumberStartingZero: function(test){
        test.expect(3);
        var result = parseOk(test, '-01456');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1456]);
        test.done();
    },

    testPositiveSignNumberStartingZero: function(test){
        test.expect(3);
        var result = parseOk(test, '+01456');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 1456]);
        test.done();
    }
};
