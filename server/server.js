const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
