'use strict';

var expect = require('expect');

var glogg = require('../');

describe('glogg', function() {

  var logger;

  beforeEach(function(done) {
    logger = glogg('glogg-test');
    done();
  });

  afterEach(function(done) {
    logger.remove();
    done();
  });

  it('emits a debug event when debug method is called', function(done) {
    logger.on('debug', function(msg){
      expect(msg).toEqual('test');
      done();
    });

    logger.debug('test');
  });

  it('emits a info event when info method is called', function(done) {
    logger.on('info', function(msg){
      expect(msg).toEqual('test');
      done();
    });

    logger.info('test');
  });

  it('emits a warn event when warn method is called', function(done) {
    logger.on('warn', function(msg){
      expect(msg).toEqual('test');
      done();
    });

    logger.warn('test');
  });

  it('emits a error event when error method is called', function(done) {
    logger.on('error', function(msg){
      expect(msg).toEqual('test');
      done();
    });

    logger.error('test');
  });

  it('formats a string message with util.format syntax', function(done) {
    logger.on('debug', function(msg){
      expect(msg).toEqual('test something');
      done();
    });

    logger.debug('test %s', 'something');
  });

  it('does not format a non-string message', function(done) {
    var expected = { test: 'something' };

    logger.on('debug', function(msg){
      expect(msg).toEqual(expected);
      done();
    });

    logger.debug(expected);
  });

  it('allows you to "destructure" the individual log-level functions', function(done) {
    var debug = logger.debug;

    logger.on('debug', function(msg){
      expect(msg).toEqual('test');
      done();
    });

    debug('test');
  });
});
