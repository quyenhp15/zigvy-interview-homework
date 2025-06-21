import { Module } from '@nestjs/common';
import { TaskRepository } from './repositories';
import { Task, TaskSchema } from './entitties';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateTaskService,
  FindAllTaskService,
  FindOneTaskService,
} from './services';
import { TaskController } from './api/controllers';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
  ],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    CreateTaskService,
    FindOneTaskService,
    FindAllTaskService,
  ],
  exports: [TaskRepository],
})
export class TaskModule {}
