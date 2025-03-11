import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Localization System API')
    .setDescription('API para gerenciamento de localização de serviços')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona autenticação via token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota para acessar a documentação

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
