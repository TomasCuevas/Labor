import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCardDto {
  @Matches(/^(?!\s)[\s\S]*(?<!\s)$/, {
    message:
      'El nombre de la tarjeta, no puede tener espacios al principio ni al final.',
  })
  @MinLength(1, {
    message: 'El nombre de la tarjeta debe tener mínimo 1 carácter.',
  })
  @MaxLength(50, {
    message: 'El nombre de la tarjeta debe tener máximo 50 caracteres.',
  })
  title: string;

  @IsIn(['pending', 'in-progress', 'completed'], {
    message: 'El (status) enviado, no es un status valido.',
  })
  status: 'pending' | 'in-progress' | 'completed';

  @IsUUID(undefined, { message: 'El ID ingresado, debe ser un UUID valido.' })
  boardId: string;

  @IsString({ message: 'La descripcion debe ser un texto.' })
  @MinLength(1, { message: 'La descripción debe tener mínimo 1 carácter.' })
  @MaxLength(300, {
    message: 'La descripción debe tener máximo 300 carácteres.',
  })
  @IsOptional()
  description?: string;

  @IsArray({ message: 'El campo debe ser un array de strings.' })
  @IsString({
    each: true,
    message: 'Cada elemento del array debe ser una cadena de caracteres.',
  })
  @IsOptional()
  labels?: string[];
}
