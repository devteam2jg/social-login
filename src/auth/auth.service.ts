import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // 사용자 검증 로직 구현
    // 실제로는 데이터베이스에서 사용자 정보를 조회하고 비밀번호를 검증해야 합니다.
    if (username === 'test' && password === 'password') {
      return { id: 1, username: 'test' }; // 예시 사용자 반환
    }
    return null;
  }


  async validateOAuthLogin(profile: any, provider: string): Promise<any> {
    // 소셜 로그인 사용자 검증 로직 구현
    // 실제로는 데이터베이스에서 사용자 정보를 조회하거나 새로 생성해야 합니다.
    return { id: profile.id, username: profile.displayName, provider }; // 예시 사용자 반환
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}