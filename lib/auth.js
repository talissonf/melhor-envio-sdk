const qs = require('querystring')

class Auth {
  constructor (client) {
    this.client = client
    this.path_auth = client.api_path + '/oauth/authorize?'
    this.path_token = client.api_path + '/oauth/token'
  }

  getAuth () {
    if (!this.client.client_id) {
      throw new Error('Client-id is required.')
    }

    let query = {
      client_id: this.client.client_id,
      redirect_uri: this.client.redirect_uri,
      response_type: 'code',
      scope: this.client.request_scope
    }

    if (this.client.state) {
      query.state = this.client.state
    }

    query = qs.stringify(query)
    return this.path_auth + query
  }

  async refreshToken (refreshToken) {
    if (!this.client.client_id || !this.client.client_secret) {
      throw new Error('client_id ou client_secret não informados na instância.')
    }

    let query = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      scope: this.client.request_scope
    }

    let options = {
      url: this.path_token,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'melhor-envio-node-sdk <talissonf@gmail.com>'
      },
      form: qs.stringify(query),
      json: true
    }
    return this.client.post(options)
  }

  async getToken (code) {
    if (!this.client.client_id || !this.client.client_secret) {
      throw new Error('client_id ou client_secret não informados na instância.')
    }

    let query = {
      grant_type: 'authorization_code',
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      redirect_uri: this.client.redirect_uri,
      code: code
    }

    let options = {
      url: this.path_token,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'melhor-envio-node-sdk <talissonf@gmail.com>'
      },
      body: query,
      json: true
    }
    return this.client.post(options)
  }
}

module.exports = Auth
