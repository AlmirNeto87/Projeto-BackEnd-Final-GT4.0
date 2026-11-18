
require('dotenv').config();

require('./models');

const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        await sequelize.authenticate();

        console.log('Conexão com MySQL estabelecida!');

        await sequelize.sync();

        console.log('Tabelas sincronizadas!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {

        console.error('Erro ao iniciar aplicação:', error);

        process.exit(1);
    }
}

startServer();
