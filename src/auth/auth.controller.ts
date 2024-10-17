import { Controller, Get, Req, Res, UseGuards,Render, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoOAuthGuard } from './guards/kakao-auth.guard';
import { Request } from '@nestjs/common';
import { UserDataDto } from 'src/users/dto/user.dto';
import { KakaoProfileDto } from './dto/social-profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


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

  
  @Get('test')
  @UseGuards(JwtAuthGuard)
  getTestPage() {
    return 'test';
  }
  /*
    사용자가 접근하는 endpoint입니다.
  */
  @UseGuards(KakaoOAuthGuard)
  @Get('kakao')
  async kakaoLogin(@Req() req: Request) {
    return;
  }

  /*
    카카오 인증서버에 의해 접근되는 endpoint입니다.
  */
  @UseGuards(KakaoOAuthGuard)
  @Get('kakao/callback')
  async kakaoLoginCallback(@Req() req, @Res() res) {
    // 카카오 인증 완료 후 로그인 처리
    const kakaoProfile:KakaoProfileDto = req.user;
    let user: UserDataDto;
    if (!kakaoProfile) {
      throw new UnauthorizedException();
    }
    try {
      user = await this.authService.validateSocialUser(kakaoProfile);
      if (!user) {
        user = await this.authService.createSocialUser(kakaoProfile);
      }
      const accessToken = await this.authService.login(user);

      // 여기가 문제 생길 포인트
      const redirectUrl = '/';
      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.redirect(redirectUrl);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}