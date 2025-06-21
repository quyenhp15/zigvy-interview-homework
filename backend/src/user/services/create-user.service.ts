import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserDocument } from '../entities';

interface CreateUserServiceParams {
  email: string;
  password: string;
}

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: CreateUserServiceParams): Promise<UserDocument> {
    const existingUser = await this.userRepository.findOne({
      email: params.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    return this.userRepository.create({
      email: params.email,
      password: params.password,
    });
  }
}
