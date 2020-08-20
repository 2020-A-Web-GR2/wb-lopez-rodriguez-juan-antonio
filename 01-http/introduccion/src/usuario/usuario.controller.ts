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
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {tryCatch} from "rxjs/internal-compatibility";
import {MascotaService} from "../mascota/mascota.service";

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
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService,
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
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        console.log('usuarioEditado' ,usuarioEditado)
        try{
            const respuesta = await this._usuarioService.editarUno(usuarioEditado);
            return respuesta ;
        }catch (e) {
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }

    }

    //http://localhost:3001/usuario/1
    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
       const id = Number(parametrosRuta.id)
        try{
            const respuesta = await this._usuarioService.eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            };

        }catch (e) {
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
    }

    //http://localhost:3001/usuario/crearUsuarioYCrearMascota
    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario =  parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        //Validar usuario
        //Validar mascota
        //CREAMOS LOS DOS
        let usuarioCreado
        try{
             usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException({
                mensaje:"Error creando usuario",
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota',
            })
        }

    }

    // http://localhost:3001/usuario/vista/usuario
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Adrian';
        res.render(
            'ejemplo', // Nombre de la vista (archivo)
            {   // parametros de la vista
                nombre: nombreControlador,
            })
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