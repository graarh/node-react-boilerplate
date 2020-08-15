require('ts-node/register');
require('@babel/register')({ extensions: ['.ts', '.js'] });
require('regenerator-runtime');

module.exports = {
  timeout: 15000,
}
