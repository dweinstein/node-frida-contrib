const debug = require('debug');

module.exports = exports = require('rc')('frida-contrib', {
}, require('minimist')( process.argv.slice(2), {
  default: {
    remote: false,
    R: false
  },
  alias: {
    'R': 'remote',
    'U': 'usb'
  }
}));

debug(exports);
