import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class WsAdminGuard implements CanActivate {
  constructor(
   
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();

    const token = client.handshake.auth.token;

     console.log(token)

    

    return false;
  }
}