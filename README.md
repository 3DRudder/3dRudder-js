![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![language](https://img.shields.io/badge/Language-javascript-green.svg) 
![Node.js](https://img.shields.io/badge/Node.js-v8.9.1-green.svg)

# 3dRudderjs v1.0.0

JavaScript API for the 3dRudder Controller
## API Documentation on [Wiki](https://github.com/3DRudder/3dRudder-js/wiki/API-doc)

# Setup
* Install Node.js stable(https://nodejs.org/en/download/)
* Open 'Node.js command prompt', got the root folder and write ```npm install```

## Test
* Command ```npm test```

## Build for browser
* ```npm install --save-optional bufferutil``` (optionnal)
* ```npm install browserify -g``` -g is for global install
* ```npm install grunt-cli -g```
* ```grunt``` or ```npm run-script build```
* Result in ```dist/3dRudder-x.x.x.js```

## Use for browser
* Include in html page```<script src="../dist/3dRudder-1.0.0.js"></script>```
* Use in javascript ```SDK.init();```
* See examples  
  * [axis](/examples/axis.html)  

## TODO features
* add http request for the function