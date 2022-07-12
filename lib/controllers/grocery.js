const { Router } = require('express');
const { Grocery } = require('../models/Grocery');

module.exports = Router().delete('/:id', async (req, res, next) => {
  try {
    const data = await Grocery.delete(req.params.id);
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// getby id or getall, update, create//
