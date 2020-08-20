import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')
const express = require('express')
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;


  /*
  AQUI CONFIGURACION
  ANTES DEL APP.LISTEN()
  */

  //para inseguras y seguras
  //app.use(cookieParser())

  //para cookies firmadas
  app.use(cookieParser('Me gustan los poliperros'));
  app.set('view engine', 'ejs')
  app.use(express.static('publico'));
  await app.listen(3001);
}
bootstrap();
