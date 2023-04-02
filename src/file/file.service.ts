import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import multer from 'multer';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async save(file: multer.File, essenceTable?: string, essenceId?: number): Promise<File> {
    const newFile = new File();
    newFile.filename = file.originalname;
    newFile.mimetype = file.mimetype;
    newFile.size = file.size;
    newFile.createdAt = new Date();
    newFile.essenceTable = essenceTable;
    newFile.essenceId = essenceId;

    return this.fileRepository.save(newFile);
  }

  async deleteUnusedFiles() {
    const filesToDelete = await this.fileRepository
      .createQueryBuilder('file')
      // удалить файлы старше часа
      .where('file.createdAt < :date', { date: new Date(Date.now() - 3600000) }) 
      .andWhere('file.essenceTable IS NULL')
      .andWhere('file.essenceId IS NULL')
      .getMany();

    await Promise.all(filesToDelete.map((file) => this.delete(file)));
  }

  async delete(file: File) {
    return this.fileRepository.delete(file.id);
  }

  async clearIdFromTextBlock(blockId: number): Promise<void>{
    const files = await this.fileRepository.find({where:{ essenceId: blockId }})
    files.forEach(file => {
        file.essenceId = null;
        file.essenceTable = null;
        this.fileRepository.save(file);
    });

  }
}