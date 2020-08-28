import supertest, { SuperTest} from 'supertest';
import server from '../server';

let app: SuperTest<supertest.Test>;

beforeEach(() => {
  app = supertest(server);
});

describe('Entity Task', () => {

  it('200 OK /tasks should retrieve all Task', async () => {
    const response = await app.get("/tasks");
    expect(response.status).toBe(200);
  });

  it('201 Created - should create a new Task', async () => {

    const response = await app.post("/tasks")
      .send({ title: 'Teste #1', authorId: 1});
    
    expect(response.status).toBe(201);
  });

  it('201 Should remove a task', async() => {
    const createTaskresponse = await app.post("/tasks")
      .send({ title: 'Teste #1', authorId: 1});
      
    expect(createTaskresponse.status).toBe(201);

    const { id } = createTaskresponse.body;

    const response = await app.delete(`/tasks/${id}`);
    expect(response.status).toBe(201);
  })
});
