var describe = require('mocha').describe
var it = require('mocha').it
var expect = require('chai').expect
var sinon = require('sinon')
var discover = require('../../../lib/discover')

describe('lib/discover', function () {

  it('should send a search message', function () {
    var ssdp = {
      emit: sinon.stub()
    }
    var serviceType = 'serviceType'

    discover(ssdp, serviceType)

    expect(ssdp.emit.calledOnce).to.be.true
    expect(ssdp.emit.getCall(0).args[0]).to.equal('ssdp:send-message')
    expect(ssdp.emit.getCall(0).args[1]).to.equal('M-SEARCH * HTTP/1.1')
    expect(ssdp.emit.getCall(0).args[2].ST).to.equal(serviceType)
    expect(ssdp.emit.getCall(0).args[2].MAN).to.equal('ssdp:discover')
    expect(ssdp.emit.getCall(0).args[2].MX).to.equal(0)
  })

  it('should default to global search', function () {
    var ssdp = {
      emit: sinon.stub()
    }

    discover(ssdp)

    expect(ssdp.emit.calledOnce).to.be.true
    expect(ssdp.emit.getCall(0).args[0]).to.equal('ssdp:send-message')
    expect(ssdp.emit.getCall(0).args[1]).to.equal('M-SEARCH * HTTP/1.1')
    expect(ssdp.emit.getCall(0).args[2].ST).to.equal('ssdp:all')
    expect(ssdp.emit.getCall(0).args[2].MAN).to.equal('ssdp:discover')
    expect(ssdp.emit.getCall(0).args[2].MX).to.equal(0)
  })
})
