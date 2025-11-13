import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 🔹 importante para conectar con React
  await app.listen(process.env.PORT || 3000);
  console.log('✅ Backend corriendo en puerto', process.env.PORT || 3000);
}
bootstrap();
