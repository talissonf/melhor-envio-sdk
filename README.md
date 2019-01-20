# melhor-envio-sdk

Biblioteca não oficial em node para consumir API do Melhor Envio.

### Usando:
Instale a dependência
```javascript
npm install melhor-envio
```
Crie uma instância para o cliente
```javascript
const settings = { 
    client_id: 'NoFIRJWYMjWbuW6ivVmzh6WkmGik5ZoMdy', 
    client_secret: 'HKwu8zOnl2B7IgsZzrc3IK3FGJXFS75x', 
    sandbox: true,
    bearer: 'x06muiypOSXkqRJo7lT82gDamRpj9VLmfSYplyalk5jLdetbHdrupeme3qjnc17I8AH2bXFp1Isapykr8pmHT6zkmOqA1lO3484V19PewdfT5dfw',
    redirect_uri: 'https://minhaurl.com/callback',
    request_scope: 'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write',
    state:'BPMDruWTWzd'
}

const me = require('melhor-envio').config(settings)

```
### Definições:
Parâmetro | Definição 
----------|---------- 
cliente_id| Client ID utilizados para autenticação com a API para solicitar a autorização dos usuários.
cliente_secret| Client Secret utilizados para autenticação com a API para solicitar a autorização dos usuários.
sandbox| Default false 
bearer| Token pessoal de acesso para consumo dos endpoints da API. **Obrigatório** em todas as operações com exceção das funções para geração de token. Pode ser gerado via SDK ou diretamente da sua conta no melhor envio.
redirect_uri| Url de redirecionamento 
request_scope| Permissões que o usuário irá ceder ao seu app. [lista de permissões](https://docs.melhorenvio.com.br/authentication.html) 
state| Argumento extra que pode ser enviado na requisição e retornado junto ao código de autenticação.

### Operações:

> Autenticação de app

Retorna url para autentiação via oath no Melhor Envio.

```javascript 
let url = me.auth.getAuth()
```

> Token

Após ser redirecionado pela autenticação do melhor envio, o parâmetro `code` é enviado na url. Com ele é possível gerar token para realizar determinadas operações na api.

```javascript
/** Gerando token */
let code = '9c8vcjjMPd57mgTmMvFU9A3UA74x5TvzdM46uUucmW4dZnM9YE66YBzYSKUT7mJv4nWL6eS2i2JczwccR4tfnKlWuGZyjVWMsKouvN5XZ9KH' // parâmetro code enviado na url de redirecionamento informada
me.auth.getToken(code)
    .then(access => {
        console.log(access)
    })
    .catch(e => console.log(e))

/** Atualizando */
let refresh_token = 'XgUYG2UE0AHxkXBboXRXtwph7u2039xIsTgbDWkzIST09H0gvwRFBu3O4rT2I0xdHvw7fF5HWNgTZ14YdqJ6o9vEyFGRBGlVtIWj' 
me.auth.refreshToken(refresh_token)
    .then(access => {
        console.log(access)
    })
    .catch(e => console.log(e))
```
> Usuário
```javascript

/** Listar informações do usuário: */
me.user.me()
    .then(user => console.log(user))
    .catch(e => console.log(e))

/** Listar saldo do usuário: */
me.user.balance()
    .then(balance => console.log(balance))
    .catch(e => console.log(e))

/** Listar endereços do usuário: */
me.user.addresses()
    .then(addresses => console.log(addresses))
    .catch(e => console.log(e))
```
> Envios
```javascript

/** Listar serviços disponíveis: */
me.shipment.services()
    .then(services => console.log(services))
    .catch(e => console.log(e))

/** Listar transportadoras disponíveis: */
me.shipment.companies()
    .then(companies => console.log(companies))
    .catch(e => console.log(e))

/** Listar agências de transportadoras disponíveis: */
me.shipment.agencies()
    .then(companies => console.log(companies))
    .catch(e => console.log(e))

/** Cálculo de frete: */
// formato do payload - https://docs.melhorenvio.com.br/shipment/calculate.html
let payload = {
  "from": {
    "postal_code": "31920333",  
    "address": "Rua Arco-íres",
    "number": "24"
  },
  "to": {
    "postal_code": "90570020",  
    "address": "Rua Pomba Branca",
    "number": "18"
  },
  "package": {
    "weight": 1,
    "width": 12,
    "height": 4,
    "length": 17
  },
  "options": {
    "insurance_value": 20.50,
    "receipt": false,
    "own_hand": false,
    "collect": false
  }
}

me.shipment.calculate(payload)
    .then(companies => console.log(companies))
    .catch(e => console.log(e))

/** Checkout */
let label = {
  "orders": [
    "6e1c864a-fe48-4ae7-baaa-d6e4888bafd1",
    "6e1c864a-fe48-4ae7-baaa-d6e4888bafd2",
    "6e1c864a-fe48-4ae7-baaa-d6e4888bafd3"
  ]
}

// se não for informado etiquetas
// para pagamento, é realizado a compra
// de todas as etiquetas em aberto no melhor envio.
// Mais opções e informações https://docs.melhorenvio.com.br/shipment/checkout.html
me.shipment.checkout(label)
    .then(resp => console.log(resp))
    .catch(e => console.log(e))
```