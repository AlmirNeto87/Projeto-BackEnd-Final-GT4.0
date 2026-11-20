
const { API_URL, getToken } = require('../helpers/api');

describe('Testes de Produtos', () => {

    let token;

    beforeAll(async () => {
        token = await getToken();
    });

    test('Deve listar todos os produtos', async () => {
        const response = await fetch(`${API_URL}/v1/product/search`);

        const data = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
    });

    test('Deve cadastrar, atualizar e excluir um produto', async () => {

        const identificador = Date.now();

        // CADASTRAR
        const responseCreate = await fetch(`${API_URL}/v1/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                enabled: true,
                name: `Produto Teste ${identificador}`,
                slug: `produto-teste-${identificador}`,
                use_in_menu: true,
                stock: 50,
                description: 'Produto criado para teste automatizado',
                price: 100,
                price_with_discount: 90,
                categories: [],
                options: [],
                images: []
            })
        });

        const produto = await responseCreate.json();

        expect(responseCreate.status).toBe(201);
        expect(produto.id).toBeDefined();

        // ATUALIZAR
        const responseUpdate = await fetch(
            `${API_URL}/v1/product/${produto.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `Produto Atualizado ${identificador}`
                })
            }
        );

        expect(responseUpdate.status).toBe(200);

        // EXCLUIR
        const responseDelete = await fetch(
            `${API_URL}/v1/product/${produto.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        expect(responseDelete.status).toBe(200);

    });

});
