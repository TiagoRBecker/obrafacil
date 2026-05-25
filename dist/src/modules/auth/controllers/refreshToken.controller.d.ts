import { RefreshTokenUseCase } from '../usecase/refresh-token.usecase';
import { AccessTokenResponseDto } from '../../security/dto/access-token-response.dto';
export declare class RefreshTokenController {
    private readonly refreshTokenUseCase;
    constructor(refreshTokenUseCase: RefreshTokenUseCase);
    refreshToken(body: any): AccessTokenResponseDto;
}
