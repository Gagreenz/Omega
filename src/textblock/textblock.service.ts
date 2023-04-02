import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TextBlock } from './textblock.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TextBlockService {
    constructor(
        @InjectRepository(TextBlock)
        private readonly textBlockRepository: Repository<TextBlock>,
        private readonly fileService: FileService,
    ) {}

  async findAll(group?: string): Promise<TextBlock[]> {
    const options: FindManyOptions<TextBlock> = {};
    if (group) {
      options.where = { group };
    }
    return this.textBlockRepository.find(options);
  }

  async findOne(id: number): Promise<TextBlock> {
    return this.textBlockRepository.findOne({where:{id}});
  }

  async create(textBlock: TextBlock): Promise<TextBlock> {
    return this.textBlockRepository.save(textBlock);
  }

  async update(id: number, textBlock: TextBlock): Promise<TextBlock> {
    await this.textBlockRepository.update(id, textBlock);
    return this.textBlockRepository.findOne({where:{id}});
  }

  async delete(id: number): Promise<void> {
    await this.textBlockRepository.delete(id);
  }
}