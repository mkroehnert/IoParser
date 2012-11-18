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


exports.IdentifierTests = {
    testLowercaseIdentifier: function(test){
        test.expect(3);
        var result = parseOk(test, 'identifier');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'ID:identifier');
        test.done();
    },

    testUppercaseIdentifier: function(test){
        test.expect(3);
        var result = parseOk(test, 'Identifier');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'ID:Identifier');
        test.done();
    },

    testIdentifierIncludingNumber: function(test){
        test.expect(3);
        var result = parseOk(test, 'identifier12343');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'ID:identifier12343');
        test.done();
    },

    testSingleIdentifierWithSemicolon: function(test){
        test.expect(3);
        var result = parseOk(test, 'clone;');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:clone', 'T']);
        test.done();
    },

    testSingleUppercaseIdentifierWithSemicolon: function(test){
        test.expect(3);
        var result = parseOk(test, 'Regex;');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:Regex', 'T']);
        test.done();
    },

    testSingleIdentifierWithNewline: function(test){
        test.expect(3);
        var result = parseOk(test, 'Object\n');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:Object', 'T']);
        test.done();
    },

    testIdentifierFollowingNumber: function(test){
        test.expect(3);
        var result = parseOk(test, '21identifier');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, [21, 'ID:identifier']);
        test.done();
    },

    testDoubleIdentifier: function(test){
        test.expect(3);
        var result = parseOk(test, 'List;  Object;');
        test.strictEqual(result.length, 4);
        test.deepEqual(result, ['ID:List', 'T', 'ID:Object', 'T']);
        test.done();
    },

    testMixedCaseDoubleIdentifier: function(test){
        test.expect(3);
        var result = parseOk(test, 'identifierName;identifierName2;');
        test.strictEqual(result.length, 4);
        test.deepEqual(result, ['ID:identifierName', 'T', 'ID:identifierName2', 'T']);
        test.done();
    },

};
