import { Module } from '@nestjs/common';

//* controllers *//
import { SearchController } from '@/search/search.controller';

//* services *//
import { SearchService } from '@/search/search.service';

//* modules *//
import { BoardsModule } from '@/boards/boards.module';
import { CardsModule } from '@/cards/cards.module';

@Module({
  imports: [CardsModule, BoardsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
