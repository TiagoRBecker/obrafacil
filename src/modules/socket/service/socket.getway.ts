import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketConnectionHandler } from '../usecase/connection-socket';
import { SocketMessageHandler } from '../usecase/send-message-socket';


@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly connectionHandler: SocketConnectionHandler,
    private readonly messageHandler: SocketMessageHandler,
  ) {}

  afterInit() {}

  handleConnection(client: Socket) {
    return this.connectionHandler.handleConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.connectionHandler.handleDisconnect(client);
  }

  // 👇 delega para o handler de mensagens
  @SubscribeMessage('send-message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    return this.messageHandler.handleMessage(client, payload);
  }
}