import { SearchService } from './search.service';
import { Board } from '../boards/entities';
import { Card } from '../cards/entities';
import { User } from '../users/entities';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchAll(search: string, user: User): Promise<{
        cards: Card[];
        boards: Board[];
    }>;
}
