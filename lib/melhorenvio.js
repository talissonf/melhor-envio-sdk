const Auth = require('./auth')
const User = require('./user')
const Shipment = require('./shipment')
const Axios = require('./axios')
class MelhorEnvio {
  constructor(...args) {
    this.client_id = args[0].client_id
    this.client_secret = args[0].client_secret
    this.bearer = args[0].bearer || args[0].token || null
    this.redirect_uri = args[0].redirect_uri
    this.scope = args[0].scope
    this.axios = Axios(args[0].sandbox)
    this.auth = new Auth(this)
    this.user = new User(this)
    this.shipment = new Shipment(this)
  }

  set setToken(token) {
    this.bearer = token
  }

  set setState(state) {
    this.state = state
  }

  /**
   * 
   * @param {string} url endpoint da api do melhor envio
   * @param {string} method metódo
   * @param {Object|Array|null} data paylaod para requisições post 
   * @param {string} token melhor envio token
   */
  apiRequest (url, method = 'get', data, token) {
    return this.axios({
      url,
      method,
      data: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + (this.bearer || token)
      }
    })
  }
}

module.exports = MelhorEnvio
module.exports.config = (config) => {
  return new MelhorEnvio(config)
}
