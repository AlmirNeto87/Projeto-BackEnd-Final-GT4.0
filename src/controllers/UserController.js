
const UserService = require('../services/UserService');

const userService = new UserService()

class UserController {

    // CADASTRAR USUÁRIO
    async criar(req, res) {
        try {
            const data = req.body;

            const user = await userService.criar(data);

            return res.status(201).json(user);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };

    // LISTAR TODOS OS USUÁRIOS
    async listar(req, res) {
        try {
            const users = await userService.listar();

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    };

    // BUSCAR USUÁRIO POR ID
    async listarPorId(req, res) {
        try {
            const { id } = req.params;

            const user = await userService.listarPorId(id);

            return res.status(200).json(user);

        } catch (error) {
            return res.status(404).json({
                error: error.message
            });
        }
    };

    // ATUALIZAR USUÁRIO
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const user = await userService.atualizar(id, data);

            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };

    // EXCLUIR USUÁRIO
    async excluir(req, res) {
        try {
            const { id } = req.params;

            await userService.excluir(id);

            return res.status(200).json({
                message: 'Usuário excluído com sucesso!'
            });

        } catch (error) {
            return res.status(404).json({
                error: error.message
            });
        }
    };

};

module.exports = UserController;
