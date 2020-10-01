import {Injectable} from "@nestjs/common";
import {CancionEntity} from "./cancion.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";

import {UsuarioEntity} from "../../../introduccion/src/usuario/usuario.entity";

@Injectable()
export class CancionService{

    constructor(
        @InjectRepository(CancionEntity)
        private repositorio: Repository<CancionEntity>
    ) {
    }

    crearUnaCancion(nuevaCancion: CancionEntity){
        return this.repositorio.save(nuevaCancion)
    }

    buscarTodasCanciones(textoDeConsulta?: string){
        const consulta: FindManyOptions<CancionEntity>={
            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    autor: Like(`%${textoDeConsulta}%`)
                },
                {
                    album: Like(`%${textoDeConsulta}%`)
                },
                {
                    genero: Like(`%${textoDeConsulta}%`)
                },
                {
                    anio: Like(`%${textoDeConsulta}%`)
                }
            ]
        }

        return this.repositorio.find(consulta)
    }

    buscarUnaCancion(id: number){
        return this.repositorio.findOne(id)
    }

    editarUnaCancion(cancionEditada: CancionEntity){
        return this.repositorio.save(cancionEditada);
    }

    eliminarUnaCancion(id: number){
        return this.repositorio.delete(id);
    }

}