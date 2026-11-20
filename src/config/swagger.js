const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Projeto Final BackEnd',
            version: '1.0.0',
            description: 'Documentação do Projeto Final de Backend do Curso de FullStack Online da Geracao Tech 4.0'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Projeto Final BackEnd'
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