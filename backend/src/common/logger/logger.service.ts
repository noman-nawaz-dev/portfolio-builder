import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly colors = {
    INFO: '\x1b[36m',    // Cyan
    WARN: '\x1b[33m',    // Yellow
    DEBUG: '\x1b[35m',   // Magenta
    ERROR: '\x1b[31m',   // Red
    VERBOSE: '\x1b[37m', // White
    RESET: '\x1b[0m',    // Reset
    GRAY: '\x1b[90m',    // Gray for timestamp
    GREEN: '\x1b[32m',   // Green for context
  };

  private formatMessage(level: string, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const color = this.colors[level] || this.colors.RESET;
    const contextStr = context ? ` ${this.colors.GREEN}[${context}]${this.colors.RESET}` : '';
    return `${this.colors.GRAY}[${timestamp}]${this.colors.RESET} ${color}[${level}]${this.colors.RESET}${contextStr} ${message}`;
  }

  log(message: string, context?: string) {
    console.log(this.formatMessage('INFO', message, context));
  }

  info(message: string, context?: string) {
    console.log(this.formatMessage('INFO', message, context));
  }

  warn(message: string, context?: string) {
    console.warn(this.formatMessage('WARN', message, context));
  }

  debug(message: string, context?: string) {
    console.debug(this.formatMessage('DEBUG', message, context));
  }

  error(message: string, trace?: string, context?: string) {
    console.error(this.formatMessage('ERROR', message, context));
    if (trace) {
      console.error(trace);
    }
  }

  verbose(message: string, context?: string) {
    console.log(this.formatMessage('VERBOSE', message, context));
  }
}