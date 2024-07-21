import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import dbSave from './routes/dbSave.js';
import timeBasedApi from './routes/timeBasedApi.js';
import dbSearch from './routes/dbSearch.js';

const app = express();

app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log(err));

app.use('/', dbSave);
app.use('/', timeBasedApi);
app.use('/', dbSearch);
