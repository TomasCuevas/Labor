import { BoardsService } from '../boards/boards.service';
import { CardsService } from '../cards/cards.service';
import { Board } from '../boards/entities';
import { Card } from '../cards/entities';
export declare class SearchService {
    private readonly boardsServices;
    private readonly cardsServices;
    constructor(boardsServices: BoardsService, cardsServices: CardsService);
    findAll(search: string, userId: string): Promise<{
        cards: Card[];
        boards: Board[];
    }>;
}
