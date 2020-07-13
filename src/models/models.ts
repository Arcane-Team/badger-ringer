import { Sequelize } from "sequelize";
import { idempotentInitSMSCounter, connectSMSCounter } from "./request";

const models: any = Object();

function idempotentModels( sequelize: Sequelize ) {
  if (Object.keys(models).length === 0) {
    models.SMSCounter = idempotentInitSMSCounter( sequelize );

    connectSMSCounter();
  }
  return models;
}

export {
  idempotentModels
, models
};
