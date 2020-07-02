import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      // Aqui otros modulos
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
