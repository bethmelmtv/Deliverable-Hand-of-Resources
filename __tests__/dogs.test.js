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

  it('POST/dog should create a new dog', async () => {
    const resp = await request(app).post('/dogs').send({
      name: 'Frankie',
      breed: 'Pomeranian',
      family: 'Beths',
    });
    expect(resp.body.name).toEqual('Frankie');
    expect(resp.body.breed).toEqual('Pomeranian');
    expect(resp.body.family).toEqual('Beths');
  });

  afterAll(() => {
    pool.end();
  });
});
