const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the create route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('PUT/cats/:id cat should update a cat', async () => {
    const resp = await request(app).put('/cats/2').send({ name: 'Almond' });
    expect(resp.body.name).toEqual('Almond');
  });

  it('POST/cats should create a new dog', async () => {
    const resp = await request(app).post('/cats').send({
      name: 'Spark',
      breed: 'feline',
      family: 'Rebekahs',
    });
    expect(resp.body.name).toEqual('Spark');
    expect(resp.body.breed).toEqual('feline');
    expect(resp.body.family).toEqual('Rebekahs');
  });

  afterAll(() => {
    pool.end();
  });
});
