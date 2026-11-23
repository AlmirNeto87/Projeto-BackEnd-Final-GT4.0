
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const ProductOptionModel = require('../models/ProductOptionModel');
const ProductImageModel = require('../models/ProductImageModel');
const { Op } = require('sequelize');
const database = require('../config/database');

class ProductService {

    // CRIAR PRODUTO
    async criar(data) {

        const transaction = await database.transaction();

        try {

            const {
                enabled,
                name,
                slug,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount,
                categories = [],
                options = [],
                images = []
            } = data;

            // Verificar se as categorias existem
            const categoryIds = [...new Set(categories)];

            const categoriesExists = await CategoryModel.findAll({
                where: {
                    id: categoryIds
                },
                transaction
            });

            if (categoriesExists.length !== categoryIds.length) {
                throw new Error('Uma ou mais categorias não existem!');
            }

            // Criar produto principal
            const product = await ProductModel.create({
                enabled,
                name,
                slug,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            }, {
                transaction
            });

            // Associar categorias ao produto
            await product.setCategories(categoryIds, {
                transaction
            });

            // Cadastrar opções do produto
            if (options.length > 0) {

                const optionsData = options.map(option => ({
                    product_id: product.id,
                    title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    values: option.values
                }));

                await ProductOptionModel.bulkCreate(
                    optionsData,
                    { transaction }
                );
            }

            // Cadastrar imagens do produto
            if (images.length > 0) {

                const imagesData = images.map(image => ({
                    product_id: product.id,
                    enabled: image.enabled,
                    path: image.path
                }));

                await ProductImageModel.bulkCreate(
                    imagesData,
                    { transaction }
                );
            }

           const productCreated = await ProductModel.findByPk(product.id, {
                include: [
                    {
                        model: CategoryModel,
                        as: 'categories',
                        through: { attributes: [] }
                    },
                    {
                        model: ProductOptionModel,
                        as: 'options'
                    },
                    {
                        model: ProductImageModel,
                        as: 'images'
                    }
                ],
                transaction
            });

            await transaction.commit();

            return productCreated;
        } catch (error) {

            if (!transaction.finished) {
                await transaction.rollback();
            }

            throw error;
        }
    };


    // LISTAR PRODUTOS
    
    // LISTAR PRODUTOS COM FILTROS, PAGINAÇÃO E SELEÇÃO DE CAMPOS
    
