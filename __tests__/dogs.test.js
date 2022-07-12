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

  it('GET/READ /dogs should return a list of dogs', async () => {
    const resp = await request(app).get('/dogs');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Frankie',
        breed: 'Pomeranian',
        family: 'Beths',
      },
      { id: '2', name: 'Jeep', breed: 'Labrador', family: 'Danis' },
      { id: '3', name: 'Oscar', breed: 'Poodle', family: 'Rebekahs' },
    ]);
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

  it('DELETE/dogs/:id should delete a dog', async () => {
    const resp = await request(app).delete('/dogs/2');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('2');
    const { status } = await request(app).get('/dogs/2');
    expect(status).toEqual(404);
  });

  afterAll(() => {
    pool.end();
  });
});
