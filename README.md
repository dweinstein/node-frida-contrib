# SYNOPSIS

A collection of utilities that use [frida](http://www.frida.re/).

# INSTALL

For setting up Frida on your jailbroken iOS device via Cydia, check out [the instructions](http://www.frida.re/docs/ios/). You'll want to have installed Frida version >= 4.4.0 installed on the device.

```
npm install -g frida-contrib
```

# USAGE

The library exports a few bins for convenience that will be installed globally if you use the `-g` option above.

## common

### LIST APPS

```
± frida-list-apps
Running  Name          Identifier                   PID
-------  ------------  ---------------------------  ---
-        App Store     com.apple.AppStore           -
-        Apple Watch   com.apple.Bridge             -
-        Calculator    com.insitusec.Calculator     -
-        Calculator    com.apple.calculator         -
-        Calendar      com.apple.mobilecal          -
-        Camera        com.apple.camera             -
-        Clock         com.apple.mobiletimer        -
-        Compass       com.apple.compass            -
-        Contacts      com.apple.MobileAddressBook  -
-        Cydia         com.saurik.Cydia             -
-        FaceTime      com.apple.facetime           -
-        FileBrowser   com.insitusec.FileBrowser    -
-        Game Center   com.apple.gamecenter         -
-        Health        com.apple.Health             -
R        Mail          com.apple.mobilemail         169
-        Maps          com.apple.Maps               -
-        Messages      com.apple.MobileSMS          -
-        Music         com.apple.Music              -
-        Notes         com.apple.mobilenotes        -
-        Passbook      com.apple.Passbook           -
-        Phone         com.apple.mobilephone        -
-        Photos        com.apple.mobileslideshow    -
-        Podcasts      com.apple.podcasts           -
-        Reminders     com.apple.reminders          -
R        Safari        com.apple.mobilesafari       315
-        Settings      com.apple.Preferences        -
-        Starbucks     com.starbucks.mystarbucks    -
-        Stocks        com.apple.stocks             -
-        Tips          com.apple.tips               -
-        Videos        com.apple.videos             -
-        Voice Memos   com.apple.VoiceMemos         -
-        Weather       com.apple.weather            -
-        iBooks        com.apple.iBooks             -
-        iTunes Store  com.apple.MobileStore        -
```

## iOS

### Screenshot

Take a screen shot of the front-most application. Writes a file with `"png"` extension to your current directory with a timestamp.

```shell
± frida-ios-screenshot
```

### DUMP UI ELEMENTS
Dump the serialized UI.

```shell
± frida-ios-dump-ui | gist
https://gist.github.com/7ec87584eebfd81e734f
```

### SSL Killer

[ios-ssl-kill-switch](https://github.com/iSECPartners/ios-ssl-kill-switch) ported to Frida. This tool will kill SSL on the frontmost application.

```shell
± frida-ios-ssl-ui
```

