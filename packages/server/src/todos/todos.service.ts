import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dtos *//
import { CreateTodoDto, UpdateTodoDto } from './dto';

//* services *//
import { BoardsService } from '../boards/boards.service';

//* entities *//
import { Todo } from './entities';
import { User } from '../users/entities';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly TodoReposity: Repository<Todo>,
    private readonly boardsService: BoardsService,
  ) {}

  //! create todo [service]
  async create(createTodoDto: CreateTodoDto, createBy: User): Promise<Todo> {
    const { boardId, ...rest } = createTodoDto;

    const board = await this.boardsService.findOneById(boardId, createBy.id);
    if (!board) {
      throw new BadRequestException([
        'El tablero al que intenta agregar la tarjeta no existe.',
      ]);
    }

    const todo = await this.TodoReposity.create({
      ...rest,
      board: { id: boardId },
      user: createBy,
    });

    return await this.TodoReposity.save(todo);
  }

  //! find all todos by board [service]
  async findAllByBoard(boardId: string, userId: string): Promise<Todo[]> {
    return await this.TodoReposity.findBy({
      board: { id: boardId, user: { id: userId } },
      user: { id: userId },
    });
  }

  //! find one todo by id [service]
  async findOne(id: string, userId: string): Promise<Todo> {
    console.log('hola');
    const todo = await this.TodoReposity.findOneBy({
      id,
      user: { id: userId },
    });
    if (!todo) {
      throw new NotFoundException(`Todo con el id: ${id} no fue encontrado.`);
    }

    return todo;
  }

  //! update todo [service]
  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    userId: string,
  ): Promise<Todo> {
    await this.findOne(id, userId);
    const { boardId, ...rest } = updateTodoDto;

    const todo = await this.TodoReposity.preload({
      ...rest,
      id,
    });

    return await this.TodoReposity.save(todo);
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
