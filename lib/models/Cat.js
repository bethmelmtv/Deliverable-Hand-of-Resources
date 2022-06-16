const pool = require('../utils/pool');

class Cat {
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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cats WHERE id = ($1)', [
      id,
    ]);
    return rows[0];
  }

  static async updateById(id, attrs) {
    const cat = await Cat.getById(id);
    if (!cat) return null;
    const { name, breed, family } = { ...cat, ...attrs };
    const { rows } = await pool.query(
      `UPDATE cats 
      SET name= ($2), breed= ($3), family= ($4) 
      WHERE id= ($1) RETURNING *`,
      [id, name, breed, family]
    );
    return new Cat(rows[0]);
  }
}

module.exports = { Cat };
