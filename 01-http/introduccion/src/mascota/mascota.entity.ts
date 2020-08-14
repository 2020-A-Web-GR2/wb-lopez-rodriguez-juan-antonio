import {Entity} from 'typeorm';
import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity, //que entidad relacionamos
        usuario => usuario.mascotas     // campo con el que relacionamos
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => VacunaEntity,    // que entidad nos relacionamos
        vacuna => vacuna.mascota
    )
    vacunas: VacunaEntity[];

}