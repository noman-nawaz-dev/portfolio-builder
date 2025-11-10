import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, headers } = req;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    // Log incoming request
    this.logger.info(
      `→ ${method} ${originalUrl}`,
      'HTTP'
    );
    
    if (Object.keys(query).length > 0) {
      this.logger.debug(`Query:\n${JSON.stringify(query, null, 2)}`, 'HTTP');
    }
    
    if (method !== 'GET' && Object.keys(body).length > 0) {
      // Filter out sensitive data
      const sanitizedBody = this.sanitizeBody(body);
      this.logger.debug(`Body:\n${JSON.stringify(sanitizedBody, null, 2)}`, 'HTTP');
    }

    // Capture response body for error/warning logging
    let responseBody: unknown = null;
    const originalJson = res.json;
    const originalSend = res.send;

    res.json = function(data) {
      responseBody = data;
      return originalJson.call(this, data);
    };

    res.send = function(data) {
      if (typeof data === 'string') {
        try {
          responseBody = JSON.parse(data);
        } catch {
          responseBody = data;
        }
      } else {
        responseBody = data;
      }
      return originalSend.call(this, data);
    };

    // Log response when finished
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const logLevel = statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warn' : 'info';
      
      const colorCode = logLevel === 'error' ? '\x1b[31m' : logLevel === 'warn' ? '\x1b[33m' : '\x1b[32m';
      const message = `${colorCode}← ${method} ${originalUrl} ${statusCode} - ${duration}ms\x1b[0m`;
      
      if (logLevel === 'error') {
        this.logger.error(message, '', 'HTTP');
      } else if (logLevel === 'warn') {
        this.logger.warn(message, 'HTTP');
      } else {
        this.logger.info(message, 'HTTP');
      }

      console.log();
      // Log response body for errors and warnings
      if (responseBody && statusCode >= 300) {
        const sanitizedResponse = this.sanitizeResponse(responseBody);
        this.logger.debug(`Response:\n${JSON.stringify(sanitizedResponse, null, 2)}`, 'HTTP');
      }
    });

    next();
  }

  private sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
    const sensitiveFields = ['password', 'token', 'secret', 'apiKey'];
    const sanitized = { ...body };
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });
    
    // For GraphQL requests, don't log the query field
    if (sanitized.query) {
      delete sanitized.query;
    }
    
    return sanitized;
  }

  private sanitizeResponse(response: unknown): unknown {
    // For GraphQL responses, you might want to sanitize sensitive data
    // For now, just return as is, but you can add filtering here
    return response;
  }
}
