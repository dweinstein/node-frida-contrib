/*jshint node: true, esnext: true */
'use strict';

const co = require('co');
const frida = require('frida');
const debug = require('debug')('load-agent-into-frontmost');

module.exports = co.wrap(function* (agent, onMessage) {
  const device = yield frida.getUsbDevice();
  const application = yield device.getFrontmostApplication();
  if (application === null) {
    throw new Error('no frontmost');
  }
  debug(application);
  const session = yield device.attach(application.pid);
  const script = yield session.createScript(agent, { name: 'uispy' });
  debug('before load');
  yield script.load();
  debug('after load');
  yield script.postMessage({});
  script.events.listen('message', onMessage);
  debug('loaded');
});
