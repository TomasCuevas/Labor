import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBoardDto {
  @Matches(/^(?!\s)[\s\S]*(?<!\s)$/, {
    message:
      'El nombre del tablero, no puede tener espacios al principio ni al final.',
  })
  @Matches(/^[^?!]+$/, {
    message:
      'El nombre del tablero no puede contener signos de interrogación ni exclamación.',
  })
  @MinLength(1, {
    message: 'El nombre del tablero debe tener mínimo 1 carácter.',
  })
  @MaxLength(50, {
    message: 'El nombre del tablero debe tener máximo 50 caracteres.',
  })
  name: string;

  @IsString({ message: 'La descripcion debe ser un texto.' })
  @MaxLength(300, {
    message: 'La descripción debe tener máximo 300 carácteres.',
  })
  @IsOptional()
  description?: string;

  @IsString({
    message: 'El nombre del background seleccionado, debe ser un string.',
  })
  @IsOptional()
  background?: string;
}
