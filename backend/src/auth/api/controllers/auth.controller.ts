import { Body, Controller, Post } from '@nestjs/common';
import { SignInService, SignUpService } from '../../services';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from '../dtos';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from '@/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInService: SignInService,
    private readonly signUpService: SignUpService,
  ) {}

  @ApiCreatedResponse({
    description: 'The user has been successfully signed in',
    type: SignInResponseDto,
  })
  @ApiOperation({ summary: 'Sign in' })
  @Public()
  @Post('sign-in')
  async signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    return this.signInService.execute(signInRequestDto);
  }

  @ApiCreatedResponse({
    description: 'The user has been successfully signed up',
    type: SignUpResponseDto,
  })
  @ApiOperation({ summary: 'Sign up' })
  @Public()
  @Post('sign-up')
  async signUp(
    @Body() signUpRequestDto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    return this.signUpService.execute(signUpRequestDto);
  }
}
