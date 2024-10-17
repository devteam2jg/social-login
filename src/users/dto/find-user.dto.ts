import { IsString , IsNumber} from "class-validator";


export class FindBySocialIdDto{
    @IsString()
    socialId: string;
    @IsString()
    socialType: string;
}

export class FindByIdDto{
    @IsNumber()
    id: number;
}