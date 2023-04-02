import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlock } from './textblock.entity';
import { TextBlockController } from './textblock.controller';
import { TextBlockService } from './textblock.service';
import { DatabaseModule } from 'src/db/database.module';
import { FileService } from 'src/file/file.service';
import { File } from 'src/file/file.entity';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([TextBlock]),
        TypeOrmModule.forFeature([File])
    ],
    controllers: [TextBlockController],
    providers: [TextBlockService,FileService],
    exports: [TextBlockService]
})
export class TextBlockModule {}