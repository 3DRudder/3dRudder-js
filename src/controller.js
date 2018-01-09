/*!
 * 
 * 3dRudder v1.0.0                                                  
 * https://github.com/3DRudder/3dRudderjs                                        
 *                                                                             
 * Copyright 2017 3dRudder, Inc. and other contributors                      
 * Released under the MIT license                                     
 * https://github.com/3DRudder/3dRudderjs/blob/master/LICENSE                 
 */
var _ = require('underscore')
, EventEmitter = require('events').EventEmitter

/**
 * Controller object.
 * 
 * @namespace
 */
var Controller = function() {
    this.default();
}

/**
 * Init function.
 * @private
 * @param {SDK} SDK
 *   SDK object
 * @param {object} device
 *   All infos of connected device.
*/
Controller.prototype.init = function(SDK, device) {
    if (device.connected) {
        this.SDK = SDK;
        this.port = device.port;
        this.firmware = device.firmware;
        this.connected = device.connected;
        //this.status = device.status;
        //this.freeze = device.freeze;
        //this.hide = device.hide;
        this.on('status', function(status) {            
            this.SDK.emit('statusDevice', status, this.port);
        });

        // on freeze
        this.on('frozen', function(code, freeze) {
            if (code == 0)
                this.freeze = freeze;
            if (this.onFrozen)
                this.onFrozen(code, this.freeze);
            this.onFrozen = null;
        });

        // on hide
        this.on('hidden', function(code, hide) {
            if (code == 0)
                this.hide = hide;
            if (this.onHidden)
                this.onHidden(code, this.hide);
            this.onHidden = null;
        });
        
        // on play sound
        this.on('playedSound', function(code) {        
            if (this.onPlayedSound)
                this.onPlayedSound(code);
            this.onPlayedSound = null;
        });

        // on play sound with tones
        this.on('playedSoundTones', function(code) {        
            if (this.onPlayedSoundTones)
                this.onPlayedSoundTones(code);
            this.onPlayedSoundTones = null;
        });
    } else {
        this.default();        
    }
}

/**
 * Update function.
 * @private
 * @param {SDK} SDK
 *   SDK object
 * @param {object} device
 *   All infos of connected device.
*/
Controller.prototype.update = function(controller) {
    if (controller.error) {
        console.log("error update controller " + error);
    }
    else {
        this.sensors = controller.sensors;
        this.axis = controller.axis;
        if (controller.status != this.status) {
            this.emit('status', controller.status);
        }
        this.status = controller.status;
    }
}

/**
 * Controller constructor with default properties.
 * @private
 * @constructor
 */
Controller.prototype.default = function () {
    /**
     * SDK object
     * @type {SDK}
    */
    this.SDK = null;
    /**
     * the port of controller
     * @type {integer}
    */
    this.port = -1;
    /**
     * firmware's version
     * @type {integer}
    */
    this.firmware = 0;
    /**
     * controller's status
     * @type {integer}
    */
    this.status = 0;
    /**
     * if controller is connected
     * @type {boolean}
    */
    this.connected = false;
    /**
     * if controller is frozen
     * @type {boolean}
    */
    this.freeze = false;
    /**
     * if controller is hidden
     * @type {boolean}
    */
    this.hide = false;
    /**
     * 6 sensor's value of controller
     * value is the force on the sensor (in grams)
     * @type {Array[integer]}
    */
    this.sensors = [0,0,0,0,0,0];
    /**
     * Value for each axis
     * @type {Axis}
     * @prop {float} pitch
     *  Represent the forward/backward axis [-1,1]
     * @prop {float} roll
     *  Represent the right/left axis [-1,1]
     * @prop {float} yaw
     *  Represent the rotation right/left axis [-1,1]
     * @prop {float} updown
     *  Represent the up/down axis [-1,1]
    */
    this.axis = {
        pitch: 0,
        roll: 0,
        yaw: 0,
        updown: 0
    };
    // events
    this.removeAllListeners('status');
    this.removeAllListeners('frozen');
    this.removeAllListeners('hidden');
    this.removeAllListeners('playedSound');
    this.removeAllListeners('playedSoundTones');
        
    this.onFrozen = null;
    this.onHidden = null;
    this.onPlayedSound = null;
    this.onPlayedSoundTones = null;
}

/**
 * Send message to server.
 * @private
 * @param {json} data
 */
Controller.prototype.sendMessage = function(data) {
    if (this.SDK && this.SDK.connection) {        
        // send function to server
        this.SDK.connection.send(JSON.stringify(data));
        return true;
    }
    return false;
}

/**
 * Freeze/Unfreeze the 3dRudder.
 *
 * @param {boolean} freeze
 *   if true freeze, else unfreeze
 * @param {function} callback
 *  callback when the controller is frozen
 * @param code
 *  the error code of command 'freeze' (0=success)
 * @param freeze
 *  freeze's value
*/
Controller.prototype.setFreeze = function(freeze, callback) {
    var data = {
        message: "freeze",
        port: this.port,
        value: freeze            
    }
    if (this.sendMessage(data)) {        
        this.onFrozen = callback;        
    } else {
        callback(1, false); // no connected
    }        
}

/**
 * Hide/Unhide the 3dRudder.
 *
 * @param {boolean} hide
 *   if true hide, else unhide
 * @param {function} callback
 *  callback when the controller is hidden
 * @param code
 *  the error code of command 'hide' (0=success)
 * @param freeze
 *  hide's value
*/
Controller.prototype.setHide = function(hide, callback) {
    console.log('set hide =' + hide);
    var data = {
        message: "hide",
        port: this.port,
        value: hide            
    }
    if (this.sendMessage(data)) {
        this.onHidden = callback;        
    } else {
        callback(1, false); // no connected
    }  
}

/**
 * Play sound on 3dRudder.
 *
 * @param {integer} frequency
 *   frequency in Hz
 * @param {integer} duration
 *  duration in ms
 * @param {function} callback
 *  callback when the playsound command is launched
 * @param code
 *  the error code of command 'hide' (0=success)
*/
Controller.prototype.playSound = function(frequency, duration, callback) {
    console.log('play sound ');
    var data = {
        message: "playsound",
        port: this.port,
        frequency: frequency,
        duration: duration
    }
    if (this.sendMessage(data)) {
        this.onPlayedSound = callback;
    } else {
        callback(1); // no connected
    }   
}

/**
 * Play sound with tones on 3dRudder.
 *
 * @param {string} tones
 *  tones "Note OctaveNumber (Duration of Tone, Pause after Tone)"
 * @param {function} callback
 *  callback when the playsound command is launched
 * @param code
 *  the error code of command 'hide' (0=success)
*/
Controller.prototype.playSoundTones = function(tones, callback) {
    console.log('play sound tones');
    var data = {
        message: "playsoundtones",
        port: this.port,
        tones: tones
    }
    if (this.sendMessage(data)) {
        this.onPlayedSoundTones = callback;
    } else {
        callback(1); // no connected
    }     
}

_.extend(Controller.prototype, EventEmitter.prototype);

module.exports = Controller;