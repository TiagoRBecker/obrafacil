import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
export declare class SocketConnectionHandler {
    private readonly jwtService;
    private readonly logger;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
}
