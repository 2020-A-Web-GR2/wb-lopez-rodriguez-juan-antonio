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
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {tryCatch} from "rxjs/internal-compatibility";

@Controller('usuario')
export class UsuarioController {
    public arregloUsuarios = [
        {
          id:1,
          nombre:"Juan"
        },
        {
            id:2,
            nombre:"Antonio"
        },
        {
            id:3,
            nombre:"Armando"
        }
    ];
    public idActual = 3;

    constructor( //Inyeccion de dependencias
        private readonly _usuarioService: UsuarioService
    ){

    }


    //http://localhost:3001/usuario/
    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
    }

    //http://localhost:3001/usuario/
    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try {
            //validacion del create dto
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (e) {
            console.log(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }



    //http://localhost:3001/usuario/1
    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
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


    //http://localhost:3001/usuario/1
    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario)=> usuario.id == Number(parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];
    }

    //http://localhost:3001/usuario/1
    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario)=> usuario.id == Number(parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice, 1)
        return this.arregloUsuarios[indice];
    }


    /*
    //Formatos usados en la web
    //  XML <usuario><nombre>JUAN</nombre></usuario>
    //  JSON {"nombre":"JUAN"}

    // Estandar RESTful - JSON
    // http://localhost:3001/
    // RESTFUL MASCOTA
    // Ver Todos
    // GET http://localhost:3001/mascota
    // Ver Uno
    // se utiliza get y el identificador por ruta
    // GET http://localhost:3001/mascota/1
    // Crear Uno
    // POST http://localhost:3001/mascota  (BODY) {"nombre":"muzzy"}
    // Editar Uno
    // PUT http://localhost:3001/mascota/1  (BODY) {"nombre":"panda"}
    // Eliminar Uno
    // DELETE http://localhost:3001/mascota/1
*/



}