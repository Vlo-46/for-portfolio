import winston from 'winston';
import path from 'path'

const logsDirectory = path.join("src", 'logs');

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logsDirectory, 'app.log') }),
    ],
});