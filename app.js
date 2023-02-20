const express = require('express');
const app = express();

const { PORT } = require('./config'); //PORT environment variable
 
require('./utils/Db.js'); // DATABSE CONNECTION FILE

app.use(express.json()); // TO PARSE REQUEST-BODY TO JSON
 
app.use(require('./routes')); // ROUTES

app.use(require('./middlewares/error.middleware')); //ERROR HANDLING MIDDLEWARES

app.listen(PORT);

