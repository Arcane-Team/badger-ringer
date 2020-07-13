import { Sequelize } from "sequelize";
import { idempotentModels } from "../models/models";

let database: Promise<Sequelize>;

// Warning: the first call to createDatabase determines if `isTest`
// Subsequest calls return the already created reference
export const createDatabase = ({ isTest = false }) => {
  if (database) {
    return database;
  }

  let databaseName = process.env.DB_NAME || "restock";
  if (isTest) {
    databaseName = `${databaseName}_test`;
  }

  const _database = new Sequelize(
    databaseName
    , process.env.MYSQL_USERNAME || "root"
    , process.env.MYSQL_PASSWORD || "root"
    , {
        dialect: "sqlite"
      , host: process.env.MYSQL_HOSTNAME || "localhost"
      , port: 3306
      , logging: false
      , storage: `${databaseName}.sqlite`
    }
  );

  idempotentModels( _database );

  database = _database.sync({
    force: isTest
    //force: true
  , logging: false
  });

  return database;
};
