import { ConfigService } from '@nestjs/config';
import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { RefreshAccessTokenDto } from '../dto/refresh-access-token.dto';
export declare class RefreshAccessTokenUseCase {
    private readonly configService;
    constructor(configService: ConfigService);
    execute(input: RefreshAccessTokenDto): AccessTokenResponseDto;
}
