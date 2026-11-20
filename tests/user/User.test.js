
const { API_URL, getToken } = require('../helpers/api');

describe('Testes de Usuários', () => {

    let token;

    beforeAll(async () => {
        token = await getToken();
    });

    test('Deve listar todos os usuários', async () => {
        const response = await fetch(`${API_URL}/v1/user/`);

        const data = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
    });

    test('Deve cadastrar, atualizar e excluir um usuário', async () => {

        const identificador = Date.now();

        // CADASTRAR
        const responseCreate = await fetch(`${API_URL}/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                firstname: 'Usuario',
                surname: 'Teste',
                email: `teste${identificador}@email.com`,
                password: '123456'
            })
        });

        const usuario = await responseCreate.json();

        expect(responseCreate.status).toBe(201);
        expect(usuario.id).toBeDefined();

        // ATUALIZAR
        const responseUpdate = await fetch(
            `${API_URL}/v1/users/${usuario.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstname: 'Usuario Atualizado'
                })
            }
        );

        expect(responseUpdate.status).toBe(200);

        // EXCLUIR
        const responseDelete = await fetch(
            `${API_URL}/v1/users/${usuario.id}`,
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
