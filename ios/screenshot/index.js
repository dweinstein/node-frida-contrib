/*jshint node: true, esnext: true */
'use strict';

const laif = require('../../common/load-agent-into-frontmost');

module.exports = function(opts) {
  const agent = require('fs').readFileSync(__dirname+'/agent.js').toString();

  return {
    agent: agent,
    getScreenshot: function(device, onScreenshot) {
      return laif(device, {name: 'screenshot', script: agent }, function (msg, data) {
        const payload = msg.payload;
        const info = payload.info;
        if (!info) {
          onScreenshot(new Error("could not obtain screenshot"));
        }
        return onScreenshot(null, {
          timestamp: info.timestamp,
          pixels: data,
          width: info.width,
          height: info.height,
          format: info.format
        });
      });
    }
  };
};
