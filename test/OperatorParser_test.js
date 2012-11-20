var helper = require('./TestHelpers');

exports.OperatorParserTests = {
    testEmptyInput: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '');
        test.strictEqual(result.length, 0);
        test.deepEqual(result, []);
        test.done();
    },
};
