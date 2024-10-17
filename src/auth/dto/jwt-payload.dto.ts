import { IsString, IsNumber } from 'class-validator';

export class JwtPayloadDto{
    @IsNumber()
    id: number;
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    socialType: string;
}