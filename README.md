# melhor-envio-sdk

An unofficial client for the Melhor Envio API.

```
npm install

```
Require Client
```
const MelhorEnvio = require('./lib/melhorenvio')

let settings = { 
    client_id: 'your_client_id', 
    client_secret: 'your_client_secret', 
    sandbox: default false,
    bearer: 'your_token',
    redirect_uri: 'your_callback_uri',
    request_scope: 'scope'
}

let client = new MelhorEnvio(settings);

```

Autentication
```
client.auth.getAuth()

client.auth.refreshToken(token, function(body, response, erro){
    console.log(body)
})

```