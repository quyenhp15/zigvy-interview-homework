import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInRequestDto, SignInResponseDto } from '../api/dtos';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@/common/types';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/user/repositories';

@Injectable()
export class SignInService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    const user = await this.userRepository.findOne({
      email: signInRequestDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInRequestDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: UserPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
      }),
    };
  }
}
