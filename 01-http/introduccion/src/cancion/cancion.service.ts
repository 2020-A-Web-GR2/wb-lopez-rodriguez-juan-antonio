import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CancionEntity} from "./cancion.entity";
import {Repository} from "typeorm";

@Injectable()
export class CancionService {
    constructor(
        @InjectRepository(CancionEntity)
        private repositorio: Repository<CancionEntity>
    ){

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

}