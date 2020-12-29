/**
 * {@link https://docs.menv.io/#0b7d6f1d-df56-46f1-b292-ba5f31d2567f Referencia}
 */
class User {
  constructor (client) {
    this.client = client
  }

  /**
   * todo
   */
  register () {}

  me (token) {
    return this.client.apiRequest(
      '/api/v2/me',
      'get',
      null,
      token
    )
  }

  balance (token) {
    return this.client.apiRequest(
      '/api/v2/me/balance',
      'get',
      null,
      token
    )
  }

  addresses (token) {
    return this.client.apiRequest(
      '/api/v2/me/addresses',
      'get',
      null,
      token
    )
  }

  orders (status, token) {
    return this.client.apiRequest(
      '/api/v2/me/orders?=' + status,
      'get',
      null,
      token
    )
  }

  companies (token) {
    return this.client.apiRequest(
      '/api/v2/me/companies',
      'get',
      null,
      token
    )
  }

  fetchCompany (id, token) {
    return this.client.apiRequest(
      '/api/v2/me/companies/' + id,
      'get',
      null,
      token
    )
  }
}

module.exports = User
