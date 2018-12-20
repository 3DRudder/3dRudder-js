![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![language](https://img.shields.io/badge/Language-javascript-green.svg) 
![Node.js](https://img.shields.io/badge/Node.js-v8.9.1-green.svg)

|      Browsers     | HTTP/WS  | HTTPS/WSS  | File://  |
|:--------------:|:--------:|:--------:|:--------:|
|   Chrome   |    ✔     |    ✔     |    ✔     |
|   FireFox  |    ✔     |    ✔    |    ✔     |
|   Edge   |    ✔     |    ✔    |    :x:     |
|   Safari   |    :warning:     |    :warning:     |    :warning:     |

# 3dRudderjs v2.0.0

# Installation
* **Node** ```npm install 3drudder-js```

## API Documentation on [Wiki](https://github.com/3DRudder/3dRudder-js/wiki/API-doc)

# Usage
## Node.js
```javascript
var Sdk3dRudder = require('3drudder-js');
// default options {host: "127.51.100.82", port: 15698, schemeWs: "wss", autoReconnect: false, autoReconnectInterval: 5000 /*ms*/};
var SDK = new Sdk3dRudder(); 
or
// with options
var opts = {host: "127.0.0.0", port: 1234, schemeWs: "ws", autoReconnect: true, autoReconnectInterval: 1000 /*1 sec*/};
var SDK = new Sdk3dRudder(opts);

SDK.init();
var rudder = SDK.controllers[0];
// if you want to custom the behaviour of 3dRudder
/* by default {roll2YawCompensation: 0.0, nonSymmetricalPitch: true,
    curves: {
        leftright: {deadzone: 0.0, xSat: 1.0, exp: 1.0},
        forwardbackward: {deadzone: 0.0, xSat: 1.0, exp: 1.0},					
        updown: {deadzone: 0.0, xSat: 1.0, exp: 1.0},
        rotation: {deadzone: 0.0, xSat: 1.0, exp: 1.0}
    }
}*/

controller.setAxesParam({
    roll2YawCompensation: 0.15,
    nonSymmetricalPitch: false,
    curves: {
        leftright: {deadzone: 0.15, xSat: 1.0, exp: 2.0},
        forwardbackward: {deadzone: 0.15, xSat: 1.0, exp: 2.0},					
        updown: {deadzone: 0.15, xSat: 1.0, exp: 2.0},
        rotation: {deadzone: 0.15, xSat: 1.0, exp: 1.0}
    }
});
var x = rudder.axis.roll;
...
```

## Browser
Include in html page```<script src="../dist/3dRudder-x.x.x.js"></script>```
```javascript
var SDK = new Sdk3dRudder();
SDK.init();
var rudder = SDK.controllers[0];
var x = rudder.axis.roll;
...
```

## See examples  
* [Axis](/examples/axis.html)  
* [WebGL (three.js)](/examples/webgl.html)
* [WebVR (A-Frame)](https://3drudder.github.io/aframe-3dRudder/)
* [WebGL/WebVR (BabylonJS)](https://3drudder.github.io/babylonjs-3dRudder/)
* [Youtube](/examples/video.html)
* [Poly](/examples/poly.html)
* [Google Maps](/examples/maps.html) rotation experimental
* [Sketchfab Viewer](/examples/sketchfab.html) orbit mode
* ```npm run-script sample``` to see in local:
  * Axis: http://localhost:3000/
  * WebGL: http://localhost:3000/webgl/
  * Youtube: http://localhost:3000/video/
  * Maps: http://localhost:3000/maps/ 
  * Google Poly: http://localhost:3000/poly or http://localhost:3000/poly?t=ID (ID of poly model)
  * Sketchfab: http://localhost:3000/sketchfab or http://localhost:3000/sketchfab?t=ID (ID of sketchfab model)

## Build for browser
* ```npm install --save-optional bufferutil``` (optionnal)
* ```npm install browserify -g``` -g is for global install
* ```npm install grunt-cli -g```
* ```npm run build```
* Result in ```dist/3dRudder-x.x.x.js```

## Unit Test
* Command ```npm test```

## TODO features
* add http request for the function
