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
    test.throws(function(){makeParser(input)});
}
