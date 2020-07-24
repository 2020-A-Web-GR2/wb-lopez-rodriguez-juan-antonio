import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'   // Nombres de las propiedades en la clase
])

@Index(
    ['nombre', 'apellido', 'cedula'],
    {unique: true}
)


@Entity('db_usuario') // nombre de la tabla usuario
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned : true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?:string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?:string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula:string

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, // $1000000000.
        scale: 4   // .0001
    })
    sueldo?:string

    @Column({
        name: 'fecha_nacimiento',
        nullable: true,
        type: 'date',
    })
    fechaNacimiento?:string

    @Column({
        name: 'fecha_hora_nacimiento',
        nullable: true,
        type: 'datetime',
    })
    fechaHoraNacimiento?:string

}

