import { Injectable } from '@nestjs/common';

//* services *//
import { BoardsService } from '../boards/boards.service';
import { TodosService } from '../todos/todos.service';

//* entities *//
import { Board } from '../boards/entities';
import { Todo } from '../todos/entities';

@Injectable()
export class SearchService {
  constructor(
    private readonly boardsServices: BoardsService,
    private readonly todosServices: TodosService,
  ) {}

  async findAll(
    search: string,
    userId: string,
  ): Promise<{ todos: Todo[]; boards: Board[] }> {
    const boards = await this.boardsServices.findAllBySearch(search, userId);
    const todos = await this.todosServices.findAllBySearch(search, userId);

    return {
      boards,
      todos,
    };
  }
}
