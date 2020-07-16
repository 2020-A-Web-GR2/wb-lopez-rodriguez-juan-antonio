import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, Head,
    Header,
    Headers,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

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
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        //Promesa
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        try {
            const errores: ValidationError[] = await validate(mascotaValida)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando');
        }
    }
    // COOKIES
    // 1 Guardar cookie insegura
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, // request - peticion
        @Res() res // response - respuesta
    ){
        res.cookie(
            'galletaInsegura', // nombre
            'Tengo Hambre', // valor
            );

        const mensaje = {
            mensaje: 'ok'
        }
        //No se puede usar return cuando se usa @Res()
        res.send(mensaje);
    }

    // 2 Guardar cookie segura
    //http://localhost:3001/juegos-http/guardarCookieSegura
    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, // request - peticion
        @Res() res // response - respuesta
    ){
        res.cookie(
            'galletaSegura', // nombre
            'Web :3', // valor
            {
                secure: true
            }
        );

        const mensaje = {
            mensaje: 'ok'
        }
        //No se puede usar return cuando se usa @Res()
        res.send(mensaje);
    }

    // 3 Mostrar Cookies
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

    //guardar Cookie Firmada
    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,

        // para obtener las cabeceras se usa el metodo
        @Headers() headers      // peticion - request
    ){
        console.log('HEADERS: ', headers);
        res.header('Cabecera', 'Dinamica'); // respuesta - response

        res.cookie('firmada', 'poliburguer', {signed:true});
        res.cookie('firmada2', 'GGG', {signed:true});
        res.cookie('firmada3', 'hola a todos', {signed:true});

        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }


}