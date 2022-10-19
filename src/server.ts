import express from 'express';
import cookieParser = require('cookie-parser');
import dotenv = require('dotenv');
import cors = require('cors');
dotenv.config();

const app = express();
// Access to .env file
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));

app.listen(process.env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});