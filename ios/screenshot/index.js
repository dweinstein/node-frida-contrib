/*jshint node: true, esnext: true */
'use strict';

const laif = require('../../common/load-agent-into-frontmost');
const co = require('co');
const debug = require('debug')('screenshot/index.js');

module.exports = function(opts) {
  const agent = require('fs').readFileSync(__dirname+'/agent.js').toString();

  return {
    agent: agent,
    getScreenshot: co.wrap(function*(device) {
      const rpc = yield laif(device, {name: 'screenshot', script: agent });
      const screenshot = yield rpc.screenshot();
      //screenshot.png = new Buffer(screenshot.png);
      return screenshot;
    })
  };
};
