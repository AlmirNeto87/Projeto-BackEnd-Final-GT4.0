
const API_URL = process.env.API_URL || 'http://localhost:3000';

async function getToken() {
    const response = await fetch(`${API_URL}/v1/user/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'admin@email.com',
            password: '123456'
        })
    });

    const data = await response.json();

    if (!response.ok || !data.token) {
        throw new Error('Não foi possível realizar o login para os testes!');
    }

    return data.token;
}

module.exports = {
    API_URL,
    getToken
};
