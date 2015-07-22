const frida = require('frida');
const debug = require('debug')('resolve-device');

/*
 * Resolve device whether remote or USB.
*/
module.exports = function resolveDevice(opts) {
  const device = opts && opts.remote ?
    frida.getRemoteDevice() :
    frida.getUsbDevice();
  return device.then(device => {
    debug(device);
    return device;
  });
};
