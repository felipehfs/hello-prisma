import supertest, { SuperTest } from 'supertest';
import server from '../server';
import faker from 'faker';

let app: SuperTest<supertest.Test>;

beforeEach(() => {
  app = supertest(server);
});

describe("Users", () => {
  
  it("Should create a user", async () => {
    const response = await app.post('/users')
      .send({
        email: faker.internet.email(),
        password: '123',
        name: faker.internet.userName()
      });

      
      expect(response.status).toBe(201);
  });

  it("400 BAD REQUEST - should the email be unique", async () => {
    const body = {
      email: faker.internet.email(),
      password: '123',
      name: faker.internet.userName()
    }

    await app.post('/users').send(body);
    const response = await app.post('/users').send(body);

    expect(response.status).toBe(400);
  });

});
