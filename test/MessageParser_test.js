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


exports.MessageTests = {
    testMessageNoParenthesis: function(test){
        test.expect(3);
        var result = parseOk(test, 'people select');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', 'ID:select']);
        test.done();
    },

    testMessageNoParameter: function(test){
        test.expect(3);
        var result = parseOk(test, 'people select()');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets'] ]);
        test.done();
    },

    testMessageOneParameter: function(test){
        test.expect(3);
        var result = parseOk(test, 'people select(person)');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', ['ID:person']]]);
        test.done();
    },

    testMessageTwoParameter: function(test){
        test.expect(3);
        var result = parseOk(test, 'people select(person,age)');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', [['ID:person'], [['ID:age']]]]]);
        test.done();
    },

    testMessageThreeParameter: function(test){
        test.expect(3);
        var result = parseOk(test, 'people select(person,age,old)');
        test.strictEqual(result.length, 2);
        // TODO needs bracket open + close for delimiting Arguments
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', [['ID:person'], [['ID:age'], ['ID:old']]]]]);
        test.done();
    },

    testMessageParameterExpression: function(test){
        test.expect(3);
        var result = parseOk(test, 'people select(person age)');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', ['ID:person', 'ID:age']]]);
        test.done();
    }
};
