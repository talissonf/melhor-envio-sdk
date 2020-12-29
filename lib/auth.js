const qs = require('querystring')
const FormData = require('form-data')

class Auth {
  /**
   * 
   * @arguments {MelhorEnvio} client - Instancia base das demais classes
   */
  constructor(client) {
    this.client = client
  }

  /**
   * @description Gera url para autorização de acesso a conta no melhor envio.
   * @param {Object=} options - Configurações do app, opcional, se informado sobrescreve as configurações da instancia da classe.
   * @param {string} options.client_id - Gerado na criação do aplicativo.
   * @param {string} options.redirect_uri - Idêntica a informada na criação do aplicativo.
   * @param {string} options.response_type - Tipo de resposta - Caso não informado default será usado.
   * @param {string} options.scope - Lista de permissões que você precisa na solicitação do oauth. Separado por espaço ex; 'cart-read cart-write companies-read ...'
   * @param {string} options.state - Argumento opcional, mas caso informado, será retornado junto ao code no final do fluxo de autenticação.
   * @returns {Promise<response|error>}
   * Axios request promise resolved with
   * [response]{@link https://github.com/axios/axios#response-schema}
   * or rejected with
   * [error]{@link https://github.com/axios/axios#handling-errors}.
   * @example // Configurando a instância
   * const me = new MelhorEnvio({
   *    sandbox: true,
   *    client_id: 'xxxx',
   *    scope: 'xxxx xxxx xxxx xxxx',
   *    state: 'meu id unico?',
   *    redirect_uri: 'https://minhaurl.com.br'
   * })
   * 
   * const url = me.auth.getAuth()
   * @example // ou passando a configuração para função
   * const me = new MelhorEnvio({
   *    sandbox: true
   * })
   * 
   * const url = me.auth.getAuth({
   *    client_id: 'xxxx',
   *    scope: 'xxxx xxxx xxxx xxxx',
   *    state: 'meu id unico?',
   *    redirect_uri: 'https://minhaurl.com.br'
   * })
  */
  getAuth (options = {}) {
    if (!this.client.client_id && (!options || !options.client_id)) {
      throw new Error('options.client_id is required to request auth.')
    }

    return this.client.axios.defaults.baseURL +
      '/oauth/authorize?' +
      qs.stringify({
        client_id: options.client_id || this.client.client_id,
        redirect_uri: options.redirect_uri || this.client.redirect_uri,
        response_type: options.response_type || 'code',
        scope: options.scope || this.client.request_scope,
        state: options.state || this.client.state || ''
      })
  }

