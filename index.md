![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![language](https://img.shields.io/badge/Language-javascript-green.svg) 
![Node.js](https://img.shields.io/badge/Node.js-v8.9.1-green.svg)

# 3dRudderjs v1.0.2

# Installation
* **Node** ```npm install 3drudder-js```

## API Documentation on [Wiki](https://github.com/3DRudder/3dRudder-js/wiki/API-doc)

# Usage
## Node.js
```javascript
var SDK = require('3drudder-js');
SDK.init();
var rudder = SDK.controllers[0];
var x = rudder.axis.roll;
...
```

## Browser
Include in html page```<script src="../dist/3dRudder-x.x.x.js"></script>```

## See examples  
* [Axis](/examples/axis.html)  
* [WebGL (three.js)](/examples/webgl.html)
* [WebVR (A-Frame)](https://3DRudder.github.io/aframe-3dRudder)
* [WebGL/WebVR (BabylonJS)](https://3DRudder.github.io/babylonjs-3dRudder)
* [Youtube](/examples/video.html)  

## Build for browser
* ```npm install --save-optional bufferutil``` (optionnal)
* ```npm install browserify -g``` -g is for global install
* ```npm install grunt-cli -g```
* ```grunt``` or ```npm run-script build```
* Result in ```dist/3dRudder-x.x.x.js```

## Unit Test
* Command ```npm test```

## TODO features
* add http request for the function