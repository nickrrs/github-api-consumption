import supertest from 'supertest';
import { App } from '../server/app';


describe('APIs Endpoint Tests:', () => {
  let app: any;
  let request: any;
  
  beforeAll(() => {
     app = new App().server;
     request = supertest;
  });
  
  // // Teste para o endpoint /api/users?since={number}
  // it('Deve retornar uma lista de usuários do GitHub e um link para a próxima página', async () => {
  //   const response = await request(app).get('/api/users?since=1');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('users');
  //   expect(response.body).toHaveProperty('nextPageLink');
  // });

  // Test for endpoint /api/users/:username/details
  // For this test i've provided some of my personal github info:
  test('Retrieve user details', async () => {
    const username = 'nickrrs';
    const response = await request(app).get(`/api/users/${username}/details`);

    expect(response.body).toHaveProperty('details');

    expect(response.status).toBe(200);
    expect(response.body.details).toHaveProperty('login', username);
    expect(response.body.details).toHaveProperty('name', 'Nickolas Ribeiro ');
    // Add more info if it's necessary..
  });

  // // Teste para o endpoint /api/users/:username/repos
  // it('Deve retornar uma lista de repositórios de um usuário do GitHub', async () => {
  //   const username = 'exampleUser';
  //   const response = await request(app).get(`/api/users/${username}/repos`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('repositories');
  //   // Adicione mais verificações conforme necessário
  // });
});
