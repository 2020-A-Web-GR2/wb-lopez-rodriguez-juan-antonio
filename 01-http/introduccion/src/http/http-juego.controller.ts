import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from "@nestjs/common";

@Controller('juegos-http')
export class HttpJuegoController{

    @Get('hola')
    @HttpCode(201)
    hola(){
        throw new BadRequestException('No envia nada')
        //return 'Hola GET! :)'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return 'Hola DELETE'
    }

    // http:localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    // http://localhost:3001/juegos-http/parametros-ruta/25/gestion/75
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);
        // PARA Validar que la edad y la altura son numeros
        //isNaN(parametrosRuta.edad)   //'ABC' true
        //isNaN(parametrosRuta.altura)   //'ABC' true
        const paraNaNEdad: boolean = isNaN(parametrosRuta.edad);
        const paraNaNAltura: boolean = isNaN(parametrosRuta.altura);
        if(paraNaNAltura || paraNaNEdad){
            throw new BadRequestException(
                'No son Numeros'
            )
        }
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad + altura;
        //return 'ok';
    }

    //http://localhost:3001/juegos-http/parametros-consulta
    //http://localhost:3001/juegos-http/parametros-consulta?nombre=Juan&apellido=Lopez
    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        const nombre = String(parametrosDeConsulta.nombre);
        const apellido = String(parametrosDeConsulta.apellido);
        const nombreyApellido = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido;
        // Se puede hacer con != undefined pero no es necesario ya que se hace automatico en la linea de arriba
        // const nombreyApellido = parametrosDeConsulta.nombre != undefined && parametrosDeConsulta.apellido != undefined;
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if(nombreyApellido){
            return ' --nombre: ' + nombre + ' --apellido: ' + apellido;
        }
        return '=)';
    }

    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        console.log('Parametros de cuerpo', parametrosDeCuerpo)
        return 'Registro creado'
    }



}