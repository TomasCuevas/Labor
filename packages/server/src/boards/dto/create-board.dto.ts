import { Matches, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @Matches(/^(?!\s)[\s\S]*(?<!\s)$/, {
    message:
      'El nombre del tablero, no puede tener espacios al principio ni al final.',
  })
  @MinLength(1, {
    message: 'El nombre del tablero debe tener mínimo 1 carácter.',
  })
  @MaxLength(50, {
    message: 'El nombre del tablero debe tener máximo 50 caracteres.',
  })
  name: string;
}
