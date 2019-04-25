const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const surveyService = require('../Persistence/surveyService');

router.route('/')
  .get((req, res) => {
    surveyService.getAllSurveys()
    .then((surveys) => {
      res.send(surveys);
    })
  })
  .post((req, res) => {
    const {survey, questions} = req.body;

    surveyService
    .saveSurvey(survey)
    .then((surveys) => res.send(surveys));
  })

router.route('/:id/questions/:question_id')
  .get((req, res) => {
    const { question_id } = req.params;
    surveyService.getQuestion(question_id)
    .then((question) => {
      res.send(question)
    });
  })
  .delete((req, res) => {
    const {question_id} = req.params;
    surveyService.deleteQuestionById(question_id)
    .then(res.status(204).send({}));
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    surveyService.getSurveyAndQuestions(id)
    .then(survey => {
      res.send(survey);
    });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { question } = req.body;
    if (question) {
      surveyService.saveQuestion(id, question)
      .then((survey) => res.send(survey));  
    } else {
      res.status(400).json({"message": "missing required property 'question' "})
    }
  })


module.exports = router;