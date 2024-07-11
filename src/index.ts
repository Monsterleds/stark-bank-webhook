import 'express-async-errors'
import './shared/container'
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import router from './routes';
import { BaseError } from "./errors/base-error";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json())
app.use(router)

app.get("/ping", async (req, res) => {
  return res.send("pong");
});

app.use((err: Error | BaseError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  return res.status(500).send(err.message)
})

export { app }