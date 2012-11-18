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


exports.CommentTests = {
    testPoundComment: function(test){
        test.expect(3);
        var result = parseOk(test, '# This is a comment \n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment ');
        test.done();
    },

    testPoundCommentWithoutNewline: function(test){
        test.expect(3);
        var result = parseOk(test, '# This is a comment');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment');
        test.done();
    },

    testSlashComment: function(test){
        test.expect(3);
        var result = parseOk(test, '// This is a comment\n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment');
        test.done();
    },

    testSlashCommentWithoutNewline: function(test){
        test.expect(3);
        var result = parseOk(test, '// This is a comment');
        test.strictEqual(result.length, 1);
        // returns nil in Io
        test.deepEqual(result, ['C: This is a comment']);
        test.done();
    },

    testSlashStarComment: function(test){
        test.expect(3);
        var result = parseOk(test, '/* This is a comment */\n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment ');
        test.done();
    },

    testSlashStarCommentWithoutNewline: function(test){
        test.expect(3);
        var result = parseOk(test, '/* This is a comment */');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment ');
        test.done();
    },

    testMultilineSlashStarComment: function(test){
        test.expect(3);
        var result = parseOk(test, '/* This is a comment \n it continues \n over multiple lines*/\n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment \n it continues \n over multiple lines');
        test.done();
    },

    testMultilineSlashStarCommentWithoutNewline: function(test){
        test.expect(3);
        var result = parseOk(test, '/* This is a comment \n it continues \n over multiple lines*/');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment \n it continues \n over multiple lines');
        test.done();
    },

    testNestedSlashStarComment: function(test){
        test.expect(3);
        var result = parseOk(test, '/* This is /* a nested comment */ */');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is C: a nested comment  ');
        test.done();
    },
};
