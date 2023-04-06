import { PartialType } from '@nestjs/mapped-types';

//* dto *//
import { CreateCardDto } from './';

export class UpdateCardDto extends PartialType(CreateCardDto) {}
