import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { User } from '../entities';

@Injectable()
export class FindAllUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
