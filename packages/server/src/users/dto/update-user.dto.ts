import { PartialType } from '@nestjs/mapped-types';

//* dto-inputs-args *//
import { CreateUserDto } from './';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
