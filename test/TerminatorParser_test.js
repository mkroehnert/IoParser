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
}


exports.TerminatorTests = {
    testEmptyInput: function(test){
        test.expect(3);
        var result = parseOk(test, '');
        test.strictEqual(result.length, 0);
        test.deepEqual(result, []);
        test.done();
    },
    testSemicolon: function(test){
        test.expect(3);
        var result = parseOk(test, ';');
        // result = nil
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['T']);
        test.done();
    },
    testNewline: function(test){
        test.expect(3);
        var result = parseOk(test, '\n');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['T']);
        test.done();
    },
    testCarriageReturn: function(test){
        test.expect(1);
        parseFail(test, '\r');
        test.done();
    },
    testCarriageReturnNewline: function(test){
        test.expect(3);
        var result = parseOk(test, '\r\n');
        test.strictEqual(result.length, 1);
        test.deepEqual(result, ['T']);
        test.done();
    }
};
