/*!
 * 
 * 3dRudder v1.0.0                                                  
 * https://github.com/3DRudder/3dRudderjs                                        
 *                                                                             
 * Copyright 2017 3dRudder, Inc. and other contributors                      
 * Released under the MIT license                                     
 * https://github.com/3DRudder/3dRudderjs/blob/master/LICENSE                 
 */

 /**
 * AxesParam object.
 * 
 * @namespace
 */
var AxesParam = function() {  
    /**
     * Value for default curves by axis
     * @type {curves}
     * @prop {float} leftright
     *  Represent the right/left axis [-1,1]
     * @prop {float} forwardbackward
     *  Represent the forward/backward axis [-1,1]          
     * @prop {float} updown
     *  Represent the up/down axis [-1,1]
     * @prop {float} rotation
     *  Represent the rotation right/left axis [-1,1]
     * @prop {object} curve
     *      @prop {float} deadzone
     *      Represent the deadzone
     *      @prop {float} xSat
     *      Represent the saturation of X value
     *      @prop {float} yMax
     *      Represent the maximum of Y value
     *      @prop {float} exp
     *      Represent the exponentiel of curve
    */
   this.curves = {
        leftright: {deadzone: 0.15, xSat: 1.0, exp: 1.0},
        forwardbackward: {deadzone: 0.15, xSat: 1.0, exp: 1.0},                
        updown: {deadzone: 0.15, xSat: 1.0, exp: 1.0},
        rotation: {deadzone: 0.15, xSat: 1.0, exp: 1.0},
    }

   /**
     * Roll to Yaw compensation
     * @type {integer}
    */
   this.roll2YawCompensation = 0.0;

   /**
     * Non Symmetrical Pitch
     * @type {integer}
    */
   this.nonSymmetricalPitch = true;
}

//_.extend(Controller.prototype, EventEmitter.prototype);

module.exports = AxesParam;