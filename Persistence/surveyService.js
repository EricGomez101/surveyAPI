const knex = require('../db/knex');

const getAllSurveys = () => knex.raw('SELECT * FROM survey')
    .then(({rows}) => rows)
    .catch(error => error)

const getSurvey = (survey_id) => new Promise((resolve, reject) => {
    knex.raw('SELECT * FROM survey WHERE survey.id = ' + survey_id)
        .then(({rows}) => resolve(rows))
        .catch(error => reject(error));
})

const getSurveyQuestions = (survey_id) => new Promise((resolve, reject) => {
    knex.raw('SELECT q.description, q.answer FROM survey JOIN question as q ON q.survey_id = survey.id WHERE survey.id = ' + survey_id)
        .then(({rows}) => resolve(rows))
        .catch(error => reject(error));
})

const getSurveyAndQuestions = survey_id => new Promise((resolve, reject) => 
    Promise.all([getSurvey(survey_id), getSurveyQuestions(survey_id)])
    .then((arr) => resolve({survey: {...arr[0]}, questions: [...arr[1]]}))
    .catch(err => reject(err))
);


module.exports = {
    getAllSurveys,
    getSurvey,
    getSurveyQuestions,
    getSurveyAndQuestions,
};