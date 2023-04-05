import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//* modules *//
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl:
        process.env.STAGE === 'prod'
          ? {
              rejectUnauthorized: false,
              sslmode: 'require',
            }
          : (false as any),
    }),

    AuthModule,
    BoardsModule,
    UsersModule,
    TodosModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
