const { Router } = require('express');
const { Dog } = require('../models/Dog');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Dog.insert(req.body);
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Dog.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Dog.getAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Dog.updateById(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
