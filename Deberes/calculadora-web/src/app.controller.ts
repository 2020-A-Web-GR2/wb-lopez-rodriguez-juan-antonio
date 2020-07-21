import {Body, Controller, Get, Header, Param, Post, Put, Query, Headers, Res, Delete} from '@nestjs/common';
import { AppService } from './app.service';

//http://localhost:3000/calculadora/
@Controller('calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  //http://localhost:3000/calculadora/consulta/SUMA?n1=20&n2=40
  @Get('consulta/SUMA')
  parametrosConsulta(
      @Query() parametrosDeConsulta
  ){
    const n1 = Number(parametrosDeConsulta.n1);
    const n2 = Number(parametrosDeConsulta.n2);
    const suma = n1 + n2;
    console.log('parametrosDeConsulta', parametrosDeConsulta);
    if(n1 && n2){
      console.log('suma',suma);
      return suma;
    }
    return '=)';
  }

  //http://localhost:3000/calculadora/body/RESTA
  @Put('body/RESTA')
  parametrosCuerpo(
      @Body() parametrosDeCuerpo
  ){
    const n1 = Number(parametrosDeCuerpo.n1);
    const n2 = Number(parametrosDeCuerpo.n2);
    const resta = n1 - n2;
    console.log('parametrosDeCuerpo', parametrosDeCuerpo);
    if(n1 && n2){
      console.log('resta',resta);
      return resta;
    }
    return '=)';
  }

  //http://localhost:3000/calculadora/header/MULTI
  @Delete('header/MULTI')
  parametrosCabecera(
      @Headers() parametrosDeCabecera
  ){

    const n1 = Number(parametrosDeCabecera.n1);
    const n2 = Number(parametrosDeCabecera.n2);
    const multiplicacion = n1 * n2;
    console.log('parametrosDeCabecera', parametrosDeCabecera);
    if(n1 && n2){
      console.log('multiplicacion',multiplicacion);
      return multiplicacion;
    }
    return '=)';

  }

//http://localhost:3000/calculadora/ruta/DIVISION/n1/XX/n2/YY
  @Post('ruta/DIVISION/n1/:n1/n2/:n2')
  parametrosRuta(
      @Param() parametrosDeRuta
  ){

    const n1 = Number(parametrosDeRuta.n1);
    const n2 = Number(parametrosDeRuta.n2);
    console.log('parametrosDeCabecera', parametrosDeRuta);
    if(parametrosDeRuta.n2 == 0){
      const mensaje = 'N2 no puede ser 0';
      console.log(mensaje);
      return mensaje;
    }else {
      if (n1 && n2) {
        const division = n1 / n2;
        console.log('division', division);
        return division;
      }
    }
    return '=)';

  }


}
