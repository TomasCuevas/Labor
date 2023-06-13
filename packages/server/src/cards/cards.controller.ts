import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* services *//
import { CardsService } from './cards.service';

//* dtos *//
import { CreateCardDto, UpdateCardDto } from './dto';

//* decorators *//
import { GetUser } from '../auth/decorators';

//* entities *//
import { Card } from '../cards/entities';
import { User } from '../users/entities';

@Controller('cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  //! create card [controller]
  @Post('create')
  async create(
    @Body() createCardDto: CreateCardDto,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.create(createCardDto, user);
  }

  //! find one card by id [controller]
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.cardsService.findOne(id, user.id);
  }

  //! update card [controller]
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.update(id, updateCardDto, user.id);
  }

  //! remove card [controller]
  @Delete('delete/:id')
  async remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.cardsService.remove(id, user.id);
  }
}
