import supertest from 'supertest';
import { App } from '../server/app';


describe('APIs Endpoint Tests:', () => {
  let app = new App().server;
  let request = supertest;
  
  // Teste for endpoint /api/users?since={number}
  it('Should return a list of GitHub users and a link to the next page.', async () => {
    const response = await request(app).get('/api/users?since=1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body.users.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty('nextPageLink');
  });

  // Test for endpoint /api/users/:username/details
  // For this test i've provided some of my personal github info:
  test('Retrieve user details', async () => {
    const username = 'nickrrs';
    const response = await request(app).get(`/api/users/${username}/details`);

    expect(response.body).toHaveProperty('details');

    expect(response.status).toBe(200);
    expect(response.body.details).toHaveProperty('login', username);
    expect(response.body.details).toHaveProperty('name', 'Nickolas Ribeiro ');
    // Add more info if you want to..
  });

  // Teste for endpoint /api/users/:username/repos
  // For this test i've provided some of my personal github info:
  it('Should return a list of repositories of the given Github owner', async () => { 
    const username = 'nickrrs';
    const response = await request(app).get(`/api/users/${username}/repos`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('repositories');
    expect(response.body.repositories.length).toBeGreaterThan(0);
    // Add more info if you want to..
  });
});
