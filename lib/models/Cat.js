const pool = require('../utils/pool');

class Cat {
  id;
  name;
  breed;
  owner;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.owner = row.owner;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from cats');
    return rows;
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cats WHERE id = ($1)', [
      id,
    ]);
    return rows[0];
  }

  static async updateById(id, attrs) {
    const cat = await Cat.getById(id);
    if (!cat) return null;
    const { name, breed, owner } = { ...cat, ...attrs };
    const { rows } = await pool.query(
      `UPDATE cats 
      SET name= ($2), breed= ($3), owner= ($4) 
      WHERE id= ($1) RETURNING *`,
      [id, name, breed, owner]
    );
    return new Cat(rows[0]);
  }

  static async insert({ name, breed, owner }) {
    const { rows } = await pool.query(
      'INSERT INTO cats(name, breed, owner) VALUES ($1,$2,$3) RETURNING *',
      [name, breed, owner]
    );
    return new Cat(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cats WHERE id= ($1) RETURNING *',
      [id]
    );
    return new Cat(rows[0]);
  }
}

module.exports = { Cat };
