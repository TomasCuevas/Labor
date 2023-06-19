import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from '../boards/dto';
import { Board } from '../boards/entities';
import { Card } from '../cards/entities';
import { User } from '../users/entities';
export declare class BoardsService {
    private readonly BoardsRepository;
    private readonly CardsRepository;
    constructor(BoardsRepository: Repository<Board>, CardsRepository: Repository<Card>);
    create(createBoardDto: CreateBoardDto, createBy: User): Promise<Board>;
    findAllOpenBoards(userId: string): Promise<Board[]>;
    findAllBySearch(search: string, userId: string): Promise<Board[]>;
    findOneById(boardId: string, userId: string): Promise<Board>;
    findOneByName(name: string, userId: string): Promise<Board>;
    findAllClosedBoards(userId: string): Promise<Board[]>;
    update(boardId: string, updateBoardDto: UpdateBoardDto, updateBy: User): Promise<Board>;
    delete(boardId: string, deleteBy: User): Promise<void>;
}
