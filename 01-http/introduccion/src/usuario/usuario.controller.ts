import {Body, Controller, Get, Param, Post} from '@nestjs/common';

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

    //http://localhost:3001/usuario/
    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }

    //http://localhost:3001/usuario/
    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual +1;
        return nuevoUsuario;
    }

    //http://localhost:3001/usuario/1
    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario)=> usuario.id == Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice]
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