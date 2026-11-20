const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const express = require('express');

const PrivateRoutes = require('./routes/PrivateRoutes');
const PublicRoutes = require('./routes/PublicRoutes');

class App {

    constructor() {

        this.server = express();
        this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.middlewares();
        this.routes();
        
        this.notFound();
    }

    // MIDDLEWARES
    middlewares() {

        this.server.use(express.json());

    }

    // ROTAS
    routes() {

        this.server.get('/', (request, response) => {

            return response.send('Hello World!');

        });

        this.server.use(PublicRoutes);
        this.server.use(PrivateRoutes);

    }

    // TRATAMENTO DE ROTAS INEXISTENTES
    notFound() {

        this.server.use((request, response) => {

            return response.status(404).json({
                error: 'Rota não encontrada!'
            });

        });

    }

}

module.exports = new App().server;
