import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* decorators *//
import { GetUser } from '../auth/decorators';

//* services *//
import { BoardsService } from './boards.service';

//* dtos *//
import { CreateBoardDto, UpdateBoardDto } from './dto';

//* entities *//
import { Board } from './entities';
import { User } from '../users/entities';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  //! create board controller
  @Post('create')
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return await this.boardsService.create(createBoardDto, user);
  }

  //! get all boards controller
  @Get('all')
  async findAll(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
