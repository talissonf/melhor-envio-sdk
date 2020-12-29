const axios = require('axios')
const pkg = require('./../package.json')

const instance = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': `${pkg.name}-sdk@${pkg.version} - ${pkg.author} - <${pkg.homepage}>`
  }
})

module.exports = (sandbox = false) => {
  instance.defaults.baseURL = sandbox ? 'https://sandbox.melhorenvio.com.br' : 'https://melhorenvio.com.br'
  return instance
}
