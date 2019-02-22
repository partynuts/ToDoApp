const { Router } = require("express");
const controller = Router();

  controller.get('/', (req, res) => {
    res.redirect('/tasks')
  });

  module.exports = controller;