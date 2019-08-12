const qs = require('querystring')
class Shipment {
  constructor(client) {
    this.client = client
  }

  async companies() {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/companies',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.get(options)
  }

  // todo: service by id
  async services() {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/services',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }

    return this.client.get(options)
  }

  // todo: add filtres
  async agencies() {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/agencies',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }

    return this.client.get(options)
  }

  async calculate(data) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/calculate',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }
    return this.client.post(options)
  }

  async checkout(data) {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/checkout',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: {
        orders: data
      },
      json: true
    }
    return this.client.get(options, data)
  }

  async preview(data) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/preview',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }

    return this.client.post(options)
  }

  async generate(data) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/generate',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }

    return this.client.post(options)
  }

  async print(data) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/print',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }

    return this.client.post(options)
  }

  async cancel(data) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/cancel',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }

    return this.client.post(options)
  }

  async tracking(data) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/tracking',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      body: data,
      json: true
    }

    return this.client.post(options)
  }
}
module.exports = Shipment
