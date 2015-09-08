/*jshint node: true, esnext: true */
'use strict';

const co = require('co');
const frida = require('frida');
const debug = require('debug')('load-agent-into-frontmost');
const assert = require('assert');

module.exports = co.wrap(function* (device, agent, onMessage) {
  assert(device, 'require device');
  assert(agent.script, 'require agent.script');
  assert(agent.name, 'require agent.name');

  const application = yield device.getFrontmostApplication();
  if (application === null) {
    throw new Error('no frontmost');
  }
  debug(application);
  const session = yield device.attach(application.pid);
  const script = yield session.createScript(agent.script, { name: agent.name });
  debug('before load');
  yield script.load();
  debug('after load');

  script.events.listen(
    'message',
    typeof onMessage === 'function' ?  onMessage : function (msg) {
      console.log(msg);
    }
  );

  yield script.postMessage({});
  debug('loaded');
  return yield script.getExports();
});
