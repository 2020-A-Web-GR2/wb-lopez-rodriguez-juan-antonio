import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post
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

}