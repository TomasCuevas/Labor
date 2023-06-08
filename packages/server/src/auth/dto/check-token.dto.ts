import { IsBoolean } from 'class-validator';

export class CheckTokenDto {
  @IsBoolean({
    message: 'La propiedad "rememberMe" debe ser un valor booleano.',
  })
  rememberMe: boolean;
}
