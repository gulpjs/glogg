"use strict";

var assert = require("node:assert");
var { afterEach, beforeEach, describe, it } = require("node:test");

var sparklesLegacy = require("sparkles/legacy");

var glogg = require("../");

describe("glogg", function () {
  var logger;

  beforeEach(function (t, done) {
    logger = glogg("glogg-test");
    done();
  });

  afterEach(function (t, done) {
    logger.remove();
    done();
  });

  it("emits a debug event when debug method is called", function (t, done) {
    logger.on("debug", function (msg) {
      assert.deepStrictEqual("test", msg);
      done();
    });

    logger.debug("test");
  });

  it("emits a info event when info method is called", function (t, done) {
    logger.on("info", function (msg) {
      assert.deepStrictEqual("test", msg);
      done();
    });

    logger.info("test");
  });

  it("emits a warn event when warn method is called", function (t, done) {
    logger.on("warn", function (msg) {
      assert.deepStrictEqual("test", msg);
      done();
    });

    logger.warn("test");
  });

  it("emits a error event when error method is called", function (t, done) {
    logger.on("error", function (msg) {
      assert.deepStrictEqual("test", msg);
      done();
    });

    logger.error("test");
  });

  it("formats a string message with util.format syntax", function (t, done) {
    logger.on("debug", function (msg) {
      assert.deepStrictEqual(msg, "test something");
      done();
    });

    logger.debug("test %s", "something");
  });

  it("does not format a non-string message", function (t, done) {
    var expected = { test: "something" };

    logger.on("debug", function (msg) {
      assert.deepStrictEqual(msg, expected);
      done();
    });

    logger.debug(expected);
  });

  it("emits all arguments to the log if non-string message", function (t, done) {
    var expected = { test: "something" };

    logger.on("debug", function (msg, extra) {
      assert.deepStrictEqual(msg, expected);
      assert.deepStrictEqual(extra, true);
      done();
    });

    logger.debug(expected, true);
  });

  it('allows you to "destructure" the individual log-level functions', function (t, done) {
    var debug = logger.debug;

    logger.on("debug", function (msg) {
      assert.deepStrictEqual("test", msg);
      done();
    });

    debug("test");
  });
});

describe("events on legacy namespace", function () {
  var logger;
  var legacy;

  beforeEach(function (t, done) {
    var namespace = "glogg-test";
    logger = glogg(namespace);
    legacy = sparklesLegacy(namespace);
    done();
  });

  afterEach(function (t, done) {
    logger.remove();
    legacy.remove();
    done();
  });

  it("emits deprecated event and forwards debug to logger", function (t, done) {
    var deprecated = false;
    logger.on("deprecated", function () {
      deprecated = true;
    });

    logger.on("debug", function (msg) {
      assert.deepStrictEqual(deprecated, true);
      assert.deepStrictEqual("test", msg);
      done();
    });

    legacy.emit("debug", "test");
  });

  it("emits deprecated event and forwards info to logger", function (t, done) {
    var deprecated = false;
    logger.on("deprecated", function () {
      deprecated = true;
    });

    logger.on("info", function (msg) {
      assert.deepStrictEqual(deprecated, true);
      assert.deepStrictEqual("test", msg);
      done();
    });

    legacy.emit("info", "test");
  });

  it("emits deprecated event and forwards warn to logger", function (t, done) {
    var deprecated = false;
    logger.on("deprecated", function () {
      deprecated = true;
    });

    logger.on("warn", function (msg) {
      assert.deepStrictEqual(deprecated, true);
      assert.deepStrictEqual("test", msg);
      done();
    });

    legacy.emit("warn", "test");
  });

  it("emits deprecated event and forwards error to logger", function (t, done) {
    var deprecated = false;
    logger.on("deprecated", function () {
      deprecated = true;
    });

    logger.on("error", function (msg) {
      assert.deepStrictEqual(deprecated, true);
      assert.deepStrictEqual("test", msg);
      done();
    });

    legacy.emit("error", "test");
  });
});
