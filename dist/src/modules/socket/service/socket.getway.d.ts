import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketConnectionHandler } from '../usecase/connection-socket';
import { SocketMessageHandler } from '../usecase/send-message-socket';
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly connectionHandler;
    private readonly messageHandler;
    server: Server;
    constructor(connectionHandler: SocketConnectionHandler, messageHandler: SocketMessageHandler);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: any): void;
}
