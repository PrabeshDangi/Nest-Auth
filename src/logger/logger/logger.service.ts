import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as Transport from 'winston-logstash-transport';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new Transport({
          host: 'localhost',
          port: 5044,
        }),
        new winston.transports.Console(),
      ],
    });
  }
  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
