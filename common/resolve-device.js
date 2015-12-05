const frida = require('frida');
const debug = require('debug')('resolve-device');
const co = require('co');

/*
 * Resolve device whether remote or USB.
*/
module.exports = co.wrap(function* (opts) {
  opts = opts || require('../config');
  const device = opts && opts.remote ?
    yield frida.getRemoteDevice() :
    yield frida.getUsbDevice();
  debug(device);
  return device;
});
