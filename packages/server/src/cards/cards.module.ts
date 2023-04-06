import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { CardsController } from './cards.controller';

//* services *//
import { CardsService } from './cards.service';

//* entities *//
import { Card } from './entities';

//* modules *//
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => BoardsModule)],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [TypeOrmModule, CardsService],
})
export class CardsModule {}
