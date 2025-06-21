import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import dbConfig from './config/db.config';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseMappingInterceptor } from './common/interceptors';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { JwtAuthGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [dbConfig, jwtConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
        dbName: configService.get<string>('mongo.dbName'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMappingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
