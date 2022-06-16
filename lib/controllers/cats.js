const { Router } = require('express');
const { Cat } = require('../models/Cat');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Cat.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cat.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
