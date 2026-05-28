import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateRefreshTokenDto } from '../dto/generate-refresh-token.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
export declare class GenerateRefreshTokenUseCase {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    execute(input: GenerateRefreshTokenDto): RefreshTokenResponseDto;
}
