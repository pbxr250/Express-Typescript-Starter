import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import { StatusCodes } from 'http-status-codes';
import { logger } from './services';
import morgan from 'morgan';

import router from './routes';

const app = express()

app.use(
  morgan('tiny', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  } as morgan.Options<Request,Response>),
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
})

app.use(router);

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.log({
    level: 'debug',
    message: err.message
  });
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
});

app.listen(process.env.PORT || '3100',()=>{
  logger.log({
    level: 'debug',
    message: 'Server Started at Port: 3100'
  });
})

export default app;