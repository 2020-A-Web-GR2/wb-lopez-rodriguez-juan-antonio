import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Res
} from "@nestjs/common";
import {CancionService} from "./cancion.service";

@Controller('cancion')
export class CancionController {

    constructor(
        private readonly _cancionService: CancionService
    ) {
    }

    @Get()
    async mostrarTodosCanciones() {
        try {
            const respuesta = await this._cancionService.buscarTodasCanciones();
            return respuesta;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }

    }

    @Get(':id')
    async verUnaCancion(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._cancionService.buscarUnaCancion(Number(parametrosRuta.id));
        } catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
        if (respuesta) {
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: 'No existen registros'
            })
        }
    }

    @Post()
    async crearUnaCancion(
        @Body() parametrosCuerpo
    ) {
        try {
            const respuesta = await this._cancionService.crearUnaCancion(parametrosCuerpo);
        } catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Put(':id')
    async editarUnaCancion(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ) {
        const id = Number(parametrosRuta.id);
        const cancionEditada = parametrosCuerpo;
        cancionEditada.id = id;
        console.log('CancionEditada', cancionEditada);
        try {
            const respuesta = await this._cancionService.editarUnaCancion(cancionEditada);
            return respuesta;
        } catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Delete(':id')
    async eliminarUnaCancion(
        @Param() parametrosRuta
    ) {
        const id = Number(parametrosRuta.id)
        try {
            const respuesta = await this._cancionService.eliminarUnaCancion(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            }
        } catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Get('vista/cancion')
    async vistaCancion(
        @Res() res
    ) {
        let resultadoEncotrado
        try{
            resultadoEncotrado = await this._cancionService.buscarTodasCanciones();
        }catch (e) {
            throw new InternalServerErrorException('Error encontrando canciones')
        }
        if(resultadoEncotrado){
            res.render(
                'inicio',
                {
                    arregloCanciones: resultadoEncotrado
                })
        }else{
            throw new NotFoundException('No se encontraron canciones')
        }

    }
    @Get('vista/login')
    vistaLogin(
        @Res() res
    ) {
        res.render(
            'login',
        )
    }

    @Get('vista/crear')
    vistaCrear(
        @Res() res
    ) {
        res.render(
            'crear',
        )
    }

    @Post('crearCancionDesdeVista')
    async crearCancionDesdeVista(
        @Body() parametrosCuerpo
    ) {
        let respuestaCreacionCancion;
        try{
            respuestaCreacionCancion = await this._cancionService.crearUnaCancion(parametrosCuerpo);
            console.log('respuesta aqui', respuestaCreacionCancion)
        }catch (e) {
            console.log(e);
            throw new InternalServerErrorException('Error creando cancion')
        }
        if (respuestaCreacionCancion){
            return 'Cancion creada'
        }else{
            throw new InternalServerErrorException('Error creando cancion');
        }
    }






}