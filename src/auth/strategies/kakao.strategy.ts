import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      clientSecret:configService.get('KAKAO_CLIENT_SECRET'),
      callbackURL:configService.get('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    // 이분기에 도달한 순간에는 이미 카카오로부터 인증이 완료된 상태
    const user = await this.authService.validateKakaoLogin(profile);
    console.log('Redirecting to validate callback');
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}