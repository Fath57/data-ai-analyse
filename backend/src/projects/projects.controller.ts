import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects for current user' })
  async findAll(@Req() req: any) {
    return { message: 'Get all projects - To be implemented' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  async findOne(@Param('id') id: string) {
    return { message: 'Get project by ID - To be implemented' };
  }

  @Post()
  @ApiOperation({ summary: 'Create new project' })
  async create(@Body() createDto: any, @Req() req: any) {
    return { message: 'Create project - To be implemented' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return { message: 'Update project - To be implemented' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  async delete(@Param('id') id: string) {
    return { message: 'Delete project - To be implemented' };
  }

  @Post(':id/share')
  @ApiOperation({ summary: 'Generate share link for project' })
  async share(@Param('id') id: string) {
    return { message: 'Share project - To be implemented' };
  }
}
