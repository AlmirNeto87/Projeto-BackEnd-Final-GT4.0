
const { API_URL, getToken } = require('../helpers/api');

describe('Testes de Categorias', () => {

    let token;

    beforeAll(async () => {
        token = await getToken();
    });

    test('Deve listar todas as categorias', async () => {
        const response = await fetch(`${API_URL}/v1/category/search`);

        const data = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
    });

    test('Deve cadastrar, atualizar e excluir uma categoria', async () => {

        const identificador = Date.now();

        // CADASTRAR
        const responseCreate = await fetch(`${API_URL}/v1/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: `Categoria Teste ${identificador}`,
                slug: `categoria-teste-${identificador}`,
                use_in_menu: true
            })
        });

        const categoria = await responseCreate.json();

        expect(responseCreate.status).toBe(201);
        expect(categoria.id).toBeDefined();

        // ATUALIZAR
        const responseUpdate = await fetch(
            `${API_URL}/v1/category/${categoria.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `Categoria Atualizada ${identificador}`
                })
            }
        );

        expect(responseUpdate.status).toBe(200);

        // EXCLUIR
        const responseDelete = await fetch(
            `${API_URL}/v1/category/${categoria.id}`,
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
