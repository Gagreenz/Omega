import { Controller, Get, Post, Put, Delete, Body, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TextBlock } from './textblock.entity';
import { TextBlockService } from './textblock.service';
import { Roles } from 'src/auth/strategies/roles.decorator';
import { AuthGuard } from "@nestjs/passport";
import { Role } from 'src/roles';
import { FileService } from 'src/file/file.service';


@Controller('textblocks')
export class TextBlockController {
  constructor(
    private textBlockService: TextBlockService,
    private fileService: FileService
    ) {}

  @Get('getAll')
  findAll(group?: string): Promise<TextBlock[]> {
    if (group) {
      return this.textBlockService.findAll(group);
    } else {
      return this.textBlockService.findAll();
    }
  }

  @Get('getById')
  findOne(@Query('id') id: number): Promise<TextBlock> {
    return this.textBlockService.findOne(id);
  }

  @Post(`create`)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() textBlock: TextBlock): Promise<TextBlock> {
    const saved = await this.textBlockService.create(textBlock); 
    const createdFile = await this.fileService.save(file,textBlock.title,saved.id);
    saved.image = createdFile;
    return this.textBlockService.create(saved);
  }

  @Put('update')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(`jwt`))
  update(@Query('id') id: number, @Body() textBlock: TextBlock): Promise<TextBlock> {
    return this.textBlockService.update(id, textBlock);
  }

  @Delete('delete')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(`jwt`))
  delete(@Query('id') id: number): Promise<void> {
    this.fileService.clearIdFromTextBlock(id);
    return this.textBlockService.delete(id);
  }

}