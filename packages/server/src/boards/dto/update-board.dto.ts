import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';

//* dto *//
import { CreateBoardDto } from './';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString()
  @IsIn(['open', 'closed'])
  @IsOptional()
  status?: 'open' | 'closed';
}
