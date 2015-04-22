'use strict';

var stream = require('../../lib' + (process.env.MOVICO_COV || '') + '/Parser/stream.js'),
    language = require('../../lib' + (process.env.MOVICO_COV || '') + '/Movico/syntax/language.js')(),
    ast = require('../../lib' + (process.env.MOVICO_COV || '') + '/Movico/syntax/ast.js');

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
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['language_module'] = {
  setUp: function(done) {
    done();
  },
    
  'simple module is accepted': function(test) {
    test.expect(1);
    // tests here  
    var aStream = stream("module Data.Bool model A"),
        aModule = ast.module(["Core","Bool"],[],[ast.model("A",[],[])]);
        
    test.deepEqual(language.parser.group('module').parse(aStream).get(), 
                   aModule,
                   "accept an empty module");
    test.done();
  },    
    
  'simple module with imports is accepted': function(test) {
    test.expect(1);
    // tests here  
    var aStream = stream("module Data.Bool from Data.Test import a model A"),
        aModule = ast.module(["Core","Bool"],[ast.imports(["Core","Test"],["a"])],[ast.model("A",[],[])]);
        
    test.deepEqual(language.parser.group('module').parse(aStream).get(), 
                   aModule,
                   "accept an empty module");
    test.done();
  },    
};