import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { parse } from 'yamljs';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const fileContents = readFileSync(join(__dirname, '..', 'doc', 'api.yaml'), 'utf8');
  const swaggerDocument = parse(fileContents);
  SwaggerModule.setup('api', app, swaggerDocument);

  const PORT = configService.get<string>('PORT') || 4000;
  await app.listen(PORT);
}
bootstrap();
