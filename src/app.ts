require("dotenv").config();

import express, { Request, Response } from "express";
import cors from "cors";
import jwt from "express-jwt";
import { notFoundResponse, unauthorizedResponse } from "./helpers/apiResponse";
import { expressWinstonLogger, logger } from "./util/logger";
import v1Route from "./routes/v1";
//import { createDatabase } from "./common/sequelizeDatabase";
import { actionLog } from "./util/logger";
import * as sms from "./services/sms";

// Create Express server
const app = express();

// Init express logger
if (process.env.NODE_ENV !== "test") {
  app.use(expressWinstonLogger);
}

(async () => {
  console.log(await sms.newSMSChecker());
})();


// const database = createDatabase({ isTest: process.env.NODE_ENV === "test" });
// database.then(() => {
//   // post init database code here
//   actionLog.info("Database is inited");
//
//   console.log(sms.newSMSChecker());
//
//   // const smsList = sms.listSMS();
//   //   smsList.forEach((id: number) => {
//   //   console.log(sms.getSMS(id));
//   // });
// });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// To allow cross-origin requests
app.use(cors());

app.use(jwt({
  secret: process.env.JWT_SECRET
}).unless({ path: [
  "/api/v1/requestToken"
]}));

// Routes
app.use("/api/v1/", v1Route);

// throw 404 if URL not found
app.all("*", (_, res) => {
  return notFoundResponse(res);
});

// Error handler
app.use((err: Error, req: Request, res: Response, _: any) => {
  if (err.name == "UnauthorizedError") {
    unauthorizedResponse(res);
    logger.error(err.message);
  }
});

export default app;
