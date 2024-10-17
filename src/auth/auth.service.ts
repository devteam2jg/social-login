import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SocialProfileDto } from './dto/social-profile.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UserDataDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user:UserDataDto) {
    const payload:JwtPayloadDto = { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      socialType: user.socialType
     };
    return this.jwtService.sign(payload);
  }
  async createSocialUser(profile: SocialProfileDto){
    return this.usersService.create({
      name: profile.name,
      password: '!@#$!$%@#',
      email: profile.email,
      socialId: profile.socialId,
      socialType: profile.socialType,
    });
  }
  
  async validateSocialUser(profile: SocialProfileDto){
    const user:UserDataDto = await this.usersService.findBySocialId({
      socialId: profile.socialId, 
      socialType: profile.socialType
    });
    if(!user)
      throw new UnauthorizedException();
    return user;
  }
  async validateUser(payload: JwtPayloadDto) {
    const user:UserDataDto = await this.usersService.findById({
      id: payload.id
    });
    if(!user)
      throw new UnauthorizedException();
    return user;
  }
}