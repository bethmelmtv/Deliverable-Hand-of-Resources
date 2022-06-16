const { Router } = require('express');
const { Dog } = require('../models/Dog');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const data = await Dog.insert(req.body);
    console.log(data);
    res.json(data);
  } catch (e) {
    next(e);
  }
});
