import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email debe tener un formato valido.' })
  email: string;

  @IsString({ message: 'El nombre solo puede contener letras.' })
  @MinLength(1, { message: 'El nombre debe tener mínimo 1 careacter.' })
  @MaxLength(46, { message: 'El nombre debe tener maximo 46 caracteres.' })
  name: string;

  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' })
  @MaxLength(50, { message: 'La contraseña debe tener maximo 50 caracteres.' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener mayusculas, minusculas y numeros.',
  })
  password: string;
}
