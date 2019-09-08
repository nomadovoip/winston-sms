// // Copyright (c) 2019 nomado telecom sprl
// //
// // This software is released under the MIT License.
// // https://opensource.org/licenses/MIT
// // For more information, please visit https://www.nomado.eu

const Transport = require('winston-transport')
const Nomado = require('nomado')

//  Main winston-transport class for sms
class Sms extends Transport {
  constructor (options = {}) {
    super(options)

    this.required_param = ['username', 'password', 'to']

    for (let required of this.required_param){
      if (!(required in options)) throw new Error ("Missing required parameter")      
    }

    if (!(options.to instanceof Array) || (options.to.every(isNaN)) ){
      throw new Error ("options.to must be an array[] and has to be numeric with valid E164 format numbers")
    }

    this.name = "Winston nomado sms logger"
    this.level = 'info'
    const USERNAME = options.username
    const PASSWORD = options.password
    this.to = options.to
    this.unicode = options.unicode || false
    this.from = options.from || 'NOMADO'
    this.sms = new Nomado({USERNAME, PASSWORD})


    
    
  }

  async log (info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    
    let smsOptions = {
      to : this.to,
      message: info.message,
      unicode: this.unicode,
      from: this.from
    }
    
    let result = await this.sms.sms.send(smsOptions)
    callback()
    // Perform the writing to the remote service
    
  }
}

module.exports = Sms
