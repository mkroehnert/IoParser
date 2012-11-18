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

function parseFail(test, input){
    var result;
    test.throws(function(){result = makeParser(input)});
    return result;
};


exports.ScientificFloatTests = {
    testScientificNegativeExponent: function(test){
        test.expect(3);
        var result = parseOk(test, '12.0E-2');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [1.2e-1]);
        test.done();
    },

    testSignedPositiveScientificNegativeExponent: function(test){
        test.expect(3);
        var result = parseOk(test, '+12.0E-2');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 1.2e-1]);
        test.done();
    },

    testSignedNegativeScientificNegativeExponent: function(test){
        test.expect(3);
        var result = parseOk(test, '-12.0E-2');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1.2e-1]);
        test.done();
    },

    testScientificPositiveExponent: function(test){
        test.expect(3);
        var result = parseOk(test, '12.0E+20');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [1.2e21]);
        test.done();
    },

    testSignedPositiveScientificPositiveExponent: function(test){
        test.expect(3);
        var result = parseOk(test, '+12.0E+20');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:+', 1.2e21]);
        test.done();
    },

    testSignedNegativeScientificPositiveExponent: function(test){
        test.expect(3);
        var result = parseOk(test, '-12.0E+20');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['OP:-', 1.2e21]);
        test.done();
    },

    testScientificNoPoint: function(test){
        test.expect(3);
        var result = parseOk(test, '12E-2');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, [0.12]);
        test.done();
    }
};
