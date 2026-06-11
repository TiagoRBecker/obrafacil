"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const refreshToken_controller_1 = require("./refreshToken.controller");
const signin_controller_1 = require("./signin.controller");
exports.AuthController = [signin_controller_1.SignInController, refreshToken_controller_1.RefreshTokenController];
//# sourceMappingURL=index.js.map