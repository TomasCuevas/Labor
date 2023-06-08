import { IsBoolean, IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'El email debe tener un formato valido.' })
  email: string;

  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' })
  @MaxLength(50, { message: 'La contraseña debe tener maximo 50 caracteres.' })
  password: string;

  @IsBoolean({
    message: 'La propiedad "rememberMe" debe ser un valor booleano.',
  })
  rememberMe: boolean;
}
