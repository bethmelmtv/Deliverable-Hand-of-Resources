const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the CRUD routes for groceries', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET/READ /grocery should return a list of grocery stores', async () => {
    const resp = await request(app).get('/grocery');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        store: 'Trader Joes',
        location: 157,
        knownfor: 'cheese and wine',
      },
      { id: '2', store: 'Sprouts', location: 200, knownfor: 'sandwiches' },
      { id: '3', store: 'Whole Foods', location: 349, knownfor: 'expensive' },
    ]);
  });

  it('PUT/UPDATE/grocery/:id grocery store should update a grocery store', async () => {
    const resp = await request(app)
      .put('/grocery/2')
      .send({ store: 'Krogers', location: 393, knownfor: 'deli meats' });
    console.log(resp.body, 'RESP BODY');
    expect(resp.body.store).toEqual('Krogers');
  });

  it('POST/grocery should create a new grocery item', async () => {
    const resp = await request(app).post('/grocery').send({
      store: 'Albertons',
      location: 343,
      knownfor: 'Overpricing their stuff',
    });
    expect(resp.body.store).toEqual('Albertons');
    expect(resp.body.location).toEqual(343);
    expect(resp.body.knownfor).toEqual('Overpricing their stuff');
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
