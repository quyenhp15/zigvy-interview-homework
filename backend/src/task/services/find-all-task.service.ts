import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { TaskDocument } from '../entitties';

interface FindAllTaskServiceParams {
  ownerId?: string;
}

@Injectable()
export class FindAllTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params: FindAllTaskServiceParams): Promise<TaskDocument[]> {
    return this.taskRepository.findAll(params);
  }
}
