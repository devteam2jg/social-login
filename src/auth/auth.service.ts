import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { KakaoAuthDto } from './dto/kakao-auth.dto';

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

  async validateKakaoLogin(dto:KakaoAuthDto): Promise<any> {
    return { id: 1, username: 'test' };
  }

}