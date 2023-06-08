import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { BoardsController } from '@/boards/boards.controller';

//* services *//
import { BoardsService } from '@/boards/boards.service';

//* entities *//
import { Board } from '@/boards/entities';

//* modules *//
import { CardsModule } from '@/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), forwardRef(() => CardsModule)],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule, BoardsService],
})
export class BoardsModule {}
