var IoParser = require('../lib/IoParser');

/*
module.exports = function() {
    var parseInput = function (input){
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
            }
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
    
    var parseOk = function(test, input){
        var result;
        test.doesNotThrow(function(){result = parseInput(input)});
        return result;
    };
    
    var parseFail = function(test, input){
        test.throws(function(){parseInput(input)});
    };
    
    return {
        parseOk: parseOk,
        parseFail: parseFail,
        test: function(test){
            test.expect(0);
            test.done();
        }
    };
}();
*/


function TestHelpers() {
}

TestHelpers.parseInput = function (input){
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
        }
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

TestHelpers.prototype.parseOk = function(test, input){
    var result;
    test.doesNotThrow(function(){result = TestHelpers.parseInput(input)});
    return result;
};

TestHelpers.prototype.parseFail = function(test, input){
    test.throws(function(){TestHelpers.parseInput(input)});
};

module.exports = new TestHelpers();
