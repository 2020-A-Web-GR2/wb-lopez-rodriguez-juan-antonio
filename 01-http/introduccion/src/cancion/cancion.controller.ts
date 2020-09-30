import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from "@nestjs/common";
import {CancionService} from "./cancion.service";

@Controller('cancion')
export class CancionController{


    constructor(
        private readonly _cancionService:CancionService
    ) {
    }

    @Get()
    async mostrarTodosCanciones(){
        try{
            const respuesta = await this._cancionService.buscarTodasCanciones();
            return  respuesta;
        }catch (e) {
            console.log(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }

    }

    @Post()
    async crearUnaCancion(
        @Body() parametrosCuerpo
    ){
        try{
            const respuesta = await this._cancionService.crearUnaCancion(parametrosCuerpo)
        }catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Get(':id')
    async verUnaCancion(
        @Param() parametrosRuta
    ){
        let respuesta;
        try{
            respuesta = await this._cancionService.buscarUnaCancion(Number(parametrosRuta.id));
        }catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
        if(respuesta){
            return respuesta;
        }else{
            throw new NotFoundException({
                mensaje:'No existen registros'
            })
        }
    }


    @Put(':id')
    async editarUnaCancion(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const cancionEditada = parametrosCuerpo;
        cancionEditada.id = id;
        console.log('CancionEditada', cancionEditada);
        try{
            const respuesta = await this._cancionService.editarUnaCancion(cancionEditada);
            return respuesta;
        }catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Delete(':id')
    async eliminarUnaCancion(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id)
        try{
            const respuesta = await this._cancionService.eliminarUnaCancion(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            }
        }catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Get('vista/cancion')
    async vistaCancion(
        @Res() res
    ){
        let resultadoEncotrado
        try{
            resultadoEncotrado = await this._cancionService.buscarTodasCanciones();
        }catch (e) {
            throw new InternalServerErrorException('Error encontrando canciones')
        }
        if(resultadoEncotrado){
            res.render(
                'cancion/inicioCancion',
                {
                    arregloCanciones: resultadoEncotrado
                })
        }else{
            throw new NotFoundException('No se encontraron canciones')
        }
    }

    @Get('vista/loginCancion')
    vistaLogin(
        @Res() res
    ){
        const nombreControlador = 'Juan';
        res.render(
            'cancion/loginCancion',
            {
                nombre: nombreControlador,
            })
    }

}