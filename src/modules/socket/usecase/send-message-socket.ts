import { Injectable } from '@nestjs/common';
import { SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class SocketMessageHandler {

  @SubscribeMessage('send-message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const user = client.data.user; // 👈 já autenticado na conexão
    console.log(`Mensagem de ${user.sub}:`, payload);

    // responde ao cliente
    client.emit('message-received', { ok: true });
  }
}