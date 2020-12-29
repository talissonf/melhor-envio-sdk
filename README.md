# melhor-envio-sdk

Biblioteca não oficial em javascript para consumir API do Melhor Envio.

# Breaking changes:

- Mudança na interface de resposta das requisições na API.
  Em versões anteriores as requisições http eram feitas com o pacote [request](https://www.npmjs.com/package/request) que foi depreciado.
  Na versão atual todas respostas seguem o schema de respostas do [axios](https://github.com/axios/axios#response-schema).

- É possível informar token e outros parâmetros diretamente para os metódos.

### Usando:

Instale a dependência

```javascript
npm install melhor-envio
```

Crie uma instância para o cliente

```javascript
const MelhorEnvioSdk = require('melhor-envio')

const me = new MelhorEnvioSdk({
  client_id: 'NoFIRJWYMjWbuW6ivVmzh6WkmGik5ZoMdy',
  client_secret: 'HKwu8zOnl2B7IgsZzrc3IK3FGJXFS75x',
  sandbox: true,
  bearer:
    'x06muiypOSXkqRJo7lT82gDamRpj9VLmfSYplyalk5jLdetbHdrupeme3qjnc17I8AH2bXFp1Isapykr8pmHT6zkmOqA1lO3484V19PewdfT5dfw',
  redirect_uri: 'https://minhaurl.com/callback',
  request_scope:
    'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write',
  state: 'BPMDruWTWzd',
})
```

### Definições:

| Parâmetro      | Definição                                                                                                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cliente_id     | Client ID utilizados para autenticação com a API para solicitar a autorização dos usuários.                                                                                                                          |
| cliente_secret | Client Secret utilizados para autenticação com a API para solicitar a autorização dos usuários.                                                                                                                      |
| sandbox        | Default false                                                                                                                                                                                                        |
| bearer         | Token pessoal de acesso para consumo dos endpoints da API. **Obrigatório** em todas as operações com exceção das funções para geração de token. Pode ser gerado via SDK ou diretamente da sua conta no melhor envio. |
| redirect_uri   | Url de redirecionamento                                                                                                                                                                                              |
| request_scope  | Permissões que o usuário irá ceder ao seu app. [lista de permissões](https://docs.menv.io/#referencia-da-api)                                                                                                        |
| state          | Argumento extra que pode ser enviado na requisição e retornado junto ao código de autenticação.                                                                                                                      |

### Operações:

- ### Autenticação

> Autenticação de app

Retorna url para autenticar seu aplicativo

```javascript
const url = me.auth.getAuth()

// ou
const me = new MelhorEnvioSdk({
  sandbox: true,
})

const url = me.auth.getAuth({
  client_id: 'xxxx',
  scope: 'xxxx xxxx xxxx xxxx',
  state: 'meu id unico?',
  redirect_uri: 'https://minhaurl.com.br',
})

// tmb assim
const url = new MelhorEnvioSdk({ sandbox: true }).auth.getAuth({
  client_id: 'xxxx',
  scope: 'xxxx xxxx xxxx xxxx',
  state: 'meu id unico?',
  redirect_uri: 'https://minhaurl.com.br',
})
```

> Gerando tokens

No final do fluxo de autenticação, após usuário autorizar acesso do aplicativo a sua conta. O usuário é redirecionado para a url enviada no parametro `redirect_uri` e junto o parametro `code` e talvez o parametro `state`.

```javascript
/** Gerando token */
const code =
  '9c8vcjjMPd57mgTmMvFU9A3UA74x5TvzdM46uUucmW4dZnM9YE66YBzYSKUT7mJv4nWL6eS2i2JczwccR4tfnKlWuGZyjVWMsKouvN5XZ9KH'

me.auth
  .getToken(code)
  .then(({ data }) => {
    console.log(data)
  })
  .catch((e) => console.log(e))

// ou
const me = new MelhorEnvioSdk({
  sandbox: true,
})

me.auth
  .getToken(code, {
    client_id: 'xxxx',
    scope: 'xxxx xxxx xxxx xxxx',
    state: 'meu id unico?',
    redirect_uri: 'https://minhaurl.com.br',
  })
  .then(({ data }) => {
    console.log(data)
  })
  .catch((e) => console.log(e))

// com await

try {
  const response = new MelhorEnvioSdk({ sandbox: true }).auth.getToken(code, {
    client_id: 'xxxx',
    scope: 'xxxx xxxx xxxx xxxx',
    state: 'meu id unico?',
    redirect_uri: 'https://minhaurl.com.br',
  })

  console.log(response.data)
} catch (err) {
  console.log(err)
}

// É possível utilizar o setter setToken da instância da classe para definir o token para futuras operações com a classe
me.setToken = response.data.access_token

// com await
try {
  let token = await me.auth.getToken(code)
  me.setToken = token // configura token caso não seja informado na instância da classe.
} catch (e) {
  console.log(e)
}
```

> Atualizando token

```javascript
const refreshToken =
  'XgUYG2UE0AHxkXBboXRXtwph7u2039xIsTgbDWkzIST09H0gvwRFBu3O4rT2I0xdHvw7fF5HWNgTZ14YdqJ6o9vEyFGRBGlVtIWj'
me.auth
  .refreshToken(refreshToken)
  .then(({ data }) => {
    console.log(data)
  })
  .catch((e) => console.log(e))

// ou passando a configuração para função
const me = new MelhorEnvioSdk({
  sandbox: true,
})

me.refreshToken(refreshToken, {
  client_id: 'xxxx',
  client_secret: 'xxxx',
  scope: 'xxxx xxxx xxxx xxxx',
})
  .then((response) => {
    console.log(response.data)
  })
  .catch((e) => console.error(e))
```

> Usuário

```javascript
/** Listar informações do usuário: */
me.user.me()

/** Listar saldo do usuário: */
me.user.balance()

/** Listar endereços do usuário: */
me.user.addresses()

/** Listar companias */
me.user.companies()

/** Buscar informações de determinada compania */
me.user.fetchCompany()

/** Listar orders */
me.user.orders()
```

> Envios

```javascript
/** Cálculo de frete: */
// formato do payload - https://docs.menv.io/#9bbc2460-7786-4871-a0cc-2ae3cd54333e
me.shipment
  .calculate({
    from: {
      postal_code: '31920333',
      address: 'Rua Arco-íres',
      number: '24',
    },
    to: {
      postal_code: '90570020',
      address: 'Rua Pomba Branca',
      number: '18',
    },
    package: {
      weight: 1,
      width: 12,
      height: 4,
      length: 17,
    },
    options: {
      insurance_value: 20.5,
      receipt: false,
      own_hand: false,
      collect: false,
    },
  })
  .then(({ data }) => console.log(data))
  .catch((e) => console.log(e))

/** Checkout */
let label = {
  orders: [
    '6e1c864a-fe48-4ae7-baaa-d6e4888bafd1',
    '6e1c864a-fe48-4ae7-baaa-d6e4888bafd2',
    '6e1c864a-fe48-4ae7-baaa-d6e4888bafd3',
  ],
}

// se não for informado etiquetas
// para pagamento, é realizado a compra
// de todas as etiquetas em aberto no melhor envio.
// Mais opções e informações https://docs.melhorenvio.com.br/shipment/checkout.html
me.shipment
  .checkout(label)
  .then((resp) => console.log(resp))
  .catch((e) => console.log(e))
```

## TODO
 - terminar documentação, se orientem pelo jsdoc nos metódos