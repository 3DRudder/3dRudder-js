/*!
 * 
 * 3dRudder v1.0.0                                                  
 * https://github.com/3DRudder/3dRudderjs                                        
 *                                                                             
 * Copyright 2017 3dRudder, Inc. and other contributors                      
 * Released under the MIT license                                     
 * https://github.com/3DRudder/3dRudderjs/blob/master/LICENSE                 
*/

var isNode = (typeof(process) !== 'undefined' && process.versions && process.versions.node);
// use Websocket for brower and ws for node.js
var WebSocket = isNode ? require('ws') : (window.WebSocket || window.MozWebSocket)
    , _ = require('underscore')
    , EventEmitter = require('events').EventEmitter
    , Controller = require('./controller');

/**
 * Sdk constructor.
 * 
 * @namespace
 * @constructor
*/
var Sdk = function(opts) {
    opts = opts || {};
    /**
     * the host of server
     * @type {url}
    */
    this.host = opts.host || 'localhost';
    /**
     * the port of server by default 15698
     * @type {integer}
    */
    this.port = opts.port || 15698;
    /**
     * the scheme for websocket protocol
     * @type {string}
    */
    this.schemeWs = opts.schemeWs || 'ws';
    /**
     * the scheme for http protocol
     * @type {string}
    */
    this.schemeHttp = opts.schemeHttp || 'http';
    /**
     * try to reconnect in ms
     * @type {bool}
    */
   this.autoReconnect = false;
    /**
     * the time to try to reconnect in ms
     * @type {integer}
    */
    this.autoReconnectInterval = 5*1000;
    // SDK params
    this.default();

    /**
     * Error code
     * @type {array[string]}
    */
    this.ERROR = ["Success", "Not connected", "Fail", "Incorrect command", "Timeout", "Wrong signature", "Not ready"];

    /**
     * Status of 3dRudder
     * @type {array[string]}
    */
    this.STATUS = ["No status", "No foot stay still", "Initialisation", "Put your feet", "Put second foot", "Stay still", "In use", "Extended mode"];

    /**
     * 4 controllers max
     * @type {array[Controller]}
    */
    this.controllers = [new Controller(), new Controller(), new Controller(), new Controller()];    

    /* List of events */
    // type: init
    this.on('init', function(e) {
        console.log(`uid client ${e.uid} version ${e.version} number connected ${e.numberConnected}`);
        this.uid = e.uid;
        this.version = e.version;
        // TODO: maybe refresh this counter
        this.numberConnected = e.numberConnected;
    });

    // type: connectedDevice
    this.on('connectedDevice', function(device) {
        console.log(`device port ${device.port} firmware ${device.firmware} connected ${device.connected}`);
        this.controllers[device.port].init(this, device);
    });

    // type: freeze
    this.on('frozen', function(device) {
        console.log(`device port ${device.port} freeze ${device.freeze}`);
        this.controllers[device.port].emit('frozen', device.code, device.freeze)
    });

    // type: hide
    this.on('hidden', function(device) {
        console.log(`device port ${device.port} hide ${device.hide}`);
        this.controllers[device.port].emit('hidden', device.code, device.hide)
    });

    // type: play sound
    this.on('playedSound', function(device) {
        console.log(`device port ${device.port} error ${this.getErrorString(device.code)}`);
        this.controllers[device.port].emit('playedSound', device.code)
    });
    this.on('playedSoundTones', function(device) {
        console.log(`device port ${device.port} error ${this.getErrorString(device.code)}`);
        this.controllers[device.port].emit('playedSoundTones', device.code)
    });

    // type: frame
    this.on('frame', function(frame) {
        //console.log(`frame ${JSON.stringify(frame)} controllers ${JSON.stringify(this.controllers)}`);
        var _this = this;
        frame.controllers.forEach( function(controller, index, array) {
            //console.log(`controllers ${JSON.stringify(_this.controllers[0])}`);
            if (controller.connected) {
                _this.controllers[index].update(controller);
            }
        });        
    });

    this.on('end', function(device) {
        this.controllers.forEach( function(controller) {           
            controller.default();
        });
    });
}

/**
 * Sdk default
 * @private
*/
Sdk.prototype.default = function () {
    this.uid = 0;
    this.version = 0;
    this.numberConnected = 0;
}

/**
 * Get the complete websocket url
 * @private
 * @return {url}
*/
Sdk.prototype.getWsUrl = function () {
    return `${this.schemeWs}://${this.host}:${this.port}`;
}

/**
 * Get the complete http url
 * @private
 * @return {url}
*/
Sdk.prototype.getHttpUrl = function () {
    return this.schemeHttp + "://" + this.host + ":" + this.port;
}

/**
 * Get the status in string format
 *
 * @return {string}
*/
Sdk.prototype.getStatusString = function (code) {
    return this.STATUS[code];
}

/**
 * Get the error code in string format
 *
 * @return {string}
*/
Sdk.prototype.getErrorString = function (code) {
    return this.ERROR[code];
}

/**
 * Setup the connection (websocket and http)
 * @private
 * @return {string}
*/
// TODO: create connection object to manager websocket and http request
Sdk.prototype.setupConnection = function () {
    // 2 tricks to get this in function
    // 1) save this in variable _this
    // 2) use .bind(this) like onMessage
    var _this = this;
    var connection = new WebSocket(this.getWsUrl());
    this.connection = connection;
    connection.onopen = function(event) { 
        console.log('onopen ' + event);
    };    
    connection.onmessage = this.onMessage.bind(this);
    connection.onclose = function(e) { 
        // TODO: maybe emit event connected device = false
        _this.default();
        _this.emit('end');
        console.log('onclose ' + e['code'] + ' reason ' + e['reason']);
        switch (e['code']) {
            case 1000:	// CLOSE_NORMAL
                console.log("WebSocket: closed");
                break;
            default:	// Abnormal closure
                if (_this.autoReconnect)
                    _this.reconnect(e);
                break;
        } 
    };
    connection.onerror = function(error) {        
        //_this.emit('error', new error);
        console.log('onerror ' + error );         
    };
}

/**
 * Try to reconnect
 * @private
 * @param {error} e
*/
Sdk.prototype.reconnect = function(e) {
    this.connection = null;
    var that = this;
	setTimeout(function() {
		console.log("WebSocketClient: reconnecting...");
		that.setupConnection();
	},this.autoReconnectInterval);
}

/**
 * Event when the server sends a message
 * @private
 * @event
 * @param {object} message
 *  the message contains the json data
*/
Sdk.prototype.onMessage = function (message) {
    //console.log(message.data);
    try {
        var msg = JSON.parse(message.data);
        // send event with type and json data        
        this.emit(msg.event, msg);
    } catch (e) {
        console.error("Parsing error:", e); 
    }
}

/**
 * Stop the connection
 * @private
*/
Sdk.prototype.stopConnection = function () {
    if (this.connection) {
        this.connection.close();
    }
}

/**
 * Init the SDK
 * @function
 * this function must be call at first
*/
Sdk.prototype.init = function () {
    console.log('init SDK');    
    this.setupConnection();
}

/**
 * Stop the SDK
 * @function
 * stop the connection with the server
*/
Sdk.prototype.stop = function () {
    console.log('end SDK');
    this.stopConnection();
}

/**
 * Play sound on 3dRudder.
 *
 * @param {integer} port
 *   port's number
 * @param {integer} frequency
 *   frequency in Hz
 * @param {integer} duration
 *  duration in ms
 * @param {function} callback
 *  callback when the playsound command is launched
 * @param code
 *  the error code of command 'hide' (0=success)
*/
Sdk.prototype.playSound = function (port, frequency, duration, callback) {
    console.log('play sound SDK');
    this.controllers[port].playSound(frequency, duration, callback);
}

/**
 * Play sound with tones on 3dRudder.
 * 
 * @param {integer} port
 *   port's number
 * @param {string} tones
 *  tones "Note OctaveNumber (Duration of Tone, Pause after Tone)"
 * @param {function} callback
 *  callback when the playsound command is launched
 * @param code
 *  the error code of command 'hide' (0=success)
*/
Sdk.prototype.playSoundTones = function (port, tones, callback) {
    console.log('play sound tones SDK');
    this.controllers[port].playSoundTones(tones, callback);
}

/**
 * Freeze/Unfreeze the 3dRudder.
 *
 * @param {integer} port
 *   port's number
 * @param {boolean} freeze
 *   if true freeze, else unfreeze
 * @param {function} callback
 *  callback when the controller is frozen
 * @param code
 *  the error code of command 'freeze' (0=success)
 * @param freeze
 *  freeze's value
*/
Sdk.prototype.freeze = function (port, freeze, callback) {
    console.log('freeze SDK');
    this.controllers[port].setFreeze(freeze, callback);
}

/**
 * Hide/Unhide the 3dRudder.
 *  
 * @param {integer} port
 *   port's number
 * @param {boolean} hide
 *   if true hide, else unhide
 * @param {function} callback
 *  callback when the controller is hidden
 * @param code
 *  the error code of command 'hide' (0=success)
 * @param freeze
 *  hide's value
*/
Sdk.prototype.hide = function (port, hide, callback) {
    console.log('hide SDK');
    this.controllers[port].setHide(hide, callback);
}

_.extend(Sdk.prototype, EventEmitter.prototype);

module.exports = Sdk;