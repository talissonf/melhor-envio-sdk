const Auth = require('./auth')
const User = require('./user')
const Shipment = require('./shipment')
class MelhorEnvio {

  constructor(...args) {

    if (!args[0].client_id || !args[0].client_secret) {
      throw new Error('client_id and client_secret is required.');
    }

    this.client_id = args[0].client_id
    this.client_secret = args[0].client_secret
    this.api_path = args[0].sandbox ? 'https://sandbox.melhorenvio.com.br' : 'https://melhorenvio.com.br'
    this.bearer = args[0].bearer || null

    this.auth = new Auth(this)
    this.user = new User(this)
    this.shipment = new Shipment(this)
  }
}

module.exports = MelhorEnvio