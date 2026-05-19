"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvoModule = void 0;
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const common_1 = require("@nestjs/common");
const evo_api_client_1 = require("./infra/evo-api.client");
let EvoModule = class EvoModule {
};
exports.EvoModule = EvoModule;
exports.EvoModule = EvoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(config_2.evoConfig),
        ],
        providers: [evo_api_client_1.EvoApiClient],
        exports: [evo_api_client_1.EvoApiClient],
    })
], EvoModule);
//# sourceMappingURL=evo.module.js.map