const pool = require('../../lib/utils/pool');
const setup = require('../../data/setup');
const request = require('supertest');
const app = require('../../lib/app');

describe('testing the update route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('PUT/cats/:id cat should update a cat', async () => {
    const resp = await request(app).put('/cats/2').send({ name: 'Almond' });
    expect(resp.body.name).toEqual('Almond');
  });

  afterAll(() => {
    pool.end();
  });
});
