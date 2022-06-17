const pool = require('../utils/pool');

class Grocery {
  id;
  name;
  location;
  known_for;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
    this.known_for = row.known_for;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM grocery_stores WHERE id = $1 RETURNING *',
      [id]
    );
    return new Grocery(rows[0]);
  }
}

module.exports = { Grocery };
