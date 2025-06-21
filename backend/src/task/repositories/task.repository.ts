import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../entitties';

type FindOneTaskParams = {
  id?: string;
};

type FindAllTaskParams = {
  ownerId?: string;
};

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(task: Task): Promise<TaskDocument> {
    const created = new this.taskModel(task);
    return created.save();
  }

  async findOne(params: FindOneTaskParams): Promise<TaskDocument | null> {
    return this.taskModel
      .findOne({
        _id: params.id,
      })
      .exec();
  }

  async findAll(params: FindAllTaskParams): Promise<TaskDocument[]> {
    const query: Partial<{ owner: Types.ObjectId }> = {};
    if (params.ownerId) {
      query.owner = new Types.ObjectId(params.ownerId);
    }

    return this.taskModel.find(query).populate('owner').exec();
  }
}
