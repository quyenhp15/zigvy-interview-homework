import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './api/controllers';
import { SignUpService, SignInService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessTokenSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [SignInService, SignUpService],
  exports: [JwtModule],
})
export class AuthModule {}
