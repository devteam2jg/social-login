import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      /* cookie에 담긴 토큰을 추출 */
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['accessToken'];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload:any) {
    const test: JwtPayloadDto = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      socialType: payload.socialType,
    }
    return this.authService.validateUser(test);
  }
}