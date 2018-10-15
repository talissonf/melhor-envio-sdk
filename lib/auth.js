const qs = require('querystring')
const http = require('http')
const request = require('request')

class Auth {
  constructor(client) {
    this.client_id = client.client_id
    this.client_secret = client.client_secret
    this.path_auth = 'https://sandbox.melhorenvio.com.br/oauth/authorize?'
    this.path_token = 'https://sandbox.melhorenvio.com.br/oauth/token'
    this.redirect_uri = 'https://ecomplus-melhor-envio.herokuapp.com/callback'
    this.request_scope = 'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write'
  }

  getToken() {

    let query = {
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: 'code',
      scope: this.request_scope
    }
    query = qs.stringify(query)
    let url = this.path_auth + query

    http.createServer((request, response) => {
      response.writeHead(301, { Location: url })
      response.end()
    }).listen(8080)

  }

  refreshToken(refresh_token) {
    let query = {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: this.request_scope
    }

    let options = {
      url: this.path_token,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'E-com.plus Melhor Envio suporte@e-com.club'
      },
      form: qs.stringify(query),
      json: true
    }
    
    return new Promise((resolve, reject) => {
      request.post(options, (erro, response, body) => {
        if(erro) return reject(erro)

        try {
          if(response.statusCode >= 400){
            reject(this.parseErro(body))
          }
          resolve(JSON.stringify(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  getAuth(code) {

    let query = {
      grant_type: 'authorization_code',
      client_id: this.client_id,
      client_secret: this.client_secret,
      redirect_uri: this.redirect_uri,
      code: code
    }

    let options = {
      url: this.path_token,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'E-com.plus Melhor Envio suporte@e-com.club'
      },
      body: query,
      json: true
    }
    
    return new Promise((resolve, reject) => {
      request.post(options, (erro, response, body) => {
        if(erro) return reject(erro)

        try {
          if(response.statusCode >= 400){
            reject(this.parseErro(body))
          }
          resolve(JSON.stringify(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  parseErro(response){
    switch (response.error) {
      case 'invalid_request':
        return JSON.stringify({
          'erro': 'invalid_request',
          'status': 400,
          'user_message': {
            'en_us': response.hint,
            'pt_br': 'Código de autenticação expirado.'
          }
        });
        break;
      case 'unsupported_grant_type':
        return JSON.stringify({
          'erro': 'unsupported_grant_type',
          'status': 400,
          'user_message': {
            'en_us': response.hint,
            'pt_br': 'Verifique se todos os parâmetros obrigatórios foram informados.'
          }
        });
        break;
      default:
        break;
    }
  }

}

module.exports = Auth