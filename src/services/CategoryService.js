
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
   
    // LISTAR CATEGORIAS
    async listar(query = {}) {

        // VALIDAR LIMIT
        const limit = query.limit === undefined
            ? 12
            : Number(query.limit);

        if (!Number.isInteger(limit) || (limit !== -1 && limit <= 0)) {
            const error = new Error('O parâmetro limit deve ser um número inteiro positivo ou -1!');
            error.statusCode = 400;
            throw error;
        }

        // VALIDAR PAGE
        let page = 1;

        if (limit !== -1) {

            page = query.page === undefined
                ? 1
                : Number(query.page);

            if (!Number.isInteger(page) || page <= 0) {
                const error = new Error('O parâmetro page deve ser um número inteiro positivo!');
                error.statusCode = 400;
                throw error;
            }
        }

        // VALIDAR FIELDS
        let attributes;

        if (query.fields !== undefined) {

            attributes = query.fields
                .split(',')
                .map(field => field.trim())
                .filter(Boolean);

            if (attributes.length === 0) {
                const error = new Error('Informe pelo menos um campo válido em fields!');
                error.statusCode = 400;
                throw error;
            }

            // VERIFICAR SE OS CAMPOS EXISTEM NO MODEL
            const camposDisponiveis = Object.keys(CategoryModel.rawAttributes);

            const camposInvalidos = attributes.filter(
                field => !camposDisponiveis.includes(field)
            );

            if (camposInvalidos.length > 0) {
                const error = new Error(
                    `Campos inválidos: ${camposInvalidos.join(', ')}`
                );
                error.statusCode = 400;
                throw error;
            }
        }

        // VALIDAR USE_IN_MENU
        const where = {};

        if (query.use_in_menu !== undefined) {

            if (!['true', 'false'].includes(query.use_in_menu)) {
                const error = new Error('O parâmetro use_in_menu deve ser true ou false!');
                error.statusCode = 400;
                throw error;
            }

            where.use_in_menu = query.use_in_menu === 'true';
        }

        // CONFIGURAR CONSULTA
        const options = {
            where
        };

        if (attributes) {
            options.attributes = attributes;
        }

        // PAGINAÇÃO
        if (limit !== -1) {
            options.limit = limit;
            options.offset = (page - 1) * limit;
        }

        const categories = await CategoryModel.findAll(options);

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
