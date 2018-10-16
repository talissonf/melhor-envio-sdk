class User {
  constructor (client) {
    this.client = client
    this.api_path = client.api_path
    this.token_bearer = client.bearer
  }

  /**
   * @todo
   */
  create (data) {

  }

  /**
 * @todo
 */
  documents () {

  }

  me (callback) {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }

    return this.client.get(options, callback)
  }

  balance (callback) {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/balance',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }
    return this.client.get(options, callback)
  }

  addresses (callback) {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/addresses',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }
    return this.client.get(options, callback)
  }

  cartItens (data, callback) {
    let options = {
      method: 'POST',
      uri: this.api_path + '/api/v2/me/cart',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }
    return this.client.get(options, callback)
  }

  cardItem (id, callback) {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/cart/' + id,
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }
    return this.client.get(options, callback)
  }

  removeCardItem (id, callback) {
    let options = {
      method: 'DELETE',
      uri: this.api_path + '/api/v2/me/cart/' + id,
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token_bearer
      }
    }
    return this.client.delete(options, callback)
  }
}

module.exports = User
