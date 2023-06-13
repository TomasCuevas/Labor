import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dtos *//
import { CreateCardDto, UpdateCardDto } from '../cards/dto';

//* services *//
import { BoardsService } from '../boards/boards.service';

//* entities *//
import { Card } from '../cards/entities';
import { User } from '../users/entities';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private readonly CardsRepository: Repository<Card>,
    private readonly boardsService: BoardsService,
  ) {}

  //! create card [service]
  async create(createCardDto: CreateCardDto, createBy: User): Promise<Card> {
    const { boardId, ...rest } = createCardDto;

    const board = await this.boardsService.findOneById(boardId, createBy.id);
    if (!board) {
      throw new BadRequestException([
        'El tablero en el que intenta agregar la tarjeta, no existe.',
      ]);
    }

    const card = await this.CardsRepository.create({
      ...rest,
      board: { id: boardId },
      user: createBy,
    });

    return await this.CardsRepository.save(card);
  }

  //! find all cards by board [service]
  async findAllByBoard(boardId: string, userId: string): Promise<Card[]> {
    return await this.CardsRepository.findBy({
      board: { id: boardId, user: { id: userId } },
      user: { id: userId },
    });
  }

  //! find all cards by search [service]
  async findAllBySearch(search: string, userId: string): Promise<Card[]> {
    return this.CardsRepository.createQueryBuilder('card')
      .innerJoinAndSelect('card.board', 'board')
      .innerJoinAndSelect('card.user', 'user')
      .where('card.userId = :userId', { userId })
      .andWhere('LOWER(card.title) like :title', {
        title: `%${search.toLowerCase()}%`,
      })
      .getMany();
  }

  //! find one card by id [service]
  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.CardsRepository.findOneBy({
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

    const card = await this.CardsRepository.preload({
      ...rest,
      id,
    });

    return await this.CardsRepository.save(card);
  }

  //! remove card [service]
  async remove(id: string, userId: string): Promise<void> {
    const card = await this.findOne(id, userId);
    await this.CardsRepository.remove(card);

    return;
  }
}
