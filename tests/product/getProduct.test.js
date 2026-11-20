test('Deve retornar token em login válido', async () => {
  const res = await fetch('http://localhost:3000/vi/user/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@email.com', password: '123456' })
  });

  const data = await res.json();
  const { token } = data;
  
  const responseGetUser = await fetch('http://localhost:3000/v1/product/search', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const dadosUsers = await responseGetUser.json();
  console.log(dadosUsers);

  expect(responseGetUser.status).toBe(200);


});