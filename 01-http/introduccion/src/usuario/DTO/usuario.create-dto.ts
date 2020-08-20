import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength,
    IsDate,
    IsDateString
} from "class-validator";

export class UsuarioCreateDto {
    @IsAlpha()
    //@IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    texto: string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(18)
    cedula: string;

    @IsNumber()
    @IsPositive()
        //@IsNotEmpty()
    sueldo: number;

    @IsDateString()
    fechaNacimiento: string;

}