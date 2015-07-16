'use strict';

var atry = require('../../lib' + (process.env.THICKET_COV || '') + '/Data/atry.js');

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

exports['atry'] = {
  setUp: function(done) {
    done();
  },
    
  'atry success': function(test) {
    test.expect(1);
    // tests here  
    test.ok(atry.success(1).isSuccess(), 'should be success.');
    test.done();
  },
    
  'atry failure': function(test) {
    test.expect(1);
    // tests here  
    test.ok(atry.failure(1).isFailure(), 'should be failure.');
    test.done();
  },
     
  'atry success map can be a success': function(test) {
    test.expect(1);
    // tests here  
    test.ok(atry.success(1).map(function (i) { return i+1; }).isSuccess(), 'should be success.');
    test.done();
  },
     
  'atry success map can be a failure': function(test) {
    test.expect(1);
    // tests here  
    test.ok(atry.success(1).map(function () { throw new Error(); }).isFailure(), 'should be failure.');
    test.done();
  },
     
  'atry success map': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).map(function (i) { return i+1; }).success(), 2, 'should be success.');
    test.done();
  },
     
  'atry failure map is a failure': function(test) {
    test.expect(1);
    // tests here  
    test.ok(atry.failure(1).map(function (i) { return i+1; }).isFailure(), 'should be failure.');
    test.done();
  },
     
  'atry failure map': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.failure(1).map(function (i) { return i+1; }).failure(), 1, 'should be failure.');
    test.done();
  },
     
  'atry success flatmap of atry': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).flatmap(function (i) { return atry.success(i+1); }).success(), 2, 'should be success.');
    test.done();
  },
         
  'atry failure flatmap of int': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.failure(1).flatmap(function (i) { return i+1; }).failure(), 1, 'should be failure.');
    test.done();
  },
         
  'atry failure flatmap of Error': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).flatmap(function () { throw 1; }).failure(), 1, 'should be failure.');
    test.done();
  },
         
  'atry success recoverWith': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).recoverWith(2), 1, 'should be success.');
    test.done();
  },
         
  'atry failure recoverWith': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.failure(1).recoverWith(2), 2, 'should be failure.');
    test.done();
  },
         
  'atry success lazyRecoverWith': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).lazyRecoverWith(function() { return 2; }), 1, 'should be success.');
    test.done();
  },
         
  'atry failure lazyRecoverWith': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.failure(1).lazyRecoverWith(function() { return 2; }), 2, 'should be failure.');
    test.done();
  },
         
  'atry success filter': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).filter(function (v) { return v === 1; }).isSuccess(), true, 'should be success.');
    test.done();
  },
         
  'atry success wrong filter': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.success(1).filter(function (v) { return v === 2; }).isFailure(), true, 'should be failure.');
    test.done();
  },
         
  'atry failure filter': function(test) {
    test.expect(1);
    // tests here  
    test.equal(atry.failure(1).filter(function (v) { return v === 1; }).isFailure(), true, 'should be failure.');
    test.done();
  },

};
