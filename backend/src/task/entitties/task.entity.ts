import { TaskStatus } from '@/common/enums';
import { transformMongooseEntity } from '@/common/helpers';
import { UserDocument } from '@/user/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'tasks',
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status?: TaskStatus;

  @Prop({
    type: Date,
    default: null,
  })
  dueDate?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner?: UserDocument;
}

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);

transformMongooseEntity(TaskSchema);
