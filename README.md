# winston-sms
Sending sms on important log event easily.


> You will need [nomado](https://my.nomado.eu/join) account to use the transport. Register now and get free test credit.

# Install

```console
$ npm install --save winston-sms
```
or

```console
$ yarn add winston-sms
```

# Quickstart

```javascript
let winston = require('winston')
let winstonSms = require('winston-sms')

var logger = winston.CreateLogger({
     //Your custom configurations
     // refer to https://github.com/winstonjs/winston#creating-your-own-logger
     transports: [
       new winstonSms({
         username: 'your_nomado_username',
         password: 'your_nomado_password',
         to: [3725343433, 3228887000]
       })
     ]
})
```

# Options

| options | description | required | default
|:---:|---|--- | --- |
|username| `string` nomado username| YES |
|password|`string` nomado account password | YES
|from|`numeric` e164 format number. eg: 3228887000 | NO | NOMADO
|to|`numeric array` e164 formatted valid mobile numbers | YES | 
|unicode|`boolean` If you have non-english characters in sms, set it to `true` | NO | false
|level|`string` winston level  | NO | info


# Todo

- Continouos Integration
- Enhance documentation

> Please feel free to send pull requests on develop branch.

# Contributors
- [Flavien Barsé](https://github.com/flavienb)
- [Aley Rizvi](https://github.com/aleyrizvi)