import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { contract } from "./Contracts/Contract";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import bodyParser from "body-parser";
import Contractroutes from "./Controller/Contractroutes";
import { dbConnect } from "./db/db";
import { AuthContract } from "./Contracts/AuthContract";
import AuthController from "./Controller/AuthRoutes";

//For env File
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
dbConnect();

createExpressEndpoints(contract, Contractroutes, app);
createExpressEndpoints(AuthContract, AuthController, app);

app.listen(port, () => {
  console.log(`Server is started  at http://localhost:${port}`);
});
