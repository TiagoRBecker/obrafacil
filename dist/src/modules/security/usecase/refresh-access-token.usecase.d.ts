import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { RefreshAccessTokenDto } from '../dto/refresh-access-token.dto';
export declare class RefreshAccessTokenUseCase {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    execute(input: RefreshAccessTokenDto): AccessTokenResponseDto;
}
