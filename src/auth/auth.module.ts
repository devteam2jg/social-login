import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { AuthController } from './auth.controller';
import { JwtModule} from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({ 
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],  
    }),
  ],
  providers: [
      AuthService,
      KakaoStrategy,
      JwtStrategy
    ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}