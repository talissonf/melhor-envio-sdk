const qs = require('querystring')

class Auth {
  constructor (client) {
    this.client = client
    this.client_id = client.client_id
    this.client_secret = client.client_secret
    this.api_path = client.api_path
    this.path_auth = this.api_path + '/oauth/authorize?'
    this.path_token = this.api_path + '/oauth/token'
    this.redirect_uri = client.redirect_uri
    this.request_scope = client.request_scope
    this.state = client.state
  }

  getAuth () {
    if (!this.client_id) {
      throw new Error('Client-id is required.')
    }

    let query = {
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: 'code',
      scope: this.request_scope
    }

    if (this.state) {
      query.state = this.state
    }

    query = qs.stringify(query)
    return this.path_auth + query
  }

  async refreshToken (refreshToken) {
    if (!this.client_id && !this.client_secret) {
      throw new Error('Client-id and Client-secret are required.')
    }

    let query = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: this.request_scope
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
    if (!this.client_id && !this.client_secret) {
      throw new Error('Client-id and Client-secret are required.')
    }

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
        'User-Agent': 'melhor-envio-node-sdk <talissonf@gmail.com>'
      },
      body: query,
      json: true
    }
    return this.client.post(options)
  }
}

module.exports = Auth
