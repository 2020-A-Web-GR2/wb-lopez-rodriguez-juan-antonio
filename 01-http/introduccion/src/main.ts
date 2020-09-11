import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
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
  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  );
  await app.listen(3001);
}
bootstrap();
