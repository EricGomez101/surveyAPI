const knex = require('../db/knex');

const getAllSurveys = () => knex.raw('SELECT * FROM survey')
    .then(({rows}) => rows)
    .catch(error => error)

const getSurvey = (survey_id) => new Promise((resolve, reject) => {
    knex.raw('SELECT * FROM survey WHERE survey.id = ' + survey_id)
        .then(({rows}) => resolve(rows))
        .catch(error => reject(error));
})


const saveSurvey = (survey) => knex
.raw('INSERT INTO survey (description) VALUES (?)', survey.description)
.then( () => getAllSurveys());

const getSurveyQuestions = (survey_id) => new Promise((resolve, reject) => {
    knex.raw('SELECT q.id, q.description, q.answer FROM survey JOIN question as q ON q.survey_id = survey.id WHERE survey.id = ' + survey_id)
        .then(({rows}) => resolve(rows))
        .catch(error => reject(error));
})

const saveQuestion = (survey_id, question) => knex
    .raw('INSERT INTO question (description, answer, survey_id) VALUES (?, ?, ?)', [question.description, question.answer, survey_id])
    .then(() => getSurveyAndQuestions(survey_id));

const saveQuestions = (survey_id, questions) => {
    questions.map(question => saveQuestion(survey_id, question));
}

const getSurveyAndQuestions = survey_id => new Promise((resolve, reject) => 
    Promise.all([getSurvey(survey_id), getSurveyQuestions(survey_id)])
    .then((arr) => resolve({survey: arr[0]['0'], questions: [...arr[1]]}))
    .catch(err => reject(err))
);

const getQuestion = (question_id) => knex
    .raw('SELECT * FROM question WHERE id = ' + question_id)
    .then(({rows}) => rows);

const deleteQuestionById = (id) => knex
    .raw('DELETE FROM question WHERE question.id = ' + id);


module.exports = {
    getAllSurveys,
    getSurvey,
    getSurveyQuestions,
    getSurveyAndQuestions,
    getQuestion,
    deleteQuestionById,
    saveQuestion,
    saveQuestions,
    saveSurvey,
};