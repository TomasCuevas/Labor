import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dtos *//
import { CreateCardDto, UpdateCardDto } from './dto';

//* services *//
import { BoardsService } from '../boards/boards.service';

//* entities *//
import { Card } from './entities';
import { User } from '../users/entities';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private readonly CardReposity: Repository<Card>,
    private readonly boardsService: BoardsService,
  ) {}

  //! create card [service]
  async create(createCardDto: CreateCardDto, createBy: User): Promise<Card> {
    const { boardId, ...rest } = createCardDto;

    const board = await this.boardsService.findOneById(boardId, createBy.id);
    if (!board) {
      throw new BadRequestException([
        'El tablero al que intenta agregar la tarjeta no existe.',
      ]);
    }

    const card = await this.CardReposity.create({
      ...rest,
      board: { id: boardId },
      user: createBy,
    });

    return await this.CardReposity.save(card);
  }

  //! find all cards by board [service]
  async findAllByBoard(boardId: string, userId: string): Promise<Card[]> {
    return await this.CardReposity.findBy({
      board: { id: boardId, user: { id: userId } },
      user: { id: userId },
    });
  }

  //! find all cards by search [service]
  async findAllBySearch(search: string, userId: string): Promise<Card[]> {
    return this.CardReposity.createQueryBuilder()
      .where(`"userId" = :userId`, { userId })
      .andWhere('LOWER(title) like :title', {
        title: `%${search.toLowerCase()}%`,
      })
      .getMany();
  }

  //! find one card by id [service]
  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.CardReposity.findOneBy({
      id,
      user: { id: userId },
    });
    if (!card) {
      throw new NotFoundException(`Todo con el id: ${id} no fue encontrado.`);
    }

    return card;
  }

  //! update card [service]
  async update(
    id: string,
    updateCardDto: UpdateCardDto,
    userId: string,
  ): Promise<Card> {
    await this.findOne(id, userId);
    const { boardId, ...rest } = updateCardDto;

    const card = await this.CardReposity.preload({
      ...rest,
      id,
    });

    return await this.CardReposity.save(card);
  }

  //! remove card [service]
  async remove(id: string, userId: string): Promise<void> {
    const card = await this.findOne(id, userId);
    await this.CardReposity.remove(card);

    return;
  }
}
