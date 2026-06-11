import { RefreshTokenController } from "./refreshToken.controller";
import { SignInController } from "./signin.controller";
export declare const AuthController: (typeof SignInController | typeof RefreshTokenController)[];
