import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* decorators */
import { GetUser } from '../auth/decorators';

//* services *//
import { SearchService } from './search.service';

//* entity *//
import { Board } from '../boards/entities';
import { Card } from '../cards/entities';
import { User } from '../users/entities';

@Controller('search')
@UseGuards(AuthGuard('jwt'))
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  //! search all [controller]
  @Get('/all/:search')
  searchAll(
    @Param('search') search: string,
    @GetUser() user: User,
  ): Promise<{ cards: Card[]; boards: Board[] }> {
    return this.searchService.findAll(search, user.id);
  }
}
