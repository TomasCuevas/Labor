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
import { GetUser } from '@/auth/decorators';

//* services *//
import { BoardsService } from '@/boards/boards.service';
import { CardsService } from '@/cards/cards.service';

//* dtos *//
import { CreateBoardDto, UpdateBoardDto } from '@/boards/dto';

//* entities *//
import { Board } from '@/boards/entities';
import { Card } from '@/cards/entities';
import { User } from '@/users/entities';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly cardsService: CardsService,
  ) {}

  //! create board [controller]
  @Post('create')
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return await this.boardsService.create(createBoardDto, user);
  }

  //! get all open boards [controller]
  @Get('all/open')
  async findAllOpenBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.findAllOpenBoards(user.id);
  }

  //! get board by name [controller]
  @Get(':name')
  async findOne(
    @Param('name') name: string,
    @GetUser() user: User,
  ): Promise<Board> {
    return await this.boardsService.findOneByName(name, user.id);
  }

  //! get all closed boards [controller]
  @Get('all/closed')
  async findAllClosedBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.findAllClosedBoards(user.id);
  }

  //! get all cards by board [controller]
  @Get(':boardId/cards')
  async findAllTodos(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @GetUser() user: User,
  ): Promise<Card[]> {
    return await this.cardsService.findAllByBoard(boardId, user.id);
  }

  //! update board [controller]
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return await this.boardsService.update(id, updateBoardDto, user);
  }

  //! delete board [controller]
  @Delete('delete/:id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.boardsService.delete(id, user);
  }
}
