const pool = require('../utils/pool');

class Grocery {
  id;
  name;
  location;
  knownfor;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
    this.knownfor = row.knownfor;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from grocery WHERE id = ($1)', [
      id,
    ]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM grocery WHERE id = $1 RETURNING *',
      [id]
    );
    return new Grocery(rows[0]);
  }
}

module.exports = { Grocery };
