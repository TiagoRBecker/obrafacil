import { Socket } from 'socket.io';
export declare class SocketMessageHandler {
    handleMessage(client: Socket, payload: any): void;
}
