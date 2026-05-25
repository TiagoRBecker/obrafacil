import { RefreshTokenController } from "./refreshToken.controller";
import { SignInController } from "./signin.controller";

export const AuthController = [RefreshTokenController, SignInController]