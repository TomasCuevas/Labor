import { BoardsService } from '../boards/boards.service';
import { CardsService } from '../cards/cards.service';
import { CreateBoardDto, UpdateBoardDto } from './dto';
import { Board } from './entities';
import { Card } from '../cards/entities';
import { User } from '../users/entities';
export declare class BoardsController {
    private readonly boardsService;
    private readonly cardsService;
    constructor(boardsService: BoardsService, cardsService: CardsService);
    create(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    findAllOpenBoards(user: User): Promise<Board[]>;
    findOne(name: string, user: User): Promise<Board>;
    findAllClosedBoards(user: User): Promise<Board[]>;
    findAllTodos(boardId: string, user: User): Promise<Card[]>;
    update(id: string, updateBoardDto: UpdateBoardDto, user: User): Promise<Board>;
    delete(id: string, user: User): Promise<void>;
}
