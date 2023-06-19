import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from './dto';
import { Card } from '../cards/entities';
import { User } from '../users/entities';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: CreateCardDto, user: User): Promise<Card>;
    findOne(id: string, user: User): Promise<Card>;
    update(id: string, updateCardDto: UpdateCardDto, user: User): Promise<Card>;
    remove(id: string, user: User): Promise<void>;
}
