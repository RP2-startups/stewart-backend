import express from 'express';
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';
import sequelize from './models/index';
import expressSession from 'express-session';
import sequelizeStore from 'connect-session-sequelize';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const SequelizeStore = sequelizeStore(expressSession.Store);

const sequelizeSessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 1000 * 60 * 60 * 24,
    
});

sequelizeSessionStore.sync();

app.use(expressSession({
  secret: process.env.SECRET, // TODO: palavra aleatoria no campo SECRET do .env
  resave: false,
  saveUninitialized: false,
  store: sequelizeSessionStore,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24,
  }
}));


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));

app.use(routes);



app.listen(process.env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});