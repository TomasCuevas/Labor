import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email debe tener un formato valido.' })
  email: string;

  @Matches(/^[a-zA-ZÀ-ÖØ-öø-ſ]+([ '-][a-zA-ZÀ-ÖØ-öø-ſ]+)*$/, {
    message:
      'El nombre solo puede contener letras y espacios, guiones o apóstrofes entre los nombres.',
  })
  @MinLength(1, { message: 'El nombre debe tener mínimo 1 careacter.' })
  @MaxLength(46, { message: 'El nombre debe tener maximo 46 caracteres.' })
  name: string;

  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' })
  @MaxLength(50, { message: 'La contraseña debe tener maximo 50 caracteres.' })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'La contraseña debe tener al menos una mayuscula.',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'La contraseña debe tener al menos un numero.',
  })
  @Matches(/^[a-zA-Z0-9\-\.]+$/, {
    message:
      'La contraseña solo puede tener letras, numeros, guiones y puntos.',
  })
  password: string;
}
