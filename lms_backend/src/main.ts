import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS - Allow all origins
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('LMS Backend API')
    .setDescription('Learning Management System API Documentation')
    .setVersion('1.0')
    .addTag('users', 'User management operations')
    .addTag('courses', 'Course management operations')
    .addTag('quizzes', 'Quiz management operations')
    .addTag('assignments', 'Assignment management operations')
    .addTag('enrollments', 'Enrollment management operations')
    .addTag('discussions', 'Discussion forum operations')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  app.getHttpAdapter().get('/api/docs/api-json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      jsonDocumentUrl: 'api-json',
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 LMS Backend is running on: http://localhost:${port}`);
  console.log(`📖 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
