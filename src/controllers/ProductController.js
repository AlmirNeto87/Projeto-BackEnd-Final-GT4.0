
const ProductService = require('../services/ProductService');

const productService = new ProductService();
class ProductController {

    // CADASTRAR USUÁRIO
    async criar(req, res) {
        try {
            const data = req.body;

            const user = await productService.criar(data);

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
            const users = await productService.listar();

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

            const product = await productService.listarPorId(id);

            return res.status(200).json(product);

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

            const product = await productService.atualizar(id, data);

            return res.status(200).json(product);

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

            await productService.excluir(id);

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

module.exports = ProductController;
