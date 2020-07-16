import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  /*
  AQUI CONFIGURACION
  ANTES DEL APP.LISTEN()
  */

  //para inseguras y seguras
  //app.use(cookieParser())

  //para cookies firmadas
  app.use(cookieParser('Me gustan los poliperros'));
  await app.listen(3001);
}
bootstrap();
