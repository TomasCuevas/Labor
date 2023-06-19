import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from '../cards/dto';
import { BoardsService } from '../boards/boards.service';
import { Card } from '../cards/entities';
import { User } from '../users/entities';
export declare class CardsService {
    private readonly CardsRepository;
    private readonly boardsService;
    constructor(CardsRepository: Repository<Card>, boardsService: BoardsService);
    create(createCardDto: CreateCardDto, createBy: User): Promise<Card>;
    findAllByBoard(boardId: string, userId: string): Promise<Card[]>;
    findAllBySearch(search: string, userId: string): Promise<Card[]>;
    findOne(id: string, userId: string): Promise<Card>;
    update(id: string, updateCardDto: UpdateCardDto, userId: string): Promise<Card>;
    remove(id: string, userId: string): Promise<void>;
}
