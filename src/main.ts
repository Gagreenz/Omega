import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AuthGuard } from "@nestjs/passport";

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(AuthGuard('jwt') as any);
  await app.listen(3000);
}
bootstrap();
