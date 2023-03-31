import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { BoardsController } from './boards.controller';

//* services *//
import { BoardsService } from './boards.service';

//* entities *//
import { Board } from './entities/board.entity';

//* modules *//
import { TodosModule } from '../todos/todos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TodosModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule, BoardsService],
})
export class BoardsModule {}
