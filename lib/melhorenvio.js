const Auth = require('./auth')
const User = require('./user')
const Shipment = require('./shipment')
const req = require('request')
class MelhorEnvio {
  constructor(...args) {
    this.client_id = args[0].client_id
    this.client_secret = args[0].client_secret
    this.api_path = args[0].sandbox === true ? 'https://sandbox.melhorenvio.com.br' : 'https://melhorenvio.com.br'
    this.bearer = args[0].bearer || null
    this.redirect_uri = args[0].redirect_uri
    this.request_scope = args[0].request_scope

    this.request = req

    this.auth = new Auth(this)
    this.user = new User(this)
    this.shipment = new Shipment(this)
  }

  get(options) {
    return new Promise((resolve, reject) => {
      this.request.get(options, (erro, response, body) => {
        if (response.statusCode >= 400) {
          reject(new Error(JSON.stringify({ statusCode: response.statusCode, body: response.body })))
        }
        resolve(body)
      })
    })
  }

  post(options) {
    return new Promise((resolve, reject) => {
      this.request.post(options, (erro, response, body) => {
        if (response.statusCode >= 400) {
          reject(new Error(JSON.stringify({ statusCode: response.statusCode, body: response.body })))
        }
        resolve(body)
      })
    })
  }

  set setToken(token) {
    this.bearer = token
  }

  set setState(state) {
    this.state = state
  }
}

module.exports = MelhorEnvio
module.exports.config = (config) => {
  return new MelhorEnvio(config)
}
