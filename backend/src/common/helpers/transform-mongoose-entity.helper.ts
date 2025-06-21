import { Schema, Types } from 'mongoose';

export function transformMongooseEntity<T = any>(schema: Schema<T>): void {
  schema.set('toJSON', {
    virtuals: true,
    transform: (_doc, ret) => {
      ret.id = (ret._id as Types.ObjectId).toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
}
