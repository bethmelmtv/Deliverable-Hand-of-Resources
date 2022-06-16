const pool = require('../../lib/utils/pool');
const setup = require('../../data/setup');
const request = require('supertest');
const app = require('../../lib/app');

describe('testing the create route', () => {
  beforeEach(() => {
    return setup(pool);
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
