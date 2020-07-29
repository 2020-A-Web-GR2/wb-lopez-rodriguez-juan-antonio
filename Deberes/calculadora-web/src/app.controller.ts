import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Headers,
  Res,
  Delete,
  Req,
  HttpCode, BadRequestException
} from '@nestjs/common';
import { AppService } from './app.service';

//http://localhost:3000/calculadora/
@Controller('calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  //http://localhost:3000/calculadora/consulta/SUMA?n1=20&n2=40
  @Get('consulta/SUMA')
  @HttpCode(200)
  parametrosConsulta(
      @Query() parametrosDeConsulta,
      @Req() req,
      @Res() res
  ) {
    if (!this.existeUsuario(req)) {
      throw new BadRequestException('Se requiere de un usuario. ' +
          'Registre uno en http://localhost:3000/calculadora/GUARDAR?usuario=');
    } else {
      const n1: number = parseFloat(parametrosDeConsulta.n1);
      const n2: number = parseFloat(parametrosDeConsulta.n2);
      const suma = n1 + n2;
      const puntaje = req.signedCookies["puntaje"]
      const puntajeActualizado = (Number(puntaje) - Math.abs(suma));
      console.log('parametrosDeConsulta', parametrosDeConsulta);
      if (n1 && n2) {
        if (Number(puntajeActualizado) <= 0) {
          res.cookie('puntaje', '100', {signed: true});
          const mensaje = {
            Suma: suma,
            Puntaje: String(req.cookies["usuario"]).concat(", acabaron tus puntos, se han restablecido en 100")
          }
          res.send(mensaje)
        } else {
          res.cookie('puntaje', puntajeActualizado, {signed: true});
          const mensaje = {
            Suma: suma,
            Puntaje: puntajeActualizado
          }
          res.send(mensaje)
        }
        return 'N1 y N2 deben ser numeros';
      }
    }
  }

  //http://localhost:3000/calculadora/body/RESTA
  @Put('body/RESTA')
  @HttpCode(201)
  async parametrosCuerpo(
      @Body() parametrosDeCuerpo,
      @Req() req,
      @Res() res
  ) {
    if (!this.existeUsuario(req)) {
      throw new BadRequestException('Se requiere de un usuario. ' +
          'Registre uno en http://localhost:3000/calculadora/GUARDAR?usuario=');
    } else {
      const n1: number = parseFloat(parametrosDeCuerpo.n1);
      const n2: number = parseFloat(parametrosDeCuerpo.n2);
      const resta = n1 - n2;
      const puntaje = req.signedCookies["puntaje"]
      const puntajeActualizado = (Number(puntaje) - Math.abs(resta));

      console.log('parametrosDeCuerpo', parametrosDeCuerpo);
      if (n1 && n2) {
        if (Number(puntajeActualizado) <= 0) {
          res.cookie('puntaje', '100', {signed: true});
          const mensaje = {
            Resta: resta,
            Puntaje: String(req.cookies["usuario"]).concat(", acabaron tus puntos, se han restablecido en 100")
          }
          res.send(mensaje)
        } else {
          res.cookie('puntaje', puntajeActualizado, {signed: true});
          const mensaje = {
            Resta: resta,
            Puntaje: puntajeActualizado
          }
          res.send(mensaje)
        }
        return 'N1 y N2 deben ser numeros';
      }
    }
  }


  //http://localhost:3000/calculadora/header/MULTI
  @Delete('header/MULTI')
  @HttpCode(200)
  parametrosCabecera(
      @Headers() parametrosDeCabecera,
      @Req() req,
      @Res() res
  ) {
    if (!this.existeUsuario(req)) {
      throw new BadRequestException('Se requiere de un usuario. ' +
          'Registre uno en http://localhost:3000/calculadora/GUARDAR?usuario=');
    } else {
      const n1: number = parseFloat(parametrosDeCabecera.n1);
      const n2: number = parseFloat(parametrosDeCabecera.n2);
      const multiplicacion = n1 * n2;
      const puntaje = req.signedCookies["puntaje"]
      const puntajeActualizado = (Number(puntaje) - Math.abs(multiplicacion));
      console.log('parametrosDeCabecera', parametrosDeCabecera);
      if (n1 && n2) {
        //console.log('multiplicacion', multiplicacion);
        //return multiplicacion;
        if (Number(puntajeActualizado) <= 0) {
          res.cookie('puntaje', '100', {signed: true});
          const mensaje = {
            Multiplicacion: multiplicacion,
            Puntaje: String(req.cookies["usuario"]).concat(", acabaron tus puntos, se han restablecido en 100")
          }
          res.send(mensaje)
        } else {
          res.cookie('puntaje', puntajeActualizado, {signed: true});
          const mensaje = {
            Multiplicacion: multiplicacion,
            Puntaje: puntajeActualizado
          }
          res.send(mensaje)
        }
      return 'N1 y N2 deben ser numeros';
    }
  }
}

//http://localhost:3000/calculadora/ruta/DIVISION/n1/XX/n2/YY
  @Post('ruta/DIVISION/n1/:n1/n2/:n2')
  @HttpCode(201)
  parametrosRuta(
      @Param() parametrosDeRuta,
      @Req() req,
      @Res() res
  ) {
    if (!this.existeUsuario(req)) {
      throw new BadRequestException('Se requiere de un usuario. ' +
          'Registre uno en http://localhost:3000/calculadora/GUARDAR?usuario=');
    } else {
      const n1: number = parseFloat(parametrosDeRuta.n1);
      const n2: number = parseFloat(parametrosDeRuta.n2);
      console.log('parametrosDeRuta', parametrosDeRuta);
      if (parametrosDeRuta.n2 == 0) {
        const mensaje = 'N2 no puede ser 0';
        console.log(mensaje);
        return mensaje;
      } else {
        if (n1 && n2) {
          const division = n1 / n2;
          console.log('division', division);
          const puntaje = req.signedCookies["puntaje"]
          const puntajeActualizado = (Number(puntaje) - Math.abs(division));
          //return division;
          if (Number(puntajeActualizado) <= 0) {
            res.cookie('puntaje', '100', {signed: true});
            const mensaje = {
              Division: division,
              Puntaje: String(req.cookies["usuario"]).concat(", acabaron tus puntos, se han restablecido en 100")
            }
            res.send(mensaje)
          } else {
            res.cookie('puntaje', puntajeActualizado, {signed: true});
            const mensaje = {
              Division: division,
              Puntaje: puntajeActualizado
            }
            res.send(mensaje)
          }
        }
        return 'N1 y N2 deben ser numeros';
      }
    }
  }

  //http://localhost:3000/calculadora/mostrarCookies
  @Get('mostrarCookies')
  mostrarCookies(
      @Req() req
  ){
    const mensaje={
      sinFirmar: req.cookies,
      firmadas: req.signedCookies
    }
    return mensaje;
  }

  existeUsuario(
      req
  ): boolean{
    const existeCookieUsuario: object = req.cookies;
    return (existeCookieUsuario['usuario'])? true: false;
  }

  //http://localhost:3000/calculadora/GUARDAR?usuario=Juan
  @Get('GUARDAR')
  @HttpCode(201)
  guardarUsuario(
      @Query() parametrosDeConsulta,
      @Req() req,
      @Res() res
  ) {
    if(parametrosDeConsulta.usuario === undefined  || parametrosDeConsulta.usuario === '') {
      throw new BadRequestException('Se debe enviar un nombre en la ruta \n' +
          'Ejemplo: http://localhost:3000/calculadora/GUARDAR?usuario=Juan');
    }else{
      res.cookie('usuario', parametrosDeConsulta.usuario);
      res.cookie('puntaje', '100', {signed: true});
      res.send({
        mensaje: 'Guardado correctamente'
      });
      console.log('Se ha creado la cookie para: ', req.cookies['usuario']);
      console.log('Con un puntaje de: ', req.signedCookies['puntaje']);
    }
  }





}
