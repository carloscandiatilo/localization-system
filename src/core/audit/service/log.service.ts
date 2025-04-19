import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

@Injectable()
export class LogService {
  private logger: winston.Logger;
  private readonly logDir = 'logs';
  private readonly maxSize = 1024 * 1024 * 1024; // 1GB

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }

    const transport = new winston.transports.DailyRotateFile({
      dirname: this.logDir,
      filename: 'audit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '1g',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
      ),
      transports: [transport],
    });
  }

  writeLog(message: string) {
    this.logger.info(message);
    this.handleLogRotation();
  }

  private handleLogRotation() {
    const logFiles = fs.readdirSync(this.logDir).filter(file => file.endsWith('.log'));

    logFiles.forEach(file => {
      const filePath = path.join(this.logDir, file);
      const stats = fs.statSync(filePath);

      if (stats.size >= this.maxSize) {
        const backupDir = path.join(this.logDir, 'backup');
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir);
        }

        const backupPath = path.join(backupDir, `${file}.gz`);
        const fileContent = fs.readFileSync(filePath);

        const gzip = zlib.createGzip();
        const writeStream = fs.createWriteStream(backupPath);

        gzip.on('end', () => {
          fs.unlinkSync(filePath); // Remove o log original após backup
          fs.writeFileSync(filePath, ''); // Reinicia o log atual vazio
        });

        gzip.pipe(writeStream);
        gzip.end(fileContent);
      }
    });
  }
}
