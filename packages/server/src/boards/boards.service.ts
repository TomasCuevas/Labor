import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dtos *//
import { CreateBoardDto } from './dto';

//* entities *//
import { Board } from './entities';
import { User } from '../users/entities';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  //! create board [service]
  async create(createBoardDto: CreateBoardDto, createBy: User): Promise<Board> {
    const newBoard = await this.boardsRepository.create({
      ...createBoardDto,
      user: createBy,
    });

    return await this.boardsRepository.save(newBoard);
  }

  //! get all boards by user [service]
  async findAll(userId: string): Promise<Board[]> {
    return await this.boardsRepository.find({
      where: { user: { id: userId } },
    });
  }

  //! get all boards by search [service]
  async findAllBySearch(search: string, userId: string): Promise<Board[]> {
    return this.boardsRepository
      .createQueryBuilder()
      .where(`"userId" = :userId`, { userId })
      .andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      })
      .getMany();
  }

  //! get one board by id [service]
  async findOneById(boardId: string, userId: string): Promise<Board> {
    return await this.boardsRepository.findOne({
      where: { id: boardId, user: { id: userId } },
    });
  }

  //! get board by name [service]
  async findOneByName(name: string, userId: string): Promise<Board> {
    return await this.boardsRepository.findOne({
      where: { user: { id: userId }, name: name },
    });
  }
}
