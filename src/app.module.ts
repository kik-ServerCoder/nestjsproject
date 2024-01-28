import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultantModule } from './consultant/consultant.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'condatabase',
    autoLoadEntities: true,
    synchronize: true,
    } ),ConsultantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
