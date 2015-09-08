/* jshint node: true, esnext: true */
/* global ObjC, NativeFunction, Process, Memory, Module */

const UIWindow = ObjC.classes.UIWindow;
const CGFloat = (Process.pointerSize === 4) ? 'float' : 'double';
const CGSize = [CGFloat, CGFloat];

const UIGraphicsBeginImageContextWithOptions = new NativeFunction(
  Module.findExportByName('UIKit', 'UIGraphicsBeginImageContextWithOptions'),
  'void',
  [CGSize, 'bool', CGFloat]
);
const UIGraphicsEndImageContext = new NativeFunction(
  Module.findExportByName('UIKit', 'UIGraphicsEndImageContext'),
  'void',
  []
);
const UIGraphicsGetImageFromCurrentImageContext = new NativeFunction(
  Module.findExportByName('UIKit', 'UIGraphicsGetImageFromCurrentImageContext'),
  'pointer',
  []
);
const UIImagePNGRepresentation = new NativeFunction(
  Module.findExportByName('UIKit', 'UIImagePNGRepresentation'),
  'pointer',
  ['pointer']
);

rpc.exports.screenshot = function screenshot() {
  return new Promise(resolve => {
    ObjC.schedule(ObjC.mainQueue, () => {
      const view = UIWindow.keyWindow();
      const bounds = view.bounds();
      const size = bounds[1];
      UIGraphicsBeginImageContextWithOptions(size, 0, 0);

      view.drawViewHierarchyInRect_afterScreenUpdates_(bounds, true);

      const image = UIGraphicsGetImageFromCurrentImageContext();
      UIGraphicsEndImageContext();

      const png = new ObjC.Object(UIImagePNGRepresentation(image));
      return resolve({
        info: {
          timestamp: Date.now(),
          format: 'png',
          width: size[0],
          height: size[1],
          scale: view.contentScaleFactor()
        },
        png: Memory.readByteArray(png.bytes(), png.length())
      });
    });
  });
};

