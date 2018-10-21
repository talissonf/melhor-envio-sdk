const qs = require('querystring')
class Shipment {
  constructor (client) {
    this.client = client
  }

  companies (callback) {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/companies',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }
    return this.client.get(options, callback)
  }

  // todo: service by id
  services (callback) {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/services',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }

    return this.client.get(options, callback)
  }

  // todo: add filtres
  agencies (callback) {
    let options = {
      method: 'GET',
      uri: this.client.api_path + '/api/v2/me/shipment/agencies',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      }
    }

    return this.client.get(options, callback)
  }

  calculate (data, callback) {
    console.log(this.client.bearer)
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
    return this.client.post(options, callback)
  }
  
  checkout (data, callback) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/checkout',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      form: qs.stringify(data),
      json: true
    }

    return this.client.post(options, callback)
  }

  preview (data, callback) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/preview',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      form: qs.stringify(data),
      json: true
    }

    return this.client.post(options, callback)
  }

  generate (data, callback) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/generate',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      form: qs.stringify(data),
      json: true
    }

    return this.client.post(options, callback)
  }

  print (data, callback) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/print',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      form: qs.stringify(data),
      json: true
    }

    return this.client.post(options, callback)
  }

  cancel (data, callback) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/cancel',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      form: qs.stringify(data),
      json: true
    }

    return this.client.post(options, callback)
  }

  tracking (data, callback) {
    let options = {
      method: 'POST',
      uri: this.client.api_path + '/api/v2/me/shipment/tracking',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.client.bearer
      },
      form: qs.stringify(data),
      json: true
    }

    return this.client.post(options, callback)
  }
}
module.exports = Shipment
