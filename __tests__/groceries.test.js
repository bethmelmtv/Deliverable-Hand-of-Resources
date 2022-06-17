const pool = require('../../lib/utils/pool');
const setup = require('../../data/setup');
const request = require('supertest');
const app = require('../../lib/app');

describe('testing the create route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('DELETE/grocery should delete a grocery store', async () => {
    const resp = await request(app).delete('/grocery/2');
    expect(resp.status).toEqual(200);
    const { body } = await request(app).get('/grocery/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
