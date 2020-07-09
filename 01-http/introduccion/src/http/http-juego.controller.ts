import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

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
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);
        // Validar que la edad y la altura son numeros
        //isNaN(parametrosRuta.edad)   //'ABC' true
        //isNaN(parametrosRuta.altura)   //'ABC' true
        //throw new BadRequestException('No son Numeros')
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



}