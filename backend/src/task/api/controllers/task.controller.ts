import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateTaskService,
  FindAllTaskService,
  FindOneTaskService,
} from '../../services';
import { CreateTaskRequestDto, FindAllTaskRequestDto } from '../dtos';
import { ApiAuth } from '@/common/decorators';

@ApiAuth()
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly findOneTaskService: FindOneTaskService,
    private readonly findAllTaskService: FindAllTaskService,
  ) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskRequestDto) {
    return this.createTaskService.execute(createTaskDto);
  }

  @Get(':id')
  async findOneTask(@Param('id') id: string) {
    return this.findOneTaskService.execute({ id });
  }

  @Get()
  async findAllTasks(@Query() findAllTaskDto: FindAllTaskRequestDto) {
    return this.findAllTaskService.execute({
      ...findAllTaskDto,
    });
  }
}
