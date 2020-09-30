import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {CancionService} from "./cancion.service";

@Controller('cancion')
export class CancionController{

    public arregloCanciones = [
        {
            id:1,
            nombre:"Cancion1"
        },
        {
            id:2,
            nombre:"Cancion2"
        },
        {
            id:3,
            nombre:"Cancion3"
        },
    ]
    public idActualCancion = 3;

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
    editarUnaCancion(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloCanciones.findIndex(
            (cancion)=> cancion.id == Number(parametrosRuta.id)
        )
        this.arregloCanciones[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloCanciones[indice]
    }

    @Delete(':id')
    eliminarUnaCancion(
        @Param() parametrosRuta
    ){
        const indice = this.arregloCanciones.findIndex(
            (cancion)=> cancion.id == Number(parametrosRuta.id)
        )
        this.arregloCanciones.splice(indice, 1)
        return this.arregloCanciones[indice]
    }

}