import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { File } from './file.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports: [
      TypeOrmModule.forFeature([File]),
      MulterModule.register({
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg'
          ) {
            cb(null, true);
          } else {
            cb(new Error('Only JPEG and PNG files are allowed!'), false);
          }
        },
      }),
    ],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService],
  })
  export class FileModule {}
  