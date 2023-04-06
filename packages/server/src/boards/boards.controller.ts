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
import { CardsService } from '../cards/cards.service';

//* dtos *//
import { CreateBoardDto } from './dto';

//* entities *//
import { Board } from './entities';
import { Card } from '../cards/entities';
import { User } from '../users/entities';

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

  //! get all cards by board [controller]
  @Get(':boardId/cards')
  async findAllTodos(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @GetUser() user: User,
  ): Promise<Card[]> {
    return await this.cardsService.findAllByBoard(boardId, user.id);
  }
}