    // LISTAR PRODUTOS COM FILTROS, PAGINAÇÃO E SELEÇÃO DE CAMPOS
    async listar(query = {}) {

        const {
            limit = '12',
            page = '1',
            fields,
            match,
            category_ids,
            'price-range': priceRange
        } = query;

        // VALIDAR PAGINAÇÃO
        const parsedLimit = Number(limit);

        if (!Number.isInteger(parsedLimit) || parsedLimit === 0 || parsedLimit < -1) {
            throw new Error('O parâmetro limit deve ser um inteiro positivo ou -1!');
        }

        // Quando limit=-1, page é ignorado
        const parsedPage = Number(page);

        if (parsedLimit !== -1 && (!Number.isInteger(parsedPage) || parsedPage < 1)) {
            throw new Error('O parâmetro page deve ser um inteiro maior que zero!');
        }

        const options = {
            where: {},
            include: [],
            order: [['id', 'ASC']]
        };

        // SELEÇÃO DE CAMPOS
        const camposPermitidos = [
            'id',
            'enabled',
            'name',
            'slug',
            'use_in_menu',
            'stock',
            'description',
            'price',
            'price_with_discount',
            'created_at',
            'updated_at'
        ];

        const relacionamentos = ['categories', 'images', 'options'];

        let camposSolicitados = [];

        if (fields !== undefined) {

            camposSolicitados = String(fields)
                .split(',')
                .map(campo => campo.trim())
                .filter(Boolean);

            const camposInvalidos = camposSolicitados.filter(
                campo => !camposPermitidos.includes(campo) &&
                    !relacionamentos.includes(campo)
            );

            if (camposInvalidos.length > 0) {
                throw new Error(`Campos inválidos: ${camposInvalidos.join(', ')}`);
            }

            const atributos = camposSolicitados.filter(
                campo => camposPermitidos.includes(campo)
            );

            // Mantém o ID disponível para os relacionamentos
            options.attributes = [...new Set(['id', ...atributos])];

            if (camposSolicitados.includes('categories')) {
                options.include.push({
                    model: CategoryModel,
                    as: 'categories',
                    through: { attributes: [] }
                });
            }

            if (camposSolicitados.includes('images')) {
                options.include.push({
                    model: ProductImageModel,
                    as: 'images'
                });
            }

            if (camposSolicitados.includes('options')) {
                options.include.push({
                    model: ProductOptionModel,
                    as: 'options'
                });
            }

        } else {

            // Comportamento padrão: retornar todos os campos e relacionamentos
            options.include.push(
                {
                    model: CategoryModel,
                    as: 'categories',
                    through: { attributes: [] }
                },
                {
                    model: ProductOptionModel,
                    as: 'options'
                },
                {
                    model: ProductImageModel,
                    as: 'images'
                }
            );

        }

        // BUSCA POR NOME OU DESCRIÇÃO
        if (match) {

            options.where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } }
            ];

        }

        // FILTRO POR CATEGORIAS
        if (category_ids !== undefined) {

            const categoryIds = String(category_ids)
                .split(',')
                .map(id => Number(id.trim()));

            if (
                categoryIds.length === 0 ||
                !categoryIds.every(id => Number.isInteger(id) && id > 0)
            ) {
                throw new Error('IDs de categorias inválidos!');
            }

            options.include = options.include.filter(
                include => include.as !== 'categories'
            );

            options.include.push({
                model: CategoryModel,
                as: 'categories',
                attributes: camposSolicitados.includes('categories') ? undefined : [],
                through: { attributes: [] },
                where: {
                    id: { [Op.in]: categoryIds }
                },
                required: true
            });

        }

        // FILTRO POR FAIXA DE PREÇO
        if (priceRange !== undefined) {

            const valores = String(priceRange).split('-').map(Number);

            if (
                valores.length !== 2 ||
                !valores.every(valor => Number.isFinite(valor)) ||
                valores[0] < 0 ||
                valores[1] < valores[0]
            ) {
                throw new Error('Faixa de preço inválida! Utilize o formato 100-200.');
            }

            options.where.price = {
                [Op.between]: valores
            };

        }

        // FILTRO POR OPÇÕES
        const optionFilters = {};

        // Compatibilidade com query parser que entrega option como objeto
        if (
            query.option &&
            typeof query.option === 'object' &&
            !Array.isArray(query.option)
        ) {
            Object.assign(optionFilters, query.option);
        }

        // Compatibilidade com query parser que entrega option[45] como chave literal
        Object.entries(query).forEach(([key, value]) => {

            const matchOption = key.match(/^option\[(\d+)\]$/);

            if (matchOption) {
                optionFilters[matchOption[1]] = value;
            }

        });

        const optionIds = Object.keys(optionFilters);

        if (optionIds.length > 0) {

            const produtosEncontradosPorOpcao = [];

            // Consultar todas as opções informadas
            const optionRows = await ProductOptionModel.findAll({
                where: {
                    id: {
                        [Op.in]: optionIds.map(Number)
                    }
                },
                attributes: ['id', 'product_id', 'values']
            });

            // Verificar cada opção individualmente
            for (const optionId of optionIds) {

                const id = Number(optionId);

                if (!Number.isInteger(id) || id <= 0) {
                    throw new Error('ID de opção inválido!');
                }

                const valoresSolicitados = String(optionFilters[optionId])
                    .split(',')
                    .map(value => value.trim())
                    .filter(Boolean);

                if (valoresSolicitados.length === 0) {
                    throw new Error(`Informe valores válidos para a opção ${optionId}!`);
                }

                const optionRow = optionRows.find(
                    option => Number(option.id) === id
                );

                if (!optionRow) {
                    produtosEncontradosPorOpcao.push(new Set());
                    continue;
                }

                // Normalizar valores armazenados em CSV ou JSON
                let valoresArmazenados = [];

                if (Array.isArray(optionRow.values)) {

                    valoresArmazenados = optionRow.values;

                } else {

                    const valorOriginal = String(optionRow.values);

                    try {

                        const valorJSON = JSON.parse(valorOriginal);

                        if (Array.isArray(valorJSON)) {
                            valoresArmazenados = valorJSON;
                        } else if (typeof valorJSON === 'string') {
                            valoresArmazenados = [valorJSON];
                        } else {
                            valoresArmazenados = valorOriginal.split(',');
                        }

                    } catch (error) {

                        valoresArmazenados = valorOriginal.split(',');

                    }

                }

                valoresArmazenados = valoresArmazenados.map(
                    value => String(value).trim()
                );

                // Comparação exata dos valores
                const encontrouValor = valoresSolicitados.some(
                    valor => valoresArmazenados.includes(valor)
                );

                if (encontrouValor) {

                    produtosEncontradosPorOpcao.push(
                        new Set([Number(optionRow.product_id)])
                    );

                } else {

                    produtosEncontradosPorOpcao.push(new Set());

                }

            }

            // O produto precisa corresponder a TODAS as opções solicitadas
            let produtosValidos = produtosEncontradosPorOpcao[0];

            for (let i = 1; i < produtosEncontradosPorOpcao.length; i++) {

                produtosValidos = new Set(
                    [...produtosValidos].filter(
                        id => produtosEncontradosPorOpcao[i].has(id)
                    )
                );

            }

            options.where.id = {
                [Op.in]: [...produtosValidos]
            };

        }

        // PAGINAÇÃO
        if (parsedLimit !== -1) {

            options.limit = parsedLimit;
            options.offset = (parsedPage - 1) * parsedLimit;

        }

        return await ProductModel.findAll(options);

    };




    // BUSCAR PRODUTO POR ID
    async listarPorId(id) {

        const product = await ProductModel.findByPk(id, {
            include: [
                {
                    model: CategoryModel,
                    as: 'categories',
                    through: {
                        attributes: []
                    }
                },
                {
                    model: ProductOptionModel,
                    as: 'options'
                },
                {
                    model: ProductImageModel,
                    as: 'images'
                }
            ]
        });

        if (!product) {
            throw new Error('Produto não encontrado!');
        }

        return product;
    };

    // Funcao complicada !!!!
    async atualizar(id, data) {

        const transaction = await database.transaction();

        try {

            // BUSCAR PRODUTO
            const product = await ProductModel.findByPk(id, {
                transaction
            });

            if (!product) {
                const error = new Error('Produto não encontrado!');
                error.statusCode = 404;
                throw error;
            }

            // VERIFICAR SE EXISTEM DADOS PARA ATUALIZAR
            if (!data || typeof data !== 'object' || Array.isArray(data)) {
                throw new Error('Dados inválidos!');
            }

            const camposPermitidos = [
                'enabled',
                'name',
                'slug',
                'use_in_menu',
                'stock',
                'description',
                'price',
                'price_with_discount',
                'category_ids',
                'images',
                'options'
            ];

            const camposEnviados = camposPermitidos.filter(
                campo => data[campo] !== undefined
            );

            if (camposEnviados.length === 0) {
                throw new Error('Informe pelo menos um campo para atualizar!');
            }


            // ATUALIZAR DADOS PRINCIPAIS
            const camposPrincipais = [
                'enabled',
                'name',
                'slug',
                'use_in_menu',
                'stock',
                'description',
                'price',
                'price_with_discount'
            ];

            const dadosAtualizacao = {};

            camposPrincipais.forEach(campo => {

                if (data[campo] !== undefined) {
                    dadosAtualizacao[campo] = data[campo];
                }

            });

            if (Object.keys(dadosAtualizacao).length > 0) {

                await product.update(dadosAtualizacao, {
                    transaction
                });

            };


            // ATUALIZAR CATEGORIAS
            if (data.category_ids !== undefined) {

                if (!Array.isArray(data.category_ids)) {
                    throw new Error('category_ids deve ser uma lista!');
                }

                const categoryIds = [...new Set(data.category_ids)];

                if (!categoryIds.every(id =>
                    Number.isInteger(Number(id)) && Number(id) > 0
                )) {
                    throw new Error('IDs de categorias inválidos!');
                }

                const categoriesExists = await CategoryModel.findAll({
                    where: {
                        id: categoryIds
                    },
                    transaction
                });

                if (categoriesExists.length !== categoryIds.length) {
                    throw new Error('Uma ou mais categorias não existem!');
                }

                await product.setCategories(categoryIds, {
                    transaction
                });

            };


            // ATUALIZAR IMAGENS
            if (data.images !== undefined) {

                if (!Array.isArray(data.images)) {
                    throw new Error('Images deve ser uma lista!');
                }

                for (const image of data.images) {

                    // EXCLUIR IMAGEM
                    if (image.deleted === true) {

                        if (!image.id) {
                            throw new Error('Informe o ID da imagem para excluir!');
                        }

                        const imageExists = await ProductImageModel.findOne({
                            where: {
                                id: image.id,
                                product_id: product.id
                            },
                            transaction
                        });

                        if (!imageExists) {
                            throw new Error('Imagem não encontrada neste produto!');
                        }

                        await imageExists.destroy({ transaction });

                        continue;
                    }


                    // ATUALIZAR IMAGEM EXISTENTE
                    if (image.id) {

                        const imageExists = await ProductImageModel.findOne({
                            where: {
                                id: image.id,
                                product_id: product.id
                            },
                            transaction
                        });

                        if (!imageExists) {
                            throw new Error('Imagem não encontrada neste produto!');
                        }

                        const imageData = {};

                        if (image.path !== undefined) {
                            imageData.path = image.path;
                        }

                        if (image.enabled !== undefined) {
                            imageData.enabled = image.enabled;
                        }

                        if (Object.keys(imageData).length > 0) {

                            await imageExists.update(imageData, {
                                transaction
                            });

                        }

                    } else {

                        // CADASTRAR NOVA IMAGEM
                        if (!image.path) {
                            throw new Error('O caminho da imagem é obrigatório!');
                        }

                        await ProductImageModel.create({
                            product_id: product.id,
                            path: image.path,
                            enabled: image.enabled
                        }, {
                            transaction
                        });

                    }

                }

            };


            // ATUALIZAR OPÇÕES
            if (data.options !== undefined) {

                if (!Array.isArray(data.options)) {
                    throw new Error('Options deve ser uma lista!');
                }

                for (const option of data.options) {

                    // EXCLUIR OPÇÃO
                    if (option.deleted === true) {

                        if (!option.id) {
                            throw new Error('Informe o ID da opção para excluir!');
                        }

                        const optionExists = await ProductOptionModel.findOne({
                            where: {
                                id: option.id,
                                product_id: product.id
                            },
                            transaction
                        });

                        if (!optionExists) {
                            throw new Error('Opção não encontrada neste produto!');
                        }

                        await optionExists.destroy({ transaction });

                        continue;
                    }


                    // PREPARAR DADOS DA OPÇÃO
                    const optionData = {};

                    const optionFields = [
                        'title',
                        'shape',
                        'radius',
                        'type',
                        'values'
                    ];

                    optionFields.forEach(campo => {

                        if (option[campo] !== undefined) {
                            optionData[campo] = option[campo];
                        }

                    });

                    // NORMALIZAR VALUES
                    // Seu Model utiliza STRING.
                    // Arrays serão armazenados como JSON.
                    if (Array.isArray(optionData.values)) {
                        optionData.values = JSON.stringify(optionData.values);
                    }


                    // ATUALIZAR OPÇÃO EXISTENTE
                    if (option.id) {

                        const optionExists = await ProductOptionModel.findOne({
                            where: {
                                id: option.id,
                                product_id: product.id
                            },
                            transaction
                        });

                        if (!optionExists) {
                            throw new Error('Opção não encontrada neste produto!');
                        }

                        if (Object.keys(optionData).length > 0) {

                            await optionExists.update(optionData, {
                                transaction
                            });

                        }

                    } else {

                        // CADASTRAR NOVA OPÇÃO
                        if (!optionData.title || optionData.values === undefined) {
                            throw new Error('Título e values são obrigatórios para criar uma opção!');
                        }

                        await ProductOptionModel.create({
                            product_id: product.id,
                            ...optionData
                        }, {
                            transaction
                        });

                    }

                }

            };


            // CONFIRMAR TRANSAÇÃO
            await transaction.commit();

            return true;

        } catch (error) {

            if (!transaction.finished) {
                await transaction.rollback();
            }

            throw error;
        };

    };







    // DELETAR PRODUTO
    async deletar(id) {

        const product = await ProductModel.findByPk(id);

        if (!product) {
            throw new Error('Produto não encontrado!');
        }

        await product.destroy();

        return true;
    };

};

module.exports = ProductService;
