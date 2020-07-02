import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  /*
  AQUI CONFIGURACION
  ANTES DEL APP.LISTEN()
  */
  await app.listen(3001);
}
bootstrap();
