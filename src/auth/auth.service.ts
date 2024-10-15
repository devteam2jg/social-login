import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // 사용자 검증 로직 구현
    if (username === 'test' && password === 'password') {
      return { id: 1, username: 'test' };
    }
    return null;
  }

  async validateUserByJwt(payload: any): Promise<any> {
    // JWT를 통한 사용자 검증 로직 구현
    return { id: payload.sub, username: payload.username };
  }

  async validateOAuthLogin(profile: any, provider: string): Promise<any> {
    // 소셜 로그인 사용자 검증 로직 구현
    return { id: profile.id, username: profile.displayName, provider };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}