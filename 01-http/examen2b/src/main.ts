import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express')
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  const session = require('express-session');
  const FileStore = require('session-file-store')(session);

  app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  app.use(
      session({
        name:'server-session-id',
        secret:'No sera de tomar un traguito',
        resave:true,
        saveUninitialized:true,
        cookie:{secure:false},
        store:new FileStore(),
      }),
  );

  await app.listen(3000);
}
bootstrap();
