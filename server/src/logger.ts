import winston from "winston";
import path from "path";
import fs from "fs";


const logDirectory = path.join(__dirname, "logs")

if(!fs.existsSync(logDirectory))
    fs.mkdirSync(logDirectory)

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
            winston.format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            winston.format.printf((info) => `[${info.timestamp}] [${info.level}] -- ${info.message}`),
        ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDirectory, `combined.log`)
        }),
        new winston.transports.File({
            filename: path.join(logDirectory, `error.log`),
            level: "error"
        })
    ]
})