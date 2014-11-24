'use strict';

var stream = require('../../src/Analyser/stream.js').stream,
    language = require('../../src/Movico/language.js').language,
    ast = require('../../src/Movico/ast.js').ast;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['language_params'] = {
  setUp: function(done) {
    done();
  },
    
  'simple typed param is accepted': function(test) {
    test.expect(1);
    // tests here  
    var aStream = stream("age : int");
        
    test.ok(language.parser.group('params').parse(aStream).isPresent(), 
            "accept int type");
    test.done();
  },
    
  'simple typed param is accepted and ast params is correct': function(test) {
    test.expect(1);
    // tests here  
    var aStream = stream("age : int");
        
    test.deepEqual(language.parser.group('params').parse(aStream).get(), 
                   [ ast.param('age', ast.type()) ],  "provide one param");
    test.done();
  },

  'simple untyped param is rejected and ast params is empty': function(test) {
    test.expect(1);
    // tests here  
    var aStream = stream("age : ");
        
    test.deepEqual(language.parser.group('params').parse(aStream).get(),
                   [],  "provide no params");
    test.done();
  },

  'mutiple typed param is accepted and ast params is correct': function(test) {
    test.expect(1);
    // tests here  
    var aStream = stream("age : int address: string");
        
    test.deepEqual(language.parser.group('params').parse(aStream).get(), 
                   [ ast.param('age', ast.type()), ast.param('address', ast.type()) ],  "provide two params");
    test.done();
  },
};