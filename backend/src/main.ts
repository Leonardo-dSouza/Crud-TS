// src/main.ts
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Enable CORS for the frontend during development.
  // You can set CORS_ORIGIN in the environment to a comma-separated list of allowed origins.
  // If you set CORS_ORIGIN='*' it will allow all origins (use with caution).
  const defaultLocalOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
    : defaultLocalOrigins;

  const app = await NestFactory.create(AppModule);

  // Use a callback origin validator to ensure Access-Control-Allow-Origin header
  // is set correctly. Accept requests with no origin (e.g., server-to-server).
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    // In development allow the browser origin dynamically to avoid CORS issues
    app.enableCors({ origin: true, credentials: true });
  } else {
    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., curl, mobile apps, server-side)
        if (!origin) return callback(null, true);

        // Allow wildcard
        if (allowedOrigins.includes('*')) return callback(null, true);

        if (allowedOrigins.includes(origin)) return callback(null, true);

        // Not allowed
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('GeoWiki')
    .setDescription('The GeoW API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
