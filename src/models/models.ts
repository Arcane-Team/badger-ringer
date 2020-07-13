import { Sequelize } from "sequelize";
import { idempotentInitSMSCounter } from "./smsCounter";

const models: any = Object();

function idempotentModels( sequelize: Sequelize ) {
  if (Object.keys(models).length === 0) {
    models.SMSCounter = idempotentInitSMSCounter( sequelize );
  }
  return models;
}

export {
  idempotentModels
, models
};
