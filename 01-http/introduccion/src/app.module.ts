import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      // Aqui otros modulos
      HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default',  // nombre conexion
          type: 'mysql',    // mysql postgres
          host: 'localhost',    // ip
          port: 3306,       // puerto
          username: 'root',     // usuario
          password: 'root',     // password
          database: 'test',     // base de datos
          entities: [       // todas las entidades

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
