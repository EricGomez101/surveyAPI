# Survey Documentation

## Installation instructions
* npm install
* npm start

## Steps To Production
* Step one add a Procfile with the required info to set up a dyno on heroku
* Step two i would push the git repo to heroku which would automatically build and launnch the site
* Step three add a postgres database via addon's
* Step four i would add the connection info to the environment variables.
* Step five would be to add migrations and seeds to the database.

## API Documentation
* ## /api/v1/surveys?test={true}
    * GET returns an array of all surveys
    * POST accepts a survey and an array of questions and saves it to the database must pass the query "test" with a true property if its a test
        * ### example of an accepted JSON schema
            ```
                {
                    "survey": {
                        "description": "this is a new survey."
                    },
                    "questions": [
                        {
                            "description": "question one.",
                            "answer": true (optional)
                        }
                    ]
                }
            ```

* ## /api/v1/surveys/{id}
    * GET returnes the survey info and the questions with it
    * POST accepts an array of answers with the correct id's of the question being answered and returns the ratio, correct percentage, etc..
        * ### an example of the expected JSON structure
            ```
            {   
                "answers": [
                    {"id": 1, "answer": true},
                    {"id": 2, "answer": false}
                ]
            }
            ```
        * ### an example of what is returned
            ```
                {
                    "id": 1,
                    "description": "lorem ipsum",
                    "ratio": "2/7 correct",
                    "percent_correct": "28.57%",
                    "questions": [
                        {
                        "id": 1,
                        "description": "lorem",
                        "correct_answer": true,
                        "your_answer": true
                        },
                        {
                        "id": 2,
                        "description": "ipsum",
                        "correct_answer": true,
                        "your_answer": false
                        },
                        {
                        "id": 3,
                        "description": "dolor",
                        "correct_answer": true,
                        "your_answer": true
                        },
                        {
                        "id": 4,
                        "description": "sit",
                        "correct_answer": true,
                        "your_answer": "skipped"
                        },
                        { etc... }
                    ]
                }
            ```