import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { TaskDocument } from '../entitties';
import { TaskStatus } from '@/common/enums';
import { UserRepository } from '@/user/repositories';

interface CreateTaskServiceParams {
  title: string;
  description: string;
  status?: TaskStatus;
  dueDate?: Date;
  ownerId?: string;
}

@Injectable()
export class CreateTaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: CreateTaskServiceParams): Promise<TaskDocument> {
    const owner = await this.userRepository.findOne({
      id: params.ownerId,
    });

    return this.taskRepository.create({
      title: params.title,
      description: params.description,
      status: params.status,
      dueDate: params.dueDate,
      owner: owner ?? undefined,
    });
  }
}
