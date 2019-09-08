const winstonsmsTransport = require('../lib/winston-sms')
const Transport = require('winston-transport')
const nock = require('nock')


describe('Basic instance test', () => {
  test('extends winston transport', () => {
    expect(winstonsmsTransport.prototype).toBeInstanceOf(Transport)
  })

  test('#Log should be a function', () => {
    const options = {
      username: 'nomado',
      password: 'password',
      'to': [37253808262]
    }

    let transport = new winstonsmsTransport(options)

    expect(transport.log).toBeInstanceOf(Function)
  })
})

describe('Validating required params', () => {
  test('without username: raise error', () => {
    const options = {
      'password': '',
      'to': []
    }
  
    try{
      let logger = new winstonsmsTransport(options)
    }
    catch(e){
      expect(e.message).toBe('Missing required parameter')
    }
  })

  test('without password: raise error', () => {
    const options = {
      'username': '',
      'to': []
    }
  
    try{
      let logger = new winstonsmsTransport(options)
    }
    catch(e){
      expect(e.message).toBe('Missing required parameter')
    }
  })

  test('without to: raise error', () => {
    const options = {
      'username': '',
      'password': ''
    }
  
    try{
      let logger = new winstonsmsTransport(options)
    }
    catch(e){
      expect(e.message).toBe('Missing required parameter')
    }
  })

  test('to is not [Array]: raise error', () => {
    const options = {
      'username': 'nomado',
      'password': 'password',
      'to': 3228887000

    }
  
    try{
      let logger = new winstonsmsTransport(options)
    }
    catch(e){
      expect(e.message).toBe('options.to must be an array[] and has to be numeric with valid E164 format numbers')
    }
  })
})

describe('Testing sms logging', () => {
  let scope

    beforeEach(() => {
      scope = nock('https://api.nomado.eu',{
        reqheaders: {
          'content-type': 'application/json'
        }
      })
      .post('/sms/send', {
        message: 'bar'
      })
      .reply(200,{
        code: 200
    })
    })

    afterEach(() => {
      nock.restore()
    })

  test('winston-sms#log(info, callback)', async () => {
    //TODO: use nock to mock API calls and test
    
  

    const callback = jest.fn()
    const options = {
      username: 'nomado',
      password: 'password',
      to: [37253808262],
      unicode: false
    }

    let transport = new winstonsmsTransport(options)
    await transport.log({message: 'bar'}, callback)
    
    expect(callback).toHaveBeenCalled()

  })
})