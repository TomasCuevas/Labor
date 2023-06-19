import { CreateBoardDto } from './';
declare const UpdateBoardDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBoardDto>>;
export declare class UpdateBoardDto extends UpdateBoardDto_base {
    status?: 'open' | 'closed';
}
export {};
