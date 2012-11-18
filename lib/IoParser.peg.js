/*
Io Language Definition
http://iolanguage.org/scm/io/docs/IoGuide.html#Appendix
*/

start
    = Expression
    / EOF

EOF = !.

/**
 * Messages
 */
Expression = expressionHelper*
expressionHelper = separator* t:Terminator separator* {return t;}
           / separator* c:Comment separator* {return c;}
           / separator* m:Message separator* {return m;}


Message = padding* s:Symbol (separator / Comment)* args:argumentList {return [s].concat(args);}
        / padding* s:Symbol (separator / Comment)* {return s;}
        // brackets are also recognized without preceding symbol
        / padding* args:argumentList (separator / Comment)* {return args;}

argumentList = '()' {return ['roundBrackets'];}
             / '[]' {return ['squareBrackets'];}
             / '{}' {return ['curlyBrackets'];}
             / '(' args:firstArgument ')' {return ['roundBrackets', args];}
             / '[' args:firstArgument ']' {return ['squareBrackets', args];}
             / '{' args:firstArgument '}' {return ['curlyBrackets', args];}
             / '(' args:(firstArgument (nextArgument)+) ')' {return ['roundBrackets', args];}
             / '[' args:(firstArgument (nextArgument)+) ']' {return ['squareBrackets', args];}
             / '{' args:(firstArgument (nextArgument)+) '}' {return ['curlyBrackets', args];}
firstArgument = padding* exp:Expression padding* {return exp;}
nextArgument  = ',' padding* exp:Expression padding* {return exp;}

padding = (whitespace / Comment)


/**
 * Symbols
 */
Symbol     = Number
           / Operator
           / Identifier
           / Quote
Identifier = i:(Letter / Digit / SpecialChar)+ {return 'ID:' + i.join('');}
Operator   = !'\0' operator:OperatorChar+ {return 'OP:' + operator.join('');}


/**
 * Comments
 */
Comment           = slashStarComment / slashSlashComment / poundComment
                  // handles nested /* comments
slashStarComment  = '/*' c:(slashStarComment / [^'*/'])* '*/' ('\n' / EOF)? {return 'C:' + c.join('');}
slashSlashComment = '//' c:[^'\n']* ('\n' / EOF) {return 'C:' + c.join('');}
poundComment      = '#' c:[^'\n']* ('\n' / EOF) {return 'C:' + c.join('');}


/**
 * Quotes
 */
// Quote aka String
Quote     = TriQuote / MonoQuote
TriQuote  = '"""' s:[^'"""']* '"""' {return 'S:' + s.join('');}
MonoQuote = ["] s:('\\"' / [^"])* ["] {return 'S:' + s.join('');}


// check [] and {} special cases -> currently removed: \{\}\[\]
OperatorChar = ':' / '\'' / '~' / '!' / '@' / '$'
             / '%' / '^' / '&' / '*' / '-' / '+'
             / '=' / '|' / '\\' / '<' / '>' / '?' / '/'

Letter       = l:[a-zA-Z:] {return l;} // nonASCII-Char missing
SpecialChar  = s:[._] {return s;}


/**
 * Spans
 */
Terminator = separator* (';' / '\n') separator* {return 'T';}
separator  = ( ' ' / '\f' / '\r' / '\t' / '\v')+ {return 'S'}
           // an expression can be continued with \ on the following line
           / '\\' (' ' / '\f' / '\r' / '\t' / '\v')+ '\n' {return 'S'}
whitespace = (' ' / '\f' / '\r' / '\t' / '\v' / '\n')+ {return 'W';}


/**
 * Numbers
 */
Number    = HexNumber / Decimal
HexNumber = '0' [xX] d:hexLetter+ {return parseInt(d.join(''), 16);}
hexLetter = [0-9a-fA-F]
Decimal   = d:digits? '.' c:digits exp:exponent? {return parseFloat(d + '.' + c + exp);}
          / d:digits exp:exponent? {return parseFloat(d + exp);}

exponent  = [eE] sign:[-+]? d:digits+ {return 'e' + sign + d;}

Digit  = [0-9]
digits = d:Digit+ {return d.join('');}