  /**
   * @description Exibe as configurações cadastradas pelo usuário no seu aplicativo
   * @param {string} token Token bearer gerado via oauth para o aplicativo
   * @returns {Promise<response|error>}
   * Axios request promise resolved with
   * [response]{@link https://github.com/axios/axios#response-schema}
   * or rejected with
   * [error]{@link https://github.com/axios/axios#handling-errors}.
   */
  getAppSettings (token) {
    return this.client.axios({
      url: '/api/v2/me/shipment/app-settings',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${this.client.bearer || token}`, 
      }
    })
  }

  /**
   * @async
   * @description Atualiza token expirado
   * {@link https://docs.menv.io/#4e68946c-e4d5-4d2e-bddf-34e7d9c12fe3 doc}
   * @param {string} refreshToken - Token gerado em auth.getToken()
   * @param {Object=} options - Configurações do app, opcional, se informado sobrescreve as configurações da instancia da classe.
   * @param {string} options.client_id - Gerado na criação do aplicativo.
   * @param {string} options.client_secret - Gerado na criação do aplicativo.
   * @param {string} options.scope - Lista de permissões que você precisa na solicitação do oauth. Separado por espaço ex; 'cart-read cart-write companies-read ...'
   * @returns {Promise<response|error>}
   * Axios request promise resolved with
   * [response]{@link https://github.com/axios/axios#response-schema}
   * or rejected with
   * [error]{@link https://github.com/axios/axios#handling-errors}.
   * @example // Configurando a instância
   * const me = new MelhorEnvio({
   *    sandbox: true,
   *    client_id: 'xxxx',
   *    client_secret: 'xxxx',
   *    scope: 'xxxx xxxx xxxx xxxx'
   * })
   * 
   * me.refreshToken(refreshToken).then(data => {
   *    console.log(data)
   * })
   *  .catch(e => console.error(e))
   * @example // ou passando a configuração para função
   * const me = new MelhorEnvio({
   *    sandbox: true
   * })
   * me.refreshToken(refreshToken, {
   *    client_id: 'xxxx',
   *    client_secret: 'xxxx',
   *    scope: 'xxxx xxxx xxxx xxxx'
   * }).then(response => {
   *    console.log(response.data)
   * })
   *  .catch(e => console.error(e))
  */
  refreshToken (refreshToken, options = {}) {
    if ((!this.client.client_id && !options.client_id) || (!this.client.client_secret && !options.client_secret)) {
      throw new Error('Missin required fields client_id or client_secret')
    }

    const fields = {
      grant_type: options.grant_type || 'refresh_token',
      refresh_token: refreshToken,
      client_id: options.client_id || this.client.client_id,
      client_secret: options.client_secret || this.client.client_secret,
      scope: options.scope || this.client.request_scope
    }

    const data = new FormData()
    for (const field in fields) {
      if (fields[field]) {
        data.append(field, fields[field])
      }
    }

    return this.client.axios({
      url: '/oauth/token',
      method: 'post',
      headers: { ...data.getHeaders() },
      data: data
    })
  }

  /**
   * @async
   * @description Gera token a partir do código gerado em Auth.getAuth({})
   * @param {string} code - Código enviado a url informada em redirect_uri no final do fluxo de autenticação 
   * @param {Object=} options - Configurações do app, opcional, se informado sobrescreve as configurações da instancia da classe.
   * @param {string} options.client_id - Gerado na criação do aplicativo.
   * @param {string} options.client_secret - Gerado na criação do aplicativo.
   * @param {string} options.redirect_uri - Idêntica a informada na criação do aplicativo.
   * @param {string} options.response_type - Tipo de resposta - Caso não informado default será usado.
   * @param {string} options.scope - Lista de permissões que você precisa na solicitação do oauth. Separado por espaço ex; 'cart-read cart-write companies-read ...'
   * @param {string} options.state - Argumento opcional, mas caso informado, será retornado junto ao code no final do fluxo de autenticação.
   * @returns {Promise<response|error>}
   * Axios request promise resolved with
   * [response]{@link https://github.com/axios/axios#response-schema}
   * or rejected with
   * [error]{@link https://github.com/axios/axios#handling-errors}.
   * @example // Configurando a instância
   * const code = 'xyz'
   * const me = new MelhorEnvio({
   *    sandbox: true,
   *    client_id: 'xxxx',
   *    client_secret: 'xxxx',
   *    scope: 'xxxx xxxx xxxx xxxx',
   *    redirect_uri: 'https://minhaurl.com.br'
   * })
   * 
   * me.getToken(code).then(response => {
   *    console.log(response.data)
   * })
   *  .catch(e => console.error(e))
   * @example // ou passando a configuração para função
   * const me = new MelhorEnvio({
   *    sandbox: true
   * })
   * me.getToken(code, {
   *    client_id: 'xxxx',
   *    client_secret: 'xxxx',
   *    scope: 'xxxx xxxx xxxx xxxx',
   *    redirect_uri: 'https://minhaurl.com.br'
   * }).then(({ data }) => {
   *    console.log(data)
   * })
   *  .catch(e => console.error(e))
  */
  getToken (code, options = {}) {
    if ((!this.client.client_id && !options.client_id) || (!this.client.client_secret && !options.client_secret)) {
      throw new Error('Missin required filds options.client_id, options.client_secret')
    }

    const fields = {
      grant_type: options.grant_type || 'authorization_code',
      client_id: options.client_id || this.client.client_id,
      client_secret: options.client_secret || this.client.client_secret,
      redirect_uri: options.redirect_uri || this.client.redirect_uri,
      code: code
    }

    const data = new FormData()
    for (const field in fields) {
      if (fields[field]) {
        data.append(field, fields[field])
      }
    }

    return this.client.axios({
      url: '/oauth/token',
      method: 'post',
      headers: { ...data.getHeaders() },
      data: data
    })
  }
}

module.exports = Auth
