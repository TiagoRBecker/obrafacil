import { ConfigService } from '@nestjs/config';
import { GenerateRefreshTokenDto } from '../dto/generate-refresh-token.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
export declare class GenerateRefreshTokenUseCase {
    private readonly configService;
    constructor(configService: ConfigService);
    execute(input: GenerateRefreshTokenDto): RefreshTokenResponseDto;
}
