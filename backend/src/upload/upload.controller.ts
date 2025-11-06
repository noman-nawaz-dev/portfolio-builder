import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Controller('upload')
@UseGuards(GqlAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const url = await this.uploadService.uploadSingleImage(file);
    return { url };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images', 10)) // Max 10 images
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ urls: string[] }> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const urls = await this.uploadService.uploadMultipleImages(files);
    return { urls };
  }

  @Post('resume')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No resume file uploaded');
    }

    const url = await this.uploadService.uploadResume(file);
    return { url };
  }

  @Delete('delete')
  async deleteImage(
    @Body('imageUrl') imageUrl: string,
  ): Promise<{ success: boolean; message: string }> {
    if (!imageUrl) {
      throw new BadRequestException('Image URL is required');
    }

    await this.uploadService.deleteImage(imageUrl);
    return { success: true, message: 'Image deleted successfully' };
  }

  @Delete('delete-resume')
  async deleteResume(
    @Body('resumeUrl') resumeUrl: string,
  ): Promise<{ success: boolean; message: string }> {
    if (!resumeUrl) {
      throw new BadRequestException('Resume URL is required');
    }

    await this.uploadService.deleteResume(resumeUrl);
    return { success: true, message: 'Resume deleted successfully' };
  }
}
