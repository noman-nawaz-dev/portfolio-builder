import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'https://portfolio-builder.noman-nawaz.dev',
      process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : undefined,
    ].filter(Boolean),
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.info(`🚀 Server is running on http://localhost:${port}/graphql`, 'Bootstrap');
}

bootstrap();
