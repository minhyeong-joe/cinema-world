const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// connect to Mongo DB
mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useFindAndModify: true});

const app = express();

// inject body-parser for json req, res
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// inject cors
app.use(cors());

const port = process.env.PORT || 80;

// static Angular page
app.use(express.static(path.join(__dirname, '..', 'public')));

// REST API endpoint
const api = require('./routes');
app.use('/api', api);

app.listen(port, () => {
  console.log("Server running on Port " + port);
});
