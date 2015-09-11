# glogg

[![Travis Build Status](https://img.shields.io/travis/undertakerjs/glogg/master.svg?label=travis&style=flat-square)](https://travis-ci.org/undertakerjs/glogg)

Global logging utility

## Usage

```js
var getLogger = require('glogg');

var logger = getLogger('my-namespace');

// logs strings
logger.debug('The MOST verbose!');
logger.info('Some important info');
logger.warn('All the warnings to you');
logger.error('OH NO! SOMETHING HAPPENED!');

// supports util.format!
logger.info('%s style!', 'printf');

// log anything
logger.debug({ my: 'obj' });
logger.info([1, 2, 3]);

// somewhere else
logger.on('info', function(msg){
  // do something with msg
});
```

## API

This module augments a [`sparkles`]() EventEmitter object with 4 methods:
`debug()`, `info()`, `warn()` and `error()`. When called, these methods emit
an event with the same name.  If the first argument is a string, the arguments
are passed through node's `util.format()` before being emitted.  Other parts
of a node program can get the logger by namespace and listen for the events to
be emitted.

__Note: This module makes no assumptions about the log levels and they will always
be emitted.  If you are looking to filter some out, your listeners will need to have
extra logic.__

### debug(msg...)

Emits a `debug` event with the given arguments.

If the first argument is a string, the arguments are passed through node's
`util.format()` before being emitted.

### info(msg...)

Emits a `info` event with the given arguments.

If the first argument is a string, the arguments are passed through node's
`util.format()` before being emitted.

### warn(msg...)

Emits a `warn` event with the given arguments.

If the first argument is a string, the arguments are passed through node's
`util.format()` before being emitted.

### error(msg...)

Emits a `error` event with the given arguments.

If the first argument is a string, the arguments are passed through node's
`util.format()` before being emitted.

__Note: You must handle this event in some way or the node process will crash
when an `error` event is emitted.__

## License

MIT
