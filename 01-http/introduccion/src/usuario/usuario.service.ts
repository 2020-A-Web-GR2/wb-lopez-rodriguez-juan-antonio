import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
//Crear controlador
// crear servicio
// crear modulo
// importar servicio controlador en el modulo
// importar modulo en el modulo principal

@Injectable()
export class UsuarioService {
    constructor(    // Inyeccion de Dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {

    }
    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario)
    }


}