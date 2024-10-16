import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { AuthController } from './auth.controller';
import { JwtModule} from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule. register({ 
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  providers: [AuthService,
      KakaoStrategy
    ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}