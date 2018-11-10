class User {
  constructor (client) {
    this.client = client
    this.api_path = client.api_path
  }

  /**
   * @todo
   */
  async create (data) {
  }

  /**
 * @todo
 */
  async documents () {
  }

  async me () {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.get(options)
  }

  async balance () {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/balance',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.get(options)
  }

  async addresses () {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/addresses',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.get(options)
  }

  async cart (data) {
    let options = {
      method: 'POST',
      uri: this.api_path + '/api/v2/me/cart',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }
    return this.client.get(options)
  }

  async cardItem (id) {
    let options = {
      method: 'GET',
      uri: this.api_path + '/api/v2/me/cart/' + id,
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.get(options)
  }

  async removeCardItem (id) {
    let options = {
      method: 'DELETE',
      uri: this.api_path + '/api/v2/me/cart/' + id,
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.delete(options)
  }
}

module.exports = User
