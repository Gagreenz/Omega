import { Controller, Post, UseInterceptors, UploadedFile,Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import multer from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() body: any) {
    console.log(file);
    const { essenceTable, essenceId } = body;
    return this.fileService.save(file, essenceTable, essenceId);
  }
  
  @Delete()
  async deleteUnusedFiles() {
    return this.fileService.deleteUnusedFiles();
  }

}