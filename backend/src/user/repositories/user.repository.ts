import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities';

type FindOneUserParams = {
  email?: string;
  id?: string;
};

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<UserDocument> {
    const created = new this.userModel(user);
    return created.save();
  }

  async findOne(params: FindOneUserParams): Promise<UserDocument | null> {
    const query: Partial<{ email: string; _id: string }> = {};

    if (params.email) {
      query.email = params.email;
    }
    if (params.id) {
      query._id = params.id;
    }

    return this.userModel.findOne(query).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
