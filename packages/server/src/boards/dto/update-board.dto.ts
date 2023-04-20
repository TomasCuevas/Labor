import { PartialType } from '@nestjs/mapped-types';

//* dto *//
import { CreateBoardDto } from './';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
