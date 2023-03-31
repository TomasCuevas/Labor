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
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';

//* decorators *//
import { GetUser } from '../auth/decorators';

//* services *//
import { BoardsService } from './boards.service';
import { TodosService } from '../todos/todos.service';

//* dtos *//
import { CreateBoardDto, UpdateBoardDto } from './dto';

//* entities *//
import { Board } from './entities';
import { Todo } from '../todos/entities';
import { User } from '../users/entities';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly todosService: TodosService,
  ) {}

  //! create board [controller]
  @Post('create')
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return await this.boardsService.create(createBoardDto, user);
  }

  //! get all boards [controller]
  @Get('all')
  async findAll(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.findAll(user.id);
  }

  //! get board by name [controller]
  @Get(':name')
  async findOne(
    @Param('name') name: string,
    @GetUser() user: User,
  ): Promise<Board> {
    return await this.boardsService.findOneByName(name, user.id);
  }

  //! get all todos by board [controller]
  @Get(':boardId/todos')
  async findAllTodos(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @GetUser() user: User,
  ): Promise<Todo[]> {
    return await this.todosService.findAllByBoard(boardId, user.id);
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
