client_parse = require('../../lib/client_parse')

describe 'client_parse', ->
  it 'is a function', ->
    expect(client_parse).to.be.a 'function'

  before ->
    @client_url = 'http://example.com:8082/'
    @options = client_parse(@client_url)

  it 'parses protocol', ->
    expect(@options.protocol).to.eql 'http:'

  it 'parses hostname', ->
    expect(@options.hostname).to.eql 'example.com'

  it 'parses port', ->
    expect(@options.port).to.eql '8082'

  it 'parses path', ->
    expect(@options.path).to.eql '/'
