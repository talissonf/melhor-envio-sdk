const Auth = require('./auth')

class MelhorEnvio {

  constructor(...args) {

    if (!args[0].client_id || !args[0].client_secret) {
      throw new Error('client_id and client_secret is required.');
    }

    this.client_id = args[0].client_id
    this.client_secret = args[0].client_secret
    this.sandbox = args[0].sandbox || false;

    this.auth = new Auth(this);

  }
}

module.exports = MelhorEnvio