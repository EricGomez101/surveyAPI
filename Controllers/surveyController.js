const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.route('/')
  .get((req, res) => {
    knex.raw('select * from survey')
    .then((surveys) => {
      res.send(surveys);
    })
  })

module.exports = router;