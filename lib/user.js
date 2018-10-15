const request = require('request')

class User {
  constructor(client) {
    this.api_path = client.api_path
    this.token_bearer = client.bearer
  }

  /**
   * @todo
   */
  create(data) {

  }

  /**
 * @todo
 */
  documents() {

  }

  me(){
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }

    return new Promise((resolve, reject) => {
      request.get(options, (erro, response, body) => {
        if(erro) return reject(erro)

        try {
          resolve(body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  balance(){
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/balance',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }

    return new Promise((resolve, reject) => {
      request.get(options, (erro, response, body) => {
        if(erro) return reject(erro)

        try {
          resolve(body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  addresses(){
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/addresses',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }

    return new Promise((resolve, reject) => {
      request.get(options, (erro, response, body) => {
        if(erro) return reject(erro)

        try {
          resolve(body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

module.exports = User