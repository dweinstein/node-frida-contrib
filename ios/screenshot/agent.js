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

function screenshot(view) {
  const bounds = view.bounds();
  const size = bounds[1];
  UIGraphicsBeginImageContextWithOptions(size, 0, 0);

  view.drawViewHierarchyInRect_afterScreenUpdates_(bounds, true);

  const image = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();

  const png = new ObjC.Object(UIImagePNGRepresentation(image));
  send({
    name: '+screenshot',
    info: {
      timestamp: Date.now(),
      format: 'png'
    }
  }, Memory.readByteArray(png.bytes(), png.length()));
}

ObjC.schedule(ObjC.mainQueue, () => {
  const window = UIWindow.keyWindow();
  screenshot(window);
});
