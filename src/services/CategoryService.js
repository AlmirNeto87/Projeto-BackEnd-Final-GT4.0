
const CategoryModel = require('../models/CategoryModel');

class CategoryService {

    // CRIAR CATEGORIA
    async criar(data) {

        const categoryExists = await CategoryModel.findOne({
            where: { name: data.name }
        });

        if (categoryExists) {
            throw new Error('Categoria já cadastrada!');
        }

        const category = await CategoryModel.create({
            name: data.name,
            slug: data.slug,
            use_in_menu: data.use_in_menu
        });

        return category;
    }

    // LISTAR CATEGORIAS
    async listar() {

        const categories = await CategoryModel.findAll();

        return categories;
    }

    // BUSCAR CATEGORIA POR ID
    async listarPorId(id) {

        const category = await CategoryModel.findByPk(id);

        if (!category) {
            throw new Error('Categoria não encontrada!');
        }

        return category;
    }

    // ATUALIZAR CATEGORIA
    async atualizar(id, data) {

        const category = await CategoryModel.findByPk(id);

        if (!category) {
            throw new Error('Categoria não encontrada!');
        }

        const dadosPermitidos = {
            name: data.name,
            slug: data.slug,
            use_in_menu: data.use_in_menu
        };

        Object.keys(dadosPermitidos).forEach(key => {
            if (dadosPermitidos[key] === undefined) {
                delete dadosPermitidos[key];
            }
        });

        if (data.name !== undefined) {
            const categoryExists = await CategoryModel.findOne({
                where: { name: data.name }
            });

            if (categoryExists && categoryExists.id !== category.id) {
                throw new Error('Já existe uma categoria com esse nome!');
            }
        }

        await category.update(dadosPermitidos);

        return category;
    }

    // DELETAR CATEGORIA
    async deletar(id) {

        const category = await CategoryModel.findByPk(id);

        if (!category) {
            throw new Error('Categoria não encontrada!');
        }

        await category.destroy();

        return true;
    }
}

module.exports = CategoryService;
