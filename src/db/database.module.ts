import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from "src/profile/profile.entity";
import { User } from '../user/user.entity';
import { TextBlock } from "src/textblock/textblock.entity";
import { File } from "src/file/file.entity";


@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: "9001",
        database: 'omega',
        entities: [
          User,
          Profile,
          TextBlock,
          File,
        ],
        synchronize: true,
      }),
    ],
  })
  export class DatabaseModule {}