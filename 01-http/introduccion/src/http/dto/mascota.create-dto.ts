// @IsAlpha()
//@IsNotEmpty()
//@MaxLength()
//@MinLength()
//@IsBoolean()
//@IsEmpty()
//@IsInt()
//@IsPositive()
//@IsOptional()
//@IsNumber()
import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    Length, MaxLength,
    maxLength, MinLength, minLength
} from "class-validator";

export class MascotaCreateDto {
    @MaxLength(60)
    @MinLength(3)
    @IsNotEmpty()
    @IsAlpha()
    nombre: string;

    @IsPositive()
    @IsNotEmpty()
    @IsInt()
    edad: number; //enteros

    @IsBoolean()
    @IsOptional()
    ligada?: boolean;  //el singo ? hace que sea opcional, a veces existira y a veces no esta propiedad

    @IsBoolean()
    @IsNotEmpty()
    casada: boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso: number; //decimales



}


