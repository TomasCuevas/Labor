import { Injectable } from '@nestjs/common';

//* services *//
import { BoardsService } from '@/boards/boards.service';
import { CardsService } from '@/cards/cards.service';

//* entities *//
import { Board } from '@/boards/entities';
import { Card } from '@/cards/entities';

@Injectable()
export class SearchService {
  constructor(
    private readonly boardsServices: BoardsService,
    private readonly cardsServices: CardsService,
  ) {}

  //! search all [service]
  async findAll(
    search: string,
    userId: string,
  ): Promise<{ cards: Card[]; boards: Board[] }> {
    const boards = await this.boardsServices.findAllBySearch(search, userId);
    const cards = await this.cardsServices.findAllBySearch(search, userId);

    return {
      boards,
      cards,
    };
  }
}
