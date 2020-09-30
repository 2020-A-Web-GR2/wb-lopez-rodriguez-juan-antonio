import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_cancion')
export class CancionEntity{
    @PrimaryGeneratedColumn({
        unsigned : true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    nombre?:string

    @Column({
        name: 'album',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    album?:string

    @Column({
        name: 'autor',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    autor?:string

    @Column({
        name: 'genero',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    genero?:string

    @Column({
        name: 'anio',
        type: 'varchar',
        nullable: true,
        length: '4'
    })
    anio?:string


}