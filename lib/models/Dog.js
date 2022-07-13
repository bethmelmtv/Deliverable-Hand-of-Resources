const pool = require('../utils/pool');

class Dog {
  id;
  name;
  breed;
  family;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.family = row.family;
  }

  static async insert({ name, breed, family }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs(name, breed, family) VALUES ($1, $2, $3) RETURNING *',
      [name, breed, family]
    );
    return new Dog(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from dogs WHERE id = ($1)', [
      id,
    ]);
    return new Dog(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM dogs');
    return rows.map((row) => new Dog(row));
  }

  static async updateById(id, attrs) {
    const dogs = await Dog.getById(id);
    if (!dogs) return null;
    const { name, breed, family } = { ...dogs, ...attrs };
    const { rows } = await pool.query(
      'UPDATE dogs SET name = ($2), breed= ($3),family= ($4) WHERE id =($1) RETURNING *',
      [id, name, breed, family]
    );
    return new Dog(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM dogs WHERE id = $1 RETURNING *',
      [id]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
