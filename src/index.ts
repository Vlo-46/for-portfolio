import express, {Application, Express} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan';

import {logger} from "./helpers/winstonLogger";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// @todo middlewares

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
})
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use(helmet());
app.use(compression());

// @todo routes
import userRoute from './routes/UserRoute'
import authRoute from './routes/AuthRoute'
import postRoute from './routes/PostRoute'
import {ErrorHandler} from "./middlewares/ErrorHandler";

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)

app.use(ErrorHandler)

// @todo database connection
import {connectToDatabase} from './server';

connectToDatabase()
  .then(() => {
      app.listen(port, () => {
          console.log(`[server]: Server is running at http://localhost:${port}`);
      });
  })
  .catch((err) => {
      console.log('Connection error', err)
  })

export default app