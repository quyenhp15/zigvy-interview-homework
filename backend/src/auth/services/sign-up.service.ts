import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpRequestDto, SignUpResponseDto } from '../api/dtos';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@/common/types';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/user/repositories';

@Injectable()
export class SignUpService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    signUpRequestDto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    const existingUser = await this.userRepository.findOne({
      email: signUpRequestDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const normalizedEmail = signUpRequestDto.email.trim().toLowerCase();
    const normalizedPassword = signUpRequestDto.password.trim();
    const hashedPassword = await bcrypt.hash(normalizedPassword, 10);

    const user = await this.userRepository.create({
      email: normalizedEmail,
      password: hashedPassword,
    });

    const payload: UserPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    return {
      email: user.email,
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
      }),
    };
  }
}
