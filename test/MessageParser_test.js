var helper = require('./TestHelpers');

exports.MessageTests = {
    testMessageNoParenthesis: function(test){
        test.expect(3);
        var result = helper.parseOk(test, 'people select');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', 'ID:select']);
        test.done();
    },

    testMessageNoParameter: function(test){
        test.expect(3);
        var result = helper.parseOk(test, 'people select()');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets'] ]);
        test.done();
    },

    testMessageOneParameter: function(test){
        test.expect(3);
        var result = helper.parseOk(test, 'people select(person)');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', ['ID:person']]]);
        test.done();
    },

    testMessageTwoParameter: function(test){
        test.expect(3);
        var result = helper.parseOk(test, 'people select(person,age)');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', [['ID:person'], [['ID:age']]]]]);
        test.done();
    },

    testMessageThreeParameter: function(test){
        test.expect(3);
        var result = helper.parseOk(test, 'people select(person,age,old)');
        test.strictEqual(result.length, 2);
        // TODO needs bracket open + close for delimiting Arguments
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', [['ID:person'], [['ID:age'], ['ID:old']]]]]);
        test.done();
    },

    testMessageParameterExpression: function(test){
        test.expect(3);
        var result = helper.parseOk(test, 'people select(person age)');
        test.strictEqual(result.length, 2);
        test.deepEqual(result, ['ID:people', ['ID:select', 'roundBrackets', ['ID:person', 'ID:age']]]);
        test.done();
    }
};
