import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CancionUpdateDto{

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(60)
    nombre:string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(60)
    album:string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(60)
    autor:string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(60)
    genero:string;


    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    anio:string;

}