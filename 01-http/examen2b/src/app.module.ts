import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CancionModule} from "./cancion/cancion.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CancionEntity} from "./cancion/cancion.entity";

@Module({
  imports: [
    CancionModule,
      TypeOrmModule.forRoot({
          name: 'default',  // nombre conexion
          type: 'mysql',    // mysql postgres
          host: 'localhost',    // ip
          port: 32769,       // puerto
          username: 'juan',     // usuario
          password: 'root',     // password
          database: 'webDatabase',     // base de datos
          entities: [       // todas las entidades
            CancionEntity
          ],
          synchronize: true,    // actualiza el esquema de la base de datos
          dropSchema: false,     // eliminar datos y el esquema de base de datos
      }),
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
