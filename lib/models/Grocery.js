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

  static async insert({ store, location, knownfor }) {
    const { rows } = await pool.query(
      'INSERT INTO grocery(store, location, knownfor) VALUES ($1,$2,$3) RETURNING *',
      [store, location, knownfor]
    );
    return new Grocery(rows[0]);
  }

  static async updateById(id, attrs) {
    const grocery = await Grocery.getById(id);
    if (!grocery) return null;
    const { store, location, knownfor } = { ...grocery, ...attrs };
    const { rows } = await pool.query(
      `UPDATE grocery
    SET store= ($2),location= ($3), knownfor= ($4) WHERE id =($1) RETURNING *`,
      [id, store, location, knownfor]
    );
    return new Grocery(rows[0]);
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
