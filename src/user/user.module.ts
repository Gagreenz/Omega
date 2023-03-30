import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [DatabaseModule,TypeOrmModule.forFeature([User])],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {}