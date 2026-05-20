import { AccessTokenResponseDto } from '../../security/dto/access-token-response.dto';
import { RefreshAccessTokenUseCase } from '../../security/usecase/refresh-access-token.usecase';
import { RefreshTokenDto } from '../../Users/dto/refresh-token.dto';
export declare class RefreshTokenUseCase {
    private readonly refreshAccessTokenUseCase;
    constructor(refreshAccessTokenUseCase: RefreshAccessTokenUseCase);
    execute(input: RefreshTokenDto): AccessTokenResponseDto;
}
