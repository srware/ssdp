var describe = require('mocha').describe
var it = require('mocha').it
var expect = require('chai').expect
var defaultSsdpOptions = require('../../lib/default-ssdp-options')

describe('lib/default-ssdp-options', function () {

  it('should populate defaults', function () {
    var options = defaultSsdpOptions({})

    expect(options.udn).to.be.ok
    expect(options.sockets.length).to.equal(1)
    expect(options.sockets[0].broadcast.address).to.equal('239.255.255.250')
    expect(options.sockets[0].broadcast.port).to.equal(1900)
    expect(options.sockets[0].bind.address).to.equal('0.0.0.0')
    expect(options.sockets[0].bind.port).to.equal(1900)
    expect(options.sockets[0].maxHops).to.equal(4)
  })

  it('should honor weird half-set socket', function () {
    var options = defaultSsdpOptions({
      sockets: [{
        type: 'udp5',
        broadcast: {
          address: 'foo'
        }
      }]
    })

    expect(options.udn).to.be.ok
    expect(options.sockets.length).to.equal(1)
    expect(options.sockets[0].type).to.equal('udp5')
    expect(options.sockets[0].broadcast.address).to.equal('foo')
    expect(options.sockets[0].broadcast.port).to.equal(1900)
    expect(options.sockets[0].bind.address).to.equal('0.0.0.0')
    expect(options.sockets[0].bind.port).to.equal(1900)
    expect(options.sockets[0].maxHops).to.equal(4)
  })

  it('should survive no arguments', function () {
    var options = defaultSsdpOptions()

    expect(options.udn).to.be.ok
    expect(options.sockets.length).to.equal(1)
    expect(options.sockets[0].broadcast.address).to.equal('239.255.255.250')
    expect(options.sockets[0].broadcast.port).to.equal(1900)
    expect(options.sockets[0].bind.address).to.equal('0.0.0.0')
    expect(options.sockets[0].bind.port).to.equal(1900)
    expect(options.sockets[0].maxHops).to.equal(4)
  })
})
