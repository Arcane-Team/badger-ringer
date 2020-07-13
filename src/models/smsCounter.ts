import {
  Model
, DataTypes
} from "sequelize";

class SMSCounter extends Model {
  public counter!:            number
  public readonly updatedAt!: Date
}

function idempotentInitExchangeCost( sequelize: any ) {
  const tableName = "smsCounter";
  if ( ! sequelize.isDefined( tableName ) ) {
    SMSCounter.init({
      counter: {
          type: DataTypes.INTEGER
        , allowNull: true
      }
      , {
        tableName
        , sequelize
      }
    });
  }

  return SMSCounter;
}

export {
  SMSCounter
};
