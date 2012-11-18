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

exports.Fragments = {
    testForLoop: function(test){
        test.expect(1);
        var result = parseOk(test, 'for(i, 1, 10, i println)\n');
//        test.strictEqual(result.length, 0);
//        test.deepEqual(result, []);
        test.done();
    },

    testIfCondition: function(test){
        test.expect(1);
        var result = parseOk(test, 'a := if(b == 0, c + 1, d);');
        // result = setSlot("a", if(b ==(0), c +(1), d))
        test.done();
    },

    testSingleChar: function(test){
        test.expect(1);
        var result = parseOk(test, 'n');
        test.done();
    },

    testSingleTerminator: function(test){
        test.expect(1);
        var result = parseOk(test, ' ; ');
        // result = nil
        test.done();
    },

    testNSpace: function(test){
        test.expect(1);
        var result = parseOk(test, 'n ');
        test.done();
    },

    testNMinus: function(test){
        test.expect(1);
        var result = parseOk(test, 'n - ');
        test.done();
    },

    testArithmeticExpression: function(test){
        test.expect(1);
        var result = parseOk(test, 'n - 1');
        // result = n -(1)
        test.done();
    },

    testNoArgument: function(test){
        test.expect(1);
        var result = parseOk(test, 'f()');
        // result = f
        test.done();
    },

    testArithmeticExpressionForArgument: function(test){
        test.expect(1);
        var result = parseOk(test, 'f(n - 1)');
        // result = f(n -(1))
        test.done();
    },

    testNewline: function(test){
        test.expect(1);
        var result = parseOk(test, 'Account := Object clone\nAccount balance := 0\nAccount deposit := method(amount,\n    balance = balance + amount\n)\n account := Account clone\n account deposit(10.00)\n account balance println\n');
        /* result =
        setSlotWithType("Account", Object clone) ;
        Account setSlot("balance", 0) ;
        Account setSlot("deposit", method(amount, updateSlot("balance", balance +(amount)))) ;
        setSlot("account", Account clone) ;
        account deposit(10.00) ;
        account balance println
        */
        test.done();
    },

    testSplitExpression: function(test){
        test.expect(1);
        var result = parseOk(test, '3 + \\\n 4');
        // result = 3 +(4)
        test.done();
    }
};
