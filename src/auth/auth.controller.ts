import { Controller, Get, Render, Request, Post, UseGuards, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoOAuthGuard } from './guards/kakao-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('login')
  getLoginPage() {
    return;
  }
  
  @Get('terms')
  @Render('terms')
  getTermsPage() {
    return;
  }

  @Get('kakao')
  @UseGuards(KakaoOAuthGuard)
  async kakaoLogin() {
    // 이 분기 도달한 순간 카카오 로그인 페이지로 리다이렉트
    return ;
  }

  @Get('kakao/callback')
  @UseGuards(KakaoOAuthGuard)
  async kakaoLoginCallback(@Req() req, @Query('code') code:string) {
    // 이 분기에 도달한 순간 카카오로부터 인증이 완료된 상태
    //TODO: 로그인 or 회원가입 처리
    const kakaoUser = req.user;

  //   // 사용자 정보 확인
  //   const user = await this.authService.findUserByKakaoId(kakaoUser.id);

  //   if (!user) {
  //     // 회원가입 처리
  //     const newUser = await this.authService.registerUser(kakaoUser);
  //     return this.authService.login(newUser);
  //   } else {
  //     // 로그인 처리
  //     return this.authService.login(user);
  //   }
  // }
  }
}