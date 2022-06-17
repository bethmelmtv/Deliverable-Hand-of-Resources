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

  static async getAll() {
    const { rows } = await pool.query('SELECT * from cities');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cities WHERE id = ($1)', [
      id,
    ]);
    return rows[0];
  }
}

module.exports = { City };
