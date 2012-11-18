var fs = require('fs');
var PEG = require("pegjs");
var nodeunit = require('nodeunit').reporters.default;

var ioParserDefinition = "";
ioParserDefinition = fs.readFileSync('./lib/IoParser.peg.js', 'utf8');

try {
    var ioParser = PEG.buildParser(ioParserDefinition);
    fs.writeFileSync('./lib/IoParser.js', 'module.exports = ' + ioParser.toSource(), 'utf8');
    console.log('SUCCESS: IoParser.js generated');
    nodeunit.run(['test']);
}
catch(e) {
    console.log('ERROR: could not generate IoParser.js');
    console.log(e);
    throw e;
}
