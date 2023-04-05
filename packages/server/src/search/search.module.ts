import { Module } from '@nestjs/common';

//* controllers *//
import { SearchController } from './search.controller';

//* services *//
import { SearchService } from './search.service';

//* modules *//
import { TodosModule } from '../todos/todos.module';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TodosModule, BoardsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
