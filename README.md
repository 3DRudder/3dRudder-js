![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![language](https://img.shields.io/badge/Language-javascript-green.svg) 
![Node.js](https://img.shields.io/badge/Node.js-v8.9.1-green.svg)

|      Browsers     | HTTP/WS  | HTTPS/WSS  | File://  |
|:--------------:|:--------:|:--------:|:--------:|
|   Chrome   |    ✔     |    ✔     |    ✔     |
|   FireFox  |    ✔     |    ✔    |    ✔     |
|   Edge   |    ✔     |    ✔    |    :x:     |
|   Safari   |    :warning:     |    :warning:     |    :warning:     |

# 3dRudderjs v1.0.4

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
* [Google Maps](/examples/maps.html) rotation experimental
* ```npm run-script sample``` to see in local:
  * Axis: http://localhost:3000/
  * WebGL: http://localhost:3000/webgl/
  * Youtube: http://localhost:3000/video/
  * Maps: http://localhost:3000/maps/ 
  * Google Poly: http://localhost:3000/poly or http://localhost:3000/poly?t=ID (ID of poly model)

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
