import {Entity} from 'typeorm';
import {Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity()
export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => MascotaEntity, //que entidad relacionamos
        mascota => mascota.vacunas     // campo con el que relacionamos
    )
    mascota: MascotaEntity;

}