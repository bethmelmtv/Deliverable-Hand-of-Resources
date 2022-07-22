const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the CRUD routes for cities', () => {
  beforeEach(() => {
    return setup(pool); //reruns our database between each test
  });

  it('PUT/cities/:id  should update a city', async () => {
    const resp = await request(app).put('/cities/2').send({
      city: 'Charleston',
      state: 'North Carolina',
      temperature: 'muggy',
    });
    console.log(resp.body.city, 'RESP');
    expect(resp.body.city).toEqual('Charleston');
  });

  it('GET/cities/:id city should return city detail', async () => {
    const resp = await request(app).get('/cities/2');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      city: 'San Francisco',
      state: 'California',
      temperature: 'foggy',
    });
  });

  it(' GET /cities should return a list of cities', async () => {
    const resp = await request(app).get('/cities');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        city: 'Chicago',
        state: 'Illinois',
        temperature: 'cold',
      },
      {
        id: '2',
        city: 'San Francisco',
        state: 'California',
        temperature: 'foggy',
      },
      {
        id: '3',
        city: 'Mountain View',
        state: 'California',
        temperature: 'dosent know what it wants',
      },
    ]);
  });

  it('POST/cities should create a new city', async () => {
    const resp = await request(app).post('/cities').send({
      city: 'Portlandia',
      state: 'Oregon',
      temperature: 'overcast',
    });
    expect(resp.body.city).toEqual('Portlandia');
    expect(resp.body.state).toEqual('Oregon');
    expect(resp.body.temperature).toEqual('overcast');
  });

  it('DELETE/cities/:id should delete a city', async () => {
    const resp = await request(app).delete('/cities/2');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('2');
    console.log(resp.body, 'RESP BODY');
    const { body } = await request(app).get('/cities/2');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
