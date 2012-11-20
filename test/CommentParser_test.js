var helper = require('./TestHelpers');

exports.CommentTests = {
    testPoundComment: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '# This is a comment \n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment ');
        test.done();
    },

    testPoundCommentWithoutNewline: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '# This is a comment');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment');
        test.done();
    },

    testSlashComment: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '// This is a comment\n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment');
        test.done();
    },

    testSlashCommentWithoutNewline: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '// This is a comment');
        test.strictEqual(result.length, 1);
        // returns nil in Io
        test.deepEqual(result, ['C: This is a comment']);
        test.done();
    },

    testSlashStarComment: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '/* This is a comment */\n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment ');
        test.done();
    },

    testSlashStarCommentWithoutNewline: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '/* This is a comment */');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment ');
        test.done();
    },

    testMultilineSlashStarComment: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '/* This is a comment \n it continues \n over multiple lines*/\n');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment \n it continues \n over multiple lines');
        test.done();
    },

    testMultilineSlashStarCommentWithoutNewline: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '/* This is a comment \n it continues \n over multiple lines*/');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is a comment \n it continues \n over multiple lines');
        test.done();
    },

    testNestedSlashStarComment: function(test){
        test.expect(3);
        var result = helper.parseOk(test, '/* This is /* a nested comment */ */');
        test.strictEqual(result.length, 1);
        test.strictEqual(result[0], 'C: This is C: a nested comment  ');
        test.done();
    },
};
