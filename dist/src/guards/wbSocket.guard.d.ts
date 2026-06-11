import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class WsAdminGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
