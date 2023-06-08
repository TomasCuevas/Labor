import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dtos *//
import { CreateBoardDto, UpdateBoardDto } from '@/boards/dto';

//* entities *//
import { Board } from '@/boards/entities';
import { Card } from '@/cards/entities';
import { User } from '@/users/entities';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly BoardsRepository: Repository<Board>,
    @InjectRepository(Card) private readonly CardsRepository: Repository<Card>,
  ) {}

  //! create board [service]
  async create(createBoardDto: CreateBoardDto, createBy: User): Promise<Board> {
    const newBoard = await this.BoardsRepository.create({
      ...createBoardDto,
      user: createBy,
    });

    return await this.BoardsRepository.save(newBoard);
  }

  //! get all open boards by user [service]
  async findAllOpenBoards(userId: string): Promise<Board[]> {
    return await this.BoardsRepository.findBy({
      user: { id: userId },
      status: 'open',
    });
  }

  //! get all boards by search [service]
  async findAllBySearch(search: string, userId: string): Promise<Board[]> {
    return this.BoardsRepository.createQueryBuilder('board')
      .innerJoinAndSelect('board.user', 'user')
      .where('board.userId = :userId', { userId })
      .andWhere('LOWER(board.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      })
      .getMany();
  }

  //! get one board by id [service]
  async findOneById(boardId: string, userId: string): Promise<Board> {
    return await this.BoardsRepository.findOneBy({
      id: boardId,
      user: { id: userId },
    });
  }

  //! get board by name [service]
  async findOneByName(name: string, userId: string): Promise<Board> {
    return await this.BoardsRepository.findOneBy({
      user: { id: userId },
      name: name,
    });
  }

  //! get all closed boards [service]
  async findAllClosedBoards(userId: string): Promise<Board[]> {
    return await this.BoardsRepository.findBy({
      user: { id: userId },
      status: 'closed',
    });
  }

  //! update board [service]
  async update(
    boardId: string,
    updateBoardDto: UpdateBoardDto,
    updateBy: User,
  ): Promise<Board> {
    await this.findOneById(boardId, updateBy.id);

    const board = await this.BoardsRepository.preload({
      ...updateBoardDto,
      id: boardId,
    });

    return await this.BoardsRepository.save({ ...board, user: updateBy });
  }

  //! delete board [service]
  async delete(boardId: string, deleteBy: User): Promise<void> {
    await this.CardsRepository.delete({
      board: { id: boardId },
      user: { id: deleteBy.id },
    });

    const board = await this.findOneById(boardId, deleteBy.id);
    await this.BoardsRepository.remove(board);

    return;
  }
}
