import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DataService } from './data.service';

@ApiTags('datasets')
@ApiBearerAuth()
@Controller('data')
@UseGuards(AuthGuard('jwt'))
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('upload/:projectId')
  @ApiOperation({ summary: 'Upload CSV/Excel file' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('projectId') projectId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    return { message: 'File upload - To be implemented' };
  }

  @Get('datasets/:projectId')
  @ApiOperation({ summary: 'Get all datasets for a project' })
  async findAll(@Param('projectId') projectId: string) {
    return { message: 'Get datasets - To be implemented' };
  }

  @Get('dataset/:id')
  @ApiOperation({ summary: 'Get dataset details' })
  async findOne(@Param('id') id: string) {
    return { message: 'Get dataset details - To be implemented' };
  }

  @Get('dataset/:id/preview')
  @ApiOperation({ summary: 'Preview dataset (first 100 rows)' })
  async preview(@Param('id') id: string) {
    return { message: 'Dataset preview - To be implemented' };
  }

  @Delete('dataset/:id')
  @ApiOperation({ summary: 'Delete dataset' })
  async delete(@Param('id') id: string) {
    return { message: 'Delete dataset - To be implemented' };
  }

  @Post('dataset/:id/export')
  @ApiOperation({ summary: 'Export dataset to CSV/Excel' })
  async export(@Param('id') id: string) {
    return { message: 'Export dataset - To be implemented' };
  }
}
