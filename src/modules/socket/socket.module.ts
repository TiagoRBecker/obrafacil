import { Module } from '@nestjs/common';
import { SocketGateway } from './service/socket.getway';
import { SocketConnectionHandler } from './usecase/connection-socket';
import { SocketMessageHandler } from './usecase/send-message-socket';
import { JwtService } from '@nestjs/jwt';



@Module({
  providers: [
    SocketGateway,
    SocketConnectionHandler, 
    SocketMessageHandler,    
    JwtService,
  ],
})
export class SocketModule {}