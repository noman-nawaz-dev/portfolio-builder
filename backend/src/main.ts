import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  
  // Enable Helmet with Content Security Policy
  app.use(helmet.default({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Required for Apollo Playground/GraphQL IDE
          "'unsafe-eval'", // Required for Apollo Playground/GraphQL IDE
          "https://embeddable-sandbox.cdn.apollographql.com",
          "https://cdn.jsdelivr.net",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Required for Apollo Playground/GraphQL IDE
          "https://embeddable-sandbox.cdn.apollographql.com",
          "https://fonts.googleapis.com",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://embeddable-sandbox.cdn.apollographql.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https:",
          "https://res.cloudinary.com", // Cloudinary for image uploads
          "https://apollo-server-landing-page.cdn.apollographql.com",
        ],
        connectSrc: [
          "'self'",
          "https://portfolio-builder.noman-nawaz.dev",
          "http://localhost:3000",
          "http://localhost:4000",
        ],
        frameSrc: [
          "'self'",
          "https://embeddable-sandbox.cdn.apollographql.com",
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false, // Required for GraphQL Playground
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests
  }));
  
  // Enable CORS with specific origins
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'https://portfolio-builder.noman-nawaz.dev',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Apollo-Require-Preflight'],
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.info(`🚀 Server is running on http://localhost:${port}/graphql`, 'Bootstrap');
}

bootstrap();
