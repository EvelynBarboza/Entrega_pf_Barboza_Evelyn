const { dirname } = require('path')
exports.swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Documentacion de App para mi e-commerce',
        description: 'APPI para documentar app de de un mini e-commerce'
      }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`]
  }