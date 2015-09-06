/*jshint node: true, esnext: true */
'use strict';

const laif = require('../../common/load-agent-into-frontmost');

module.exports = function(opts) {
  const agent = require('fs').readFileSync(__dirname+'/agent.js').toString();

  return {
    agent: agent,
    getScreenshot: function(device, onScreenshot) {
      return laif(device, {name: 'screenshot', script: agent }, onScreenshot);
    }
  };
};
