const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the create route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('PUT/UPDATE/dogs/:id dog should update a dog', async () => {
    const resp = await request(app).put('/dogs/2').send({ name: 'Almond' });
    expect(resp.body.name).toEqual('Almond');
  });

  it('POST/dogs should create a new dog', async () => {
    const resp = await request(app).post('/dogs').send({
      name: 'Spark',
      breed: 'husky',
      family: 'Rebekahs',
    });
    expect(resp.body.name).toEqual('Spark');
    expect(resp.body.breed).toEqual('husky');
    expect(resp.body.family).toEqual('Rebekahs');
  });

  afterAll(() => {
    pool.end();
  });
});
