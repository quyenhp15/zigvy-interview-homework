import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserDocument } from '../entities';

interface FindOneUserServiceParams {
  email: string;
}

@Injectable()
export class FindOneUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    params: FindOneUserServiceParams,
  ): Promise<UserDocument | null> {
    return this.userRepository.findOne({
      email: params.email,
    });
  }
}
