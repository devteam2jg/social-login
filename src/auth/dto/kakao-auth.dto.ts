import { IsString,IsNumber } from "class-validator";


export class KakaoAuthDto {
    @IsString()
    accessToken: string;
    @IsString()
    refreshToken: string;
    @IsNumber()
    expiresIn: number;
    @IsNumber()
    refreshTokenExpiresIn: number;

    constructor(accessToken: string, refreshToken: string, expiresIn: number, refreshTokenExpiresIn: number) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    }
}