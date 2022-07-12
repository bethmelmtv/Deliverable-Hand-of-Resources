const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the delete route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('PUT/grocery/:id grocery store should update a grocery store', async () => {
    const resp = await request(app)
      .put('/grocery/2')
      .send({ store: 'Krogers', location: 'Arizona', knownfor: 'deli meats' });
    expect(resp.body.store).toEqual('Krogers');
  });

  it('DELETE/grocery/:id should delete a grocery store', async () => {
    const resp = await request(app).delete('/grocery/2');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('2');
    const { status } = await request(app).get('/grocery/2');
    expect(status).toEqual(404);
  });

  afterAll(() => {
    pool.end();
  });
});
