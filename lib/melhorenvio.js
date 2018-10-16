const Auth = require('./auth')
const User = require('./user')
const Shipment = require('./shipment')
const req = require('request')
class MelhorEnvio {
  constructor (...args) {
    if (!args[0].client_id || !args[0].client_secret) {
      throw new Error('client_id and client_secret is required.')
    }

    this.client_id = args[0].client_id
    this.client_secret = args[0].client_secret
    this.api_path = args[0].sandbox ? 'https://sandbox.melhorenvio.com.br' : 'https://melhorenvio.com.br'
    this.bearer = args[0].bearer || null
    this.redirect_uri = args[0].redirect_uri
    this.request_scope = args[0].request_scope

    this.request = req

    this.auth = new Auth(this)
    this.user = new User(this)
    this.shipment = new Shipment(this)
  }

  get (options, callback) {
    this.request.get(options, (erro, response, body) => {
      if (response.statusCode >= 400) {
        erro = this.errorParse(body)
        body = undefined
      }
      return callback(body, response, erro)
    })
  }

  post (options, callback) {
    this.request.post(options, (erro, response, body) => {
      if (response.statusCode >= 400) {
        erro = this.errorParse(body)
        body = undefined
      }
      return callback(body, response, erro)
    })
  }

  errorParse (response) {
    switch (response.error) {
      case 'invalid_request':
        return JSON.stringify({
          'erro': 'invalid_request',
          'status': 400,
          'user_message': {
            'en_us': response.hint,
            'pt_br': 'Código de autenticação expirado.'
          }
        })
      case 'unsupported_grant_type':
        return JSON.stringify({
          'erro': 'unsupported_grant_type',
          'status': 400,
          'user_message': {
            'en_us': response.hint,
            'pt_br': 'Verifique se todos os parâmetros obrigatórios foram informados.'
          }
        })
      default:
        break
    }
  }
}

module.exports = MelhorEnvio
