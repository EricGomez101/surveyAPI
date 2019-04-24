const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
let port = process.env.PORT || 5000;
const server = express();
const surveyController = require("./Controllers/surveyController");
//TODO connect to database

// mount middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// sanitation check
server.get('/', (req, res) => {
  res.json({status: 'connected'});
});

server.use('/api/v1/surveys', surveyController);

//port listener
server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})