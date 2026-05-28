import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.set('trust proxy', true);
  
  app.enableCors({
    origin: '*',
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API de Orçamentos')
    .setDescription(
      'API para gestão de orçamentos de serviços. Permite criar, editar, visualizar e excluir orçamentos, gerenciar clientes, equipe, configurações da empresa e integração com WhatsApp para envio de orçamentos.',
    )
    .setVersion('1.0')
    .setContact('Suporte', '', 'suporte@suaempresa.com')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .addApiKey(
      { type: 'apiKey', name: 'x-webhook-secret', in: 'header' },
      'webhook-secret',
    )
    .addTag('Health', 'Endpoint de verificação de saúde da API')
    .addTag('Autenticação', 'Endpoints de autenticação e renovação de token')
    .addTag('Orçamentos', 'Gerenciamento de orçamentos (CRUD)')
    .addTag('Clientes', 'Gerenciamento de clientes (CRUD)')
    .addTag('Equipe', 'Gerenciamento da equipe (CRUD)')
    .addTag('Configurações', 'Configurações da empresa')
    .addTag('Mensagens', 'Envio de mensagens e orçamentos via WhatsApp')
    .addTag('WhatsApp', 'Gerenciamento de instâncias WhatsApp')
    .addTag('Webhook', 'Recebimento de eventos do WhatsApp')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'API de Orçamentos - Documentação',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
    ],
  });

  await app.listen(3003)
    .then(() => {
      const port = 3003;
      Logger.log(`Servidor rodando em http://localhost:${port}`);
      Logger.log(`Documentação Swagger em http://localhost:${port}/api/docs`);
    })
    .catch((e) => Logger.error(e));
}
bootstrap();
