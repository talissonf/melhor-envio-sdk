const request = require('request')

class Shipment {
  constructor(client) {
    this.api_path = client.api_path
    this.token_bearer = client.bearer
  }

  companies() {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/shipment/companies',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }

    return new Promise((resolve, reject) => {
      request.get(options, (erro, response, body) => {
        if (erro) return reject(erro)

        try {
          resolve(body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // todo service by id
  services() {
    
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/shipment/services',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }

    return new Promise((resolve, reject) => {
      request.get(options, (erro, response, body) => {
        if (erro) return reject(erro)

        try {
          resolve(body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
module.exports = Shipment