
const CategoryService = require('../services/CategoryService');
const categoryService = new CategoryService();

class CategoryController {

    // CADASTRAR USUÁRIO
    async criar(req, res) {
        try {
            console.log("teste criar categoria");
            const data = req.body;

            const category = await categoryService.criar(data);

            return res.status(201).json(category);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };

    // LISTAR TODOS OS USUÁRIOS
   
    // LISTAR CATEGORIAS
    async listar(req, res) {
        try {

            const categorys = await categoryService.listar(req.query);

            return res.status(200).json(categorys);

        } catch (error) {

            return res.status(error.statusCode || 500).json({
                error: error.message
            });
        }
    };


    // BUSCAR USUÁRIO POR ID
    async listarPorId(req, res) {
        try {
            const { id } = req.params;

            const category = await categoryService.listarPorId(id);

            return res.status(200).json(category);

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

            const category = await categoryService.atualizar(id, data);

            return res.status(200).json(category);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };

    // EXCLUIR USUÁRIO
    async deletar(req, res) {
        try {
            const { id } = req.params;

            await categoryService.deletar(id);

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

module.exports = CategoryController;
