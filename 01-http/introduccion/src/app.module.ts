import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaEntity} from "./mascota/mascota.entity";

@Module({
  imports: [
      // Aqui otros modulos
      HttpJuegoModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name: 'default',  // nombre conexion
          type: 'mysql',    // mysql postgres
          host: 'localhost',    // ip
          port: 32785,       // puerto
          username: 'juan',     // usuario
          password: 'root',     // password
          database: 'webDatabase',     // base de datos
          entities: [       // todas las entidades
              UsuarioEntity,
              VacunaEntity,
              MascotaEntity,
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
