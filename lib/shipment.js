const qs = require('querystring')
class Shipment {
  constructor(client) {
    this.client = client
  }

  /**
   * @description Realiza cálculo de frete
   * @param {Object} payload Referencia {@link https://docs.menv.io/#9bbc2460-7786-4871-a0cc-2ae3cd54333e}
   * @param {string=} token melhor envio token
   */
  calculate (payload, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/calculate',
      'post',
      payload,
      token
    )
  }

  /**
   * @description Listar Carrinhos de compra
   * @param {Object} orderId Order Id
   * @param {string=} token melhor envio token
   */
  fetchCart (orderId, token) {
    let url = '/api/v2/me/cart'
    if (orderId) {
      url += `/${orderId}`
    }

    return this.client.apiRequest(url, null, null, token)
  }

  /**
   * @description Inserer etiqueta ao carrinho de compras
   * @param {Object} payload Referencia {@link https://docs.menv.io/#9a8f308b-4872-4268-b402-e1b0d64d1f1c}
   * @param {string=} token melhor envio token
   */
  addToCart (payload, token) {
    return this.client.apiRequest(
      '/api/v2/me/cart',
      'post',
      payload,
      token
    )
  }

  /**
   * @description Remove etiqueta do carrinho de compras
   * @param {Object} orderId Order Id
   * @param {string=} token melhor envio token
   */
  removeFromCart (orderId, token) {
    return this.client.apiRequest(
      '/api/v2/me/cart/' + orderId,
      'delete',
      null,
      token
    )
  }

  /**
   * @description Realiza compra de etiquetas inseridas no carrinho
   * @param {Object} orders referencia {@link https://docs.menv.io/#7e06bab0-4da6-4046-9137-2eae342dd1ea}
   * @param {string=} token melhor envio token
   */
  checkout (orders, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/checkout',
      'post',
      orders,
      token
    )
  }

  /**
   * @description Pré-visualização da etiqueta antes de realizar a compra
   * @param {Object} orders referencia {@link https://docs.menv.io/#774764d2-5d02-4612-a6cb-ef99f6d0123d}
   * @param {string=} token melhor envio token
   */
  preview (orders, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/preview',
      'post',
      orders,
      token
    )
  }

  /**
   * @description Geração de etiquetas
   * @param {Object} orders referencia {@link https://docs.menv.io/#506b2627-1d73-48d9-8a6c-786c4253ccae}
   * @param {string=} token melhor envio token
   */
  generate (orders, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/generete',
      'post',
      orders,
      token
    )
  }

  /**
   * @description Obtem link de impressão das estiquetas
   * @param {Object} data referencia {@link https://docs.menv.io/#14ef3ff3-ba9f-43d9-af13-81708ac1f1d2}
   * @param {string=} token melhor envio token
   */
  print (data, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/print',
      'post',
      data,
      token
    )
  }

  /**
   * @description Pesquisar etiquetas
   * @param {Object} query {id|protocol|tracking|authorization_code|self_tracking} - referencia {@link https://docs.menv.io/#14ef3ff3-ba9f-43d9-af13-81708ac1f1d2}
   * @param {string=} token melhor envio token
   */
  find (query, token) {
    return this.client.apiRequest(
      '/api/v2/me/orders/search?q=' + qs.stringify(query),
      'get',
      null,
      token
    )
  }

  /**
   * @description Cancela determinada etiqueta
   * @param {Object} data Referencia https://docs.menv.io/#25e035f7-9d96-45b7-9dfc-f2cfadfa334e
   * @param {string=} token melhor envio token
   */
  destroyLabel (data, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/cancel',
      'post',
      data,
      token
    )
  }

  /**
   * @description Verifica se determinada etiqueta pode ser cancelada
   * @param {Object} data Referencia https://docs.menv.io/#20cc9da3-1df5-4702-b9c8-372c27db2552
   * @param {string=} token melhor envio token
   */
  labelIsCancellable (data, token) {
    return this.client.apiRequest(
      '/api/v2/me/shipment/cancellable',
      'post',
      data,
      token
    )
  }
}
module.exports = Shipment
