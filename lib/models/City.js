const pool = require('../utils/pool');

class City {
  id;
  city;
  state;
  temperature;

  constructor(row) {
    this.id = row.id;
    this.city = row.city;
    this.state = row.state;
    this.temperature = row.temperature;
  }

  static async insert({ city, state, temperature }) {
    const { rows } = await pool.query(
      'INSERT INTO cities(city, state, temperature) VALUES ($1,$2,$3) RETURNING *',
      [city, state, temperature]
    );
    return new City(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from cities');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cities WHERE id = ($1)', [
      id,
    ]);
    return City(rows[0]);
  }

  static async updateById(id, attrs) {
    const cityEl = await City.getById(id);
    if (!cityEl) return null;
    const { city, state, temperature } = { ...city, ...attrs };
    const { rows } = await pool.query(
      `UPDATE cities
    SET city= ($2),state= ($3), temperature= ($4) WHERE id =($1) RETURNING *`,
      [id, city, state, temperature]
    );
    return new City(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cities WHERE id = $1 RETURNING *',
      [id]
    );
    return new City(rows[0]);
  }
}

module.exports = { City };
