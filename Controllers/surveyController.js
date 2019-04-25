const express = require('express');
const router = express.Router();
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
    surveyService.saveSurvey(survey)
    .then((surveys) => {
      const { id } = surveys[surveys.length - 1]
      
      if (questions) {
        surveyService.saveQuestions(id, questions);
      }
      
      res.status(201).send(surveys);
    })
    .catch((err) => res.status(400).send(err.message));
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
    const {answers} = req.body;
    surveyService.submitSurvey(id, answers)
    .then((result) => res.send(result))
    .catch(err => res.status(400).json({"message": "an error occured while trying to grade the submmited answers"}));
  });
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

router.route('/:id/questions/')
  .get((req, res) => {
    const { id } = req.params;
    surveyService.getSurveyQuestions(id);
  })
  .post((req, res) => {
    const { id } = req.params;
    const { question } = req.body;
    if (question) {
      surveyService.saveQuestion(id, question)
      .then((survey) => res.status(201).send(survey));  
    } else {
      res.status(400).json({"message": "missing required property 'question' "})
    }
  })

module.exports = router;