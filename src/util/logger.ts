import winston from "winston";
import expressWinston from "express-winston";

export const expressWinstonLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV}.log`,
      format: winston.format.simple(),
      maxsize: parseInt(process.env.MAX_SIZE_LOG_FILE),
      maxFiles: parseInt(process.env.MAX_LOG_FILES)
    })
  ],
  format: winston.format.json(),
  meta: process.env.NODE_ENV !== "production",
  expressFormat: true,
  colorize: false
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV}.log`,
      maxsize: parseInt(process.env.MAX_SIZE_LOG_FILE),
      maxFiles: parseInt(process.env.MAX_LOG_FILES)
    }),
    new winston.transports.Console()
  ],
  format: winston.format.simple()
});

export const actionLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV}/actions.log`,
      maxsize: parseInt(process.env.MAX_SIZE_LOG_FILE),
      maxFiles: parseInt(process.env.MAX_LOG_FILES)
    }),
    new winston.transports.Console()
  ],
  format: winston.format.json()
});

export const errorLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV}/errors.log`,
      maxsize: parseInt(process.env.MAX_SIZE_LOG_FILE),
      maxFiles: parseInt(process.env.MAX_LOG_FILES)
    }),
    new winston.transports.Console()
  ],
  format: winston.format.json()
});

export const redflagLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV}/redflag.log`,
      maxsize: parseInt(process.env.MAX_SIZE_LOG_FILE),
      maxFiles: parseInt(process.env.MAX_LOG_FILES)
    }),
    new winston.transports.Console()
  ],
  format: winston.format.json()
});
