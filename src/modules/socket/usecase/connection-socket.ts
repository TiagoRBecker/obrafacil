import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketConnectionHandler {
  private readonly logger = new Logger(SocketConnectionHandler.name);

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      client.data.user = payload;
      this.logger.log(`Conectado: ${client.id} | user: ${payload.sub}`);

    } catch {
      this.logger.warn(`Conexão recusada: ${client.id}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Desconectado: ${client.id}`);
  }
}