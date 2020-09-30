import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put
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

    @Post()
    async crearUnaCancion(
        @Body() parametrosCuerpo
    ){
        try{
            const respuesta = await this._cancionService.crearUnaCancion(parametrosCuerpo);
        }catch (e) {
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

}