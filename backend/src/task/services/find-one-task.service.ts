import { Injectable } from '@nestjs/common';
import { TaskDocument } from '../entitties';
import { TaskRepository } from '../repositories';

interface FindOneTaskServiceParams {
  id?: string;
}

@Injectable()
export class FindOneTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    params: FindOneTaskServiceParams,
  ): Promise<TaskDocument | null> {
    return this.taskRepository.findOne(params);
  }
}
