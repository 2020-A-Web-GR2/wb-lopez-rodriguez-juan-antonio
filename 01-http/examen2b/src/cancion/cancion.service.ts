import {Injectable} from "@nestjs/common";
import {CancionEntity} from "./cancion.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

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

    buscarTodasCanciones(){
        return this.repositorio.find()
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