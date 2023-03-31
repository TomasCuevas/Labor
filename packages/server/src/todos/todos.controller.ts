import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* services *//
import { TodosService } from './todos.service';

//* dtos *//
import { CreateTodoDto, UpdateTodoDto } from './dto';

//* decorators *//
import { GetUser } from 'src/auth/decorators';

//* entities *//
import { Todo } from './entities';
import { User } from '../users/entities';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  //! create todo [controller]
  @Post('create')
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.create(createTodoDto, user);
  }

  //! find one todo by id [controller]
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.todosService.findOne(id, user.id);
  }

  //! update todo [controller]
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto, user.id);
  }

  //! remove todo [controller]
  @Delete('delete/:id')
  async remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.todosService.remove(id, user.id);
  }
}
