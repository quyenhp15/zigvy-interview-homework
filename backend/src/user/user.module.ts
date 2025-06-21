import { Module } from '@nestjs/common';
import { UserRepository } from './repositories';
import {
  CreateUserService,
  FindAllUserService,
  FindOneUserService,
} from './services';
import { User, UserSchema } from './entities';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CreateUserService,
    UserRepository,
    FindOneUserService,
    FindAllUserService,
  ],
  exports: [UserRepository],
})
export class UserModule {}
