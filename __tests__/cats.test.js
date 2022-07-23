const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the CRUD routes for cats', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST/cats should create a new cat ', async () => {
    const resp = await request(app).post('/cats').send({
      name: 'Alfred',
      breed: 'Tabby',
      owner: 'Beth',
    });
    expect(resp.body.name).toEqual('Alfred');
    expect(resp.body.breed).toEqual('Tabby');
    expect(resp.body.owner).toEqual('Beth');
  });

  it('GET /cats should return a list of cats', async () => {
    const resp = await request(app).get('/cats');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Tiger',
        breed: 'Tabby',
        owner: 'Carol',
      },
      {
        id: '2',
        name: 'Aniah',
        breed: 'Persian',
        owner: 'Jared',
      },
      {
        id: '3',
        name: 'Anelise',
        breed: 'Munchkin cat',
        owner: 'Shreya',
      },
    ]);
  });

  it('PUT/cats/:id cat should update a cat', async () => {
    const resp = await request(app).put('/cats/3').send({ name: 'Carlton' });
    expect(resp.body.name).toEqual('Carlton');
  });

  // it('DELETE/cats/:id should delete a cat', async () => {
  //   const resp = await request(app).delete('/cats/2');
  //   console.log(resp, 'RESP');
  //   expect(resp.status).toEqual(200);
  //   expect(resp.body.id).toEqual('2');
  //   const { status } = await request(app).get('/cats/2');
  //   expect(status).toEqual(404);
  // });
  afterAll(() => {
    pool.end();
  });
});
