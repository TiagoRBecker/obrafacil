import { JwtService } from '@nestjs/jwt';
import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { GenerateAccessTokenDto } from '../dto/generate-access-token.dto';
export declare class GenerateAccessTokenUseCase {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    execute(input: GenerateAccessTokenDto): AccessTokenResponseDto;
}
