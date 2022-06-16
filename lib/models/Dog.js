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
}

module.exports = { Dog };
