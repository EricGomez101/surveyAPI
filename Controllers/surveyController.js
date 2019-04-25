const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const surveyService = require('../Persistence/surveyService');

router.route('/')
  .get((req, res) => {
    knex.select().from('survey')
    .then((surveys) => {
      res.send(surveys);
    })
  });

router.route('/:id')
      .get((req, res) => {
        const { id } = req.params;
        surveyService.getSurveyAndQuestions(id)
        .then(survey => {
          res.send(survey);
        })
      })

module.exports = router;