import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.set('trust proxy', true);
  
  app.enableCors({
    origin: '*', // Permite qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORREÇÃO: O listen acontece primeiro, e o getUrl() entra no .then()
  await app.listen(3003)
    .then(async () => {
      const url = await app.getUrl();
       const addressInfo = app.getHttpServer().address();
      
      console.log(`Server is running on ${url}`);
    })
    .catch((e) => console.error(e));
}
bootstrap();
