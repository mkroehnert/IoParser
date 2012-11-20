var helper = require('./TestHelpers');

exports.Fragments = {
    testForLoop: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'for(i, 1, 10, i println)\n');
//        test.strictEqual(result.length, 0);
//        test.deepEqual(result, []);
        test.done();
    },

    testIfCondition: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'a := if(b == 0, c + 1, d);');
        // result = setSlot("a", if(b ==(0), c +(1), d))
        test.done();
    },

    testSingleChar: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'n');
        test.done();
    },

    testSingleTerminator: function(test){
        test.expect(1);
        var result = helper.parseOk(test, ' ; ');
        // result = nil
        test.done();
    },

    testNSpace: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'n ');
        test.done();
    },

    testNMinus: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'n - ');
        test.done();
    },

    testArithmeticExpression: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'n - 1');
        // result = n -(1)
        test.done();
    },

    testNoArgument: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'f()');
        // result = f
        test.done();
    },

    testArithmeticExpressionForArgument: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'f(n - 1)');
        // result = f(n -(1))
        test.done();
    },

    testNewline: function(test){
        test.expect(1);
        var result = helper.parseOk(test, 'Account := Object clone\nAccount balance := 0\nAccount deposit := method(amount,\n    balance = balance + amount\n)\n account := Account clone\n account deposit(10.00)\n account balance println\n');
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
        var result = helper.parseOk(test, '3 + \\\n 4');
        // result = 3 +(4)
        test.done();
    }
};
