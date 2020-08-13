import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      // Aqui otros modulos
      HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default',  // nombre conexion
          type: 'mysql',    // mysql postgres
          host: 'localhost',    // ip
          port: 32769,       // puerto
          username: 'juan',     // usuario
          password: 'root',     // password
          database: 'webDatabase',     // base de datos
          entities: [       // todas las entidades
              UsuarioEntity
          ],
          synchronize: true,    // actualiza el esquema de la base de datos
          dropSchema: false,     // eliminar datos y el esquema de base de datos
      }),
  ],
  controllers: [
      // Controladores del APP MODULE
      AppController
  ],
  providers: [
      // Servicios APP MODULE
      AppService
  ],
})
export class AppModule {}
