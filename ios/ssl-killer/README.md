# Prior work

This contrib is based on the work by [iSECPartners ios-ssl-kill-switch](https://github.com/iSECPartners/ios-ssl-kill-switch). This is a port of basically the same implementation to (IMO) a more flexible tool, [Frida](http://www.frida.re/docs/ios/)

The interested reader should consult the following references for prior work:
- [Blackhat presentation](https://github.com/iSECPartners/ios-ssl-kill-switch/blob/master/BH2012_MobileCertificatePinning.pdf)
- [nable-c0d3](https://nabla-c0d3.github.io/blog/2013/08/20/ios-ssl-kill-switch-v0-dot-5-released/)

# agent

This is the agent logic injected into an application to disable SSL pinning using the aforementioned technique.

# bin/ssl-killer

This bin script will be installed into the global namespace if you install the `node-frida-contrib` tool using the `-g` option. The script will install the agent into the front-most application that is on the screen of the device at the time of running.

# TODO

- [ ] disable the relevant cache mechanisms where appropriate, re: [cache access](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/URLLoadingSystem/Concepts/CachePolicies.html)
