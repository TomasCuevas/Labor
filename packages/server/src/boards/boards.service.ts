import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dtos *//
import { CreateBoardDto, UpdateBoardDto } from './dto';

//* entities *//
import { Board } from './entities';
import { User } from '../users/entities';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  //! create board service
  async create(createBoardDto: CreateBoardDto, createBy: User): Promise<Board> {
    const newBoard = await this.boardsRepository.create({
      ...createBoardDto,
      user: createBy,
    });

    return await this.boardsRepository.save(newBoard);
  }

  //! get all boards service
  async findAll(userId: string): Promise<Board[]> {
    return await this.boardsRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
