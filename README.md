# melhor-envio-sdk

Biblioteca não oficial em node para consumir API do Melhor Envio.

### Usando:
Instale a dependência
```javascript
npm install melhor-envio
```
Crie uma instância para o cliente
```javascript
const MelhorEnvio = require('melhor-envio')

let settings = { 
    client_id: '00000', 
    client_secret: 'XXX', 
    sandbox: true,
    bearer: 'XXXXXXX',
    redirect_uri: 'XXXXXX',
    request_scope: 'XXXXX',
    state:'XXXX'
}

let client = new MelhorEnvio(settings);
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
```javascript
let settings = { 
    client_id: 'SEUCLIENTID', 
    client_secret: 'SEUCLIENTSECRET', 
    sandbox: true,
    redirect_uri: 'https://minhaurlcallback.com/callback-melhor-envio',
    request_scope: 'cart-read orders-read shipping-calculate'
}

let client = new MelhorEnvio(settings)

let url = client.auth.getAuth() 
```
Retorna url para oauth do melhor envio.
> Token
```javascript
/** Gerando */
let code = 'XXX' // parâmetro code enviado na url de redirecionamento informada
client.auth.getToken(code, function(body, response, erro){
    if(erro){
        console.log(erro)
        return
    }
    console.log(body) // body da requisição
})

/** Atualizando */
let refresh_token = 'YYZ' 
client.auth.refreshToken(refresh_token, function(body, response, erro){
    if(erro){
        console.log(erro)
        return
    }
    console.log(body) // body da requisição
})
```
> Usuário
```javascript
let settings = { 
    bearer: 'XJXJOA',
    sandbox: true,
}

let client = new MelhorEnvio(settings)

/** Listar informações do usuário: */
client.user.me(function(body, resp, err){
    //
})

/** Listar saldo do usuário: */
client.user.balance(function(body, resp, err){
    //
})

/** Listar endereços do usuário: */
client.user.addresses(function(body, resp, err){
    //
})
```
> Envios
```javascript

/** Listar serviços disponíveis: */
client.shipment.services(function(body, resp, err){
    //
})

/** Listar transportadoras disponíveis: */
client.shipment.companies(function(body, resp, err){
    //
})

/** Listar agências de transportadoras disponíveis: */
client.shipment.agencies(function(body, resp, err){
    //
})

/** Cálculo de frete: */
client.shipment.calculate(function(body, resp, err){
    //
})
```