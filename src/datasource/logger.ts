import { getLogger, Logger, configure, Configuration } from 'log4js';

import { LOG_DIR, LOG_FILE } from '../config';

export interface ILogger {
	logger: Logger;
	trace: (message: string) => void;
	debug: (message: string) => void;
	info: (message: string) => void;
	warn: (message: string) => void;
	error: (message: string) => void;
	fatal: (message: string) => void;
}

export class LoggerAPI implements ILogger {
  public logger: Logger;
  private configuration: Configuration;

  public initialize (): void {
    this.configuration = {
      appenders: {
        console: { type: 'stdout', layout: { type: 'colored' } },
        dateFile: {
          type: 'dateFile',
          filename: `${LOG_DIR}/${LOG_FILE}`,
          layout: { type: 'basic' },
          compress: true,
          filesToKeep: 14,
          keepFileExt: true,
        },
      },
      categories: {
        default: { appenders: ['console', 'dateFile'], level: 'trace' },
      },
    };

    configure(this.configuration);

    this.logger = getLogger();
  }

  trace (message: string): void {
    this.logger.trace(message);
  }

  debug (message: string): void {
    this.logger.debug(message);
  }

  info (message: string): void {
    this.logger.info(message);
  }

  warn (message: string): void {
    this.logger.warn(message);
  }

  error (message: string): void {
    this.logger.error(message);
  }

  fatal (message: string): void {
    this.logger.fatal(message);
  }
}
