const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Projeto Final BackEnd',
            version: '1.0.0',
            description: 'Documentação do Projeto Final de Backend'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Projeto BackEnd FullStack Online Geracao Tech 4.0'
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
        path.resolve(__dirname, '../routes/**/*.js').replace(/\\/g, '/')
    ]
};

const swaggerSpec = swaggerJsdoc(options);

console.log(
    'Rotas encontradas pelo Swagger:',
    Object.keys(swaggerSpec.paths || {})
);

module.exports = swaggerSpec;