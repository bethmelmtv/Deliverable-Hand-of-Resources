const { Router } = require('express');
const { Grocery } = require('../models/Grocery');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Grocery.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Grocery.updateById(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
