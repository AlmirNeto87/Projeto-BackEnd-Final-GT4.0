const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Minha API',
            version: '1.0.0',
            description: 'Documentação da API Backend'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de ervidor de Projeto BackEnd FullStack Online Geracao Tech 4.0'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },

    apis: [
        path.resolve(__dirname, '../routes/**/*.js')
    ]
};

const swaggerSpec = swaggerJsdoc(options);

console.log(
    'Rotas encontradas pelo Swagger:',
    Object.keys(swaggerSpec.paths || {})
);

module.exports = swaggerSpec;