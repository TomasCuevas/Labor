import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { CardsController } from '@/cards//cards.controller';

//* services *//
import { CardsService } from '@/cards/cards.service';

//* entities *//
import { Card } from '@/cards/entities';

//* modules *//
import { BoardsModule } from '@/boards/boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => BoardsModule)],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [TypeOrmModule, CardsService],
})
export class CardsModule {}
