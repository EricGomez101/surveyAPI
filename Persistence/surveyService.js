const knex = require('../db/knex');

const getAllSurveys = () => knex.raw('SELECT * FROM survey')
    .then((surveys) => surveys)
    .catch(error => error)

const getSurveyById = (survey_id) => new Promise((resolve, reject) => {
    knex.raw('SELECT * FROM survey WHERE survey.id = ' + survey_id)
        .then((survey) => resolve(survey))
        .catch(error => reject(error));
})


const saveSurvey = (survey) => knex
.raw('INSERT INTO survey (description) VALUES (?)', survey.description)
.then( () => getAllSurveys());

const getSurveyQuestions = (survey_id) => new Promise((resolve, reject) => {
    knex.raw('SELECT q.id, q.description, q.answer FROM survey JOIN question as q ON q.survey_id = survey.id WHERE survey.id = ' + survey_id)
        .then((questions) => resolve(questions))
        .catch(error => reject(error));
});

const saveQuestion = (survey_id, question) => knex
    .raw('INSERT INTO question (description, answer, survey_id) VALUES (?, ?, ?)', [question.description, question.answer, survey_id])
    .then(() => getSurveyAndQuestions(survey_id));

const saveQuestions = (survey_id, questions) => {
    questions.map(question => saveQuestion(survey_id, question));
};

const getSurveyAndQuestions = survey_id => new Promise((resolve, reject) => 
    Promise.all([getSurveyById(survey_id), getSurveyQuestions(survey_id)])
    .then((arr) => resolve({survey: arr[0], questions: arr[1]}))
    .catch(err => reject(err))
);

const getQuestion = (question_id) => knex
    .raw('SELECT * FROM question WHERE id = ' + question_id)
    .then((question) => question);

const deleteQuestionById = (id) => knex
    .raw('DELETE FROM question WHERE question.id = ' + id);

const submitSurvey = (id, answers) => {
    return getSurveyAndQuestions(id)
    .then(survey => {
        let questions = {};
        const total = survey.questions.length;
        let correct = 0;

        // converting the questions array to an ordered collection and using the id as the key.
        survey.questions.map((question) => questions[question.id] = {'id': question.id, 'description': question.description, 'correct_answer': question.answer});
        
        //checking an answer to the correct question's answer.
        answers.map(answer => {
            if (!questions[answer.id]['your_answer'] && questions[answer.id]) {
                if (questions[answer.id]['correct_answer'] == answer.answer) {
                    correct++;
                }
                questions[answer.id]['your_answer'] = answer.answer;
            }
        });

        // converting questions object to an array
        questions = Object.keys(questions).map(key => questions[key]);

        // checking for any missed questions.
        questions.map(question => {
            if (question['your_answer'] === undefined) {
                question['your_answer'] = 'skipped';
            }
        })

        return Object.assign(
            {}, 
            {
                'id': survey.survey.id,
                'description': survey.survey.description,
                'ratio': `${correct}/${total} correct`, 
                'percent_correct': `${((correct/total) * 100).toFixed(2)}%`,
                'questions': questions,
            },
        );
    });
}


module.exports = {
    getAllSurveys,
    getSurveyById,
    getSurveyQuestions,
    getSurveyAndQuestions,
    getQuestion,
    deleteQuestionById,
    saveQuestion,
    saveQuestions,
    saveSurvey,
    submitSurvey
};