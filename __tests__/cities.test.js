const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing the read route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('PUT/cities/:id cat should update a city', async () => {
    const resp = await request(app)
      .put('/cities/2')
      .send({
        city: 'Charleston',
        state: 'North Carolina',
        temperature: 'muggy',
      });
    expect(resp.body.name).toEqual('Charleston');
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

  it('/cities should return a list of cities', async () => {
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

  afterAll(() => {
    pool.end();
  });
});
