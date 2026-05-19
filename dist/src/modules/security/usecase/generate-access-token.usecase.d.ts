import { ConfigService } from '@nestjs/config';
import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { GenerateAccessTokenDto } from '../dto/generate-access-token.dto';
export declare class GenerateAccessTokenUseCase {
    private readonly configService;
    constructor(configService: ConfigService);
    execute(input: GenerateAccessTokenDto): AccessTokenResponseDto;
}
