/* jshint esnext: true, node: true, newcap: false */
/* global Module, NativeFunction, Interceptor, NativeCallback, log */

'use strict';

/* SSLContextRef SSLCreateContext ( CFAllocatorRef alloc, SSLProtocolSide protocolSide, SSLConnectionType connectionType );
 * */
const SSLCreateContext = new NativeFunction(
  Module.findExportByName("Security", "SSLCreateContext"),
  'pointer',
  ['pointer', 'int', 'int']
);

/* OSStatus SSLHandshake ( SSLContextRef context ); */
const SSLHandshake = new NativeFunction(
  Module.findExportByName("Security", "SSLHandshake"),
  'int',
  ['pointer']
);

/* OSStatus SSLSetSessionOption ( SSLContextRef context, SSLSessionOption option, Boolean value );*/
const SSLSetSessionOption= new NativeFunction(
  Module.findExportByName("Security", "SSLSetSessionOption"),
  'int',
  ['pointer', 'int', 'bool']
);

const errSSLServerAuthCompleted = -9481;
const kSSLSessionOptionBreakOnServerAuth = 0;
const noErr = 0;

console.log('agent: ssl killer running!');

Interceptor.replace(SSLHandshake, new NativeCallback(context => {
  const result = SSLHandshake(context);
  if (result === errSSLServerAuthCompleted) {
    //console.log('SSLHandshake override: ', result);
    return SSLHandshake(context);
  } else {
    //console.log('SSLHandshake(): ', result);
    return result;
  }
}, 'int', ['pointer']));

Interceptor.replace(SSLCreateContext, new NativeCallback((alloc, protocolSide, connectionType) => {
  //console.log('SSLCreateContext: set break on server auth');
  let sslContext = SSLCreateContext(alloc, protocolSide, connectionType);
  SSLSetSessionOption(sslContext, kSSLSessionOptionBreakOnServerAuth, 1);
  return sslContext;
  }, 'pointer', ['pointer', 'int', 'int'])
);

Interceptor.replace(SSLSetSessionOption, new NativeCallback((context, option, value) => {
  if (option === kSSLSessionOptionBreakOnServerAuth) {
    //console.log('SSLSetSessionOption: override', option, '=>', value, ' ignored');
    return noErr;
  }
  return SSLSetSessionOption(context, option, value);
  }, 'int', ['pointer', 'int', 'bool'])
);

