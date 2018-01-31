var assert = require('assert');
var should = require('should');
var Sdk3dRudder = require('../src/index.js');

describe('SDK', function() {
    describe('#SDK()', function() {
        var SDK = new Sdk3dRudder();        
        it('should default value', function() {            
            assert.equal(SDK.host, 'localhost');            
            assert.equal(SDK.port, 15698);            
            assert.equal(SDK.version, 0);
            assert.equal(SDK.schemeWs, 'wss');
            assert.equal(SDK.schemeHttp, 'http');
            assert.equal(SDK.uid, 0);
            assert.equal(SDK.numberConnected, 0);
            assert.equal(SDK.autoReconnectInterval, 5000);

            SDK.controllers.should.have.length(4);
            SDK.host.should.be.a.String();
            should(SDK.port).be.a.Number();
            SDK.should.have.properties('ERROR', 'STATUS');

            var controller = SDK.controllers[0];
            controller.port.should.be.exactly(-1).and.be.a.Number();
            controller.firmware.should.be.exactly(0).and.be.a.Number();
            controller.status.should.be.exactly(0).and.be.a.Number();
            controller.connected.should.be.exactly(false).and.be.a.Boolean();
            controller.freeze.should.be.exactly(false).and.be.a.Boolean();
            controller.hide.should.be.exactly(false).and.be.a.Boolean();
            controller.sensors.should.have.length(6);
            controller.sensors.forEach(function(value) {
                assert(value === 0, 'sensors not equal 0');
            });
            controller.axis.should.have.properties('pitch', 'roll', 'yaw', 'updown');
            var axis = controller.axis;            
            axis.pitch.should.be.exactly(0).and.be.a.Number();
            axis.roll.should.be.exactly(0).and.be.a.Number();
            axis.yaw.should.be.exactly(0).and.be.a.Number();
            axis.updown.should.be.exactly(0).and.be.a.Number();
            
            controller.should.have.property('onFrozen').and.be.Null();
            controller.should.have.property('onHidden').and.be.Null();
            controller.should.have.property('onPlayedSound').and.be.Null();
            controller.should.have.property('onPlayedSoundTones').and.be.Null();
        });

        it('should default function', function() {
            assert.equal(SDK.getWsUrl(), 'wss://localhost:15698');
            assert.equal(SDK.getHttpUrl(), 'http://localhost:15698');
            assert.equal(SDK.getErrorString(0), SDK.ERROR[0]);
            assert.notEqual(SDK.getErrorString(0), SDK.ERROR[1]);
            assert.equal(SDK.getStatusString(0), SDK.STATUS[0]);
            assert.notEqual(SDK.getStatusString(0), 'NoStatus');

            SDK.default.should.be.a.Function();
            SDK.init.should.be.a.Function();
            SDK.setupConnection.should.be.a.Function();
            SDK.stopConnection.should.be.a.Function();
            SDK.stop.should.be.a.Function();
            SDK.playSound.should.be.a.Function();
            SDK.playSoundTones.should.be.a.Function();
            SDK.freeze.should.be.a.Function();
            SDK.hide.should.be.a.Function();

            var controller = SDK.controllers[0];
            controller.default.should.be.a.Function();
            controller.init.should.be.a.Function();
            controller.update.should.be.a.Function();
            controller.sendMessage.should.be.a.Function();
            controller.setFreeze.should.be.a.Function();
            controller.setHide.should.be.a.Function();
            controller.playSound.should.be.a.Function();
            controller.playSoundTones.should.be.a.Function();
        });
    });
});