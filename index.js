'use strict';

var format = require('util').format;

var sparkles = require('sparkles');

var levels = ['debug', 'info', 'warn', 'error'];

function getLogger(namespace) {
  var logger = sparkles(namespace);

  levels.forEach(function (level) {
    logger[level] = makeLogLevel(logger, level);
  });

  return logger;
}

function makeLogLevel(self, level) {
  return function (msg) {
    if (typeof msg === 'string') {
      self.emit(level, format.apply(null, arguments));
    } else {
      var args = Array.prototype.slice.call(arguments);
      self.emit.apply(self, [level].concat(args));
    }
  };
}

module.exports = getLogger;
