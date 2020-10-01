import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query, Res
} from "@nestjs/common";
import {CancionService} from "./cancion.service";
import {CancionEntity} from "./cancion.entity";
import {CancionCreateDto} from "./dto/cancion.create-dto";

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
        @Res() res,
        @Query() parametrosConsulta,
    ) {
        let resultadoEncotrado
        try {
            console.log('busqueda', parametrosConsulta.busqueda)
            resultadoEncotrado = await this._cancionService.buscarTodasCanciones(parametrosConsulta.busqueda);
        } catch (e) {
            throw new InternalServerErrorException('Error encontrando canciones')
        }
        if (resultadoEncotrado) {
            return res.render(
                'inicio',
                {
                    arregloCanciones: resultadoEncotrado,
                    parametrosConsulta: parametrosConsulta
                })
        } else {
            throw new NotFoundException('No se encontraron canciones')
        }

    }

    @Get('vista/login')
    vistaLogin(
        @Res() res
    ) {
        return res.render(
            'login',
        )
    }

    @Get('vista/crear')
    vistaCrear(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'crear',
            {
                cancion: undefined,
                nombre: parametrosConsulta.nombre,
                album: parametrosConsulta.album,
                autor: parametrosConsulta.autor,
                genero: parametrosConsulta.genero,
                anio: parametrosConsulta.anio,
            }
        )
    }

    @Post('crearCancionDesdeVista')
    async crearCancionDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        let respuestaCreacionCancion;
        const cancionValida = new CancionCreateDto();
        cancionValida.nombre = parametrosCuerpo.nombre;
        cancionValida.album = parametrosCuerpo.album;
        cancionValida.genero = parametrosCuerpo.genero;
        cancionValida.autor = parametrosCuerpo.autor;
        cancionValida.anio = parametrosCuerpo.anio;

        try {
            respuestaCreacionCancion = await this._cancionService.crearUnaCancion(parametrosCuerpo);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException('Error creando cancion')
        }
        if (respuestaCreacionCancion) {
            return res.redirect('/cancion/vista/cancion')
        } else {
            throw new InternalServerErrorException('Error creando cancion');
        }
    }

    @Post('eliminarCancionDesdeVista/:id')
    async eliminarCancionDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._cancionService.eliminarUnaCancion(id);
            return res.redirect('/cancion/vista/cancion?mensaje=Cancion Eliminada');
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException('Error eliminando cancion')
        }
    }

    @Get('vista/editarCancion/:id')
    async editarCancionVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let cancionEncontrada;
        try {
            cancionEncontrada = await this._cancionService.buscarUnaCancion(id);
        } catch (e) {
            console.error('Error del servidor');
            return res.redirect('/cancion/vista/cancion?mensaje=Error buscando cancion');
        }
        if (cancionEncontrada) {
            return res.render(
                'crear',
                {
                    error: parametrosConsulta,
                    cancion: cancionEncontrada
                }
            )
        } else {
            return res.redirect('/cancion/vista/cancion?mensaje=Cancion no encontrada');
        }
    }

    @Post('editarCancionDesdeVista/:id')
    async editarCancionDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const cancionValida = new CancionCreateDto();
        cancionValida.nombre = parametrosCuerpo.nombre;
        cancionValida.album = parametrosCuerpo.album;
        cancionValida.genero = parametrosCuerpo.genero;
        cancionValida.autor = parametrosCuerpo.autor;
        cancionValida.anio = parametrosCuerpo.anio;

        const cancionEditada = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            album: parametrosCuerpo.album,
            autor: parametrosCuerpo.autor,
            genero: parametrosCuerpo.genero,
            anio: parametrosCuerpo.anio
        } as CancionEntity;
        try {
            await this._cancionService.editarUnaCancion(cancionEditada);
            return res.redirect('/cancion/vista/cancion?mensaje=Cancion editada');
        } catch (error) {
            console.error(error);
            return res.redirect('/cancion/vista/cancion?mensaje=Error editando cancion');
        }
    }


}