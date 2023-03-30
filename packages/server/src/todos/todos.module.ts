import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { TodosController } from './todos.controller';

//* services *//
import { TodosService } from './todos.service';

//* entities *//
import { Todo } from './entities';

//* modules *//
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => BoardsModule)],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TypeOrmModule, TodosService],
})
export class TodosModule {}
