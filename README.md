# SYNOPSIS

A collection of utilities that use [frida](http://www.frida.re/)

# INSTALL

```
npm install -g frida-contrib
```

# USAGE

## common

### LIST APPS

```
± frida-list-apps
Name             Identifier                     PID
---------------  -----------------------------  ---
App Store        com.apple.AppStore             -  
Calculator       com.apple.calculator           -  
Calendar         com.apple.mobilecal            -  
Camera           com.apple.camera               -  
Clock            com.apple.mobiletimer          -  
Compass          com.apple.compass              -  
Contacts         com.apple.MobileAddressBook    -  
Cydia            com.saurik.Cydia               -  
FaceTime         com.apple.facetime             -  
Game Center      com.apple.gamecenter           -  
Health           com.apple.Health               -  
Mail             com.apple.mobilemail           412
Maps             com.apple.Maps                 -  
Messages         com.apple.MobileSMS            -  
...
```

## iOS

### DUMP UI ELEMENTS
Dump the serialized UI.

```shell
± frida-ios-dump-ui | gist
https://gist.github.com/7ec87584eebfd81e734f
```

### SSL Killer

[ios-ssl-kill-switch](https://github.com/iSECPartners/ios-ssl-kill-switch) ported to Frida. This tool will kill SSL on the frontmost application at the of execution.

```shell
± frida-ios-ssl-ui
```

