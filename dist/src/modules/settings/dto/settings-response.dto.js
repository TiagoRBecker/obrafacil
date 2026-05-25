"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SettingsResponseDto {
}
exports.SettingsResponseDto = SettingsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único da configuração', example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da empresa', example: 'Minha Empresa de Serviços' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Especialidade da empresa', example: 'Elétrica e Hidráulica' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Telefone da empresa', example: '(11) 3000-0000' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email da empresa', example: 'contato@minhaempresa.com' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Endereço da empresa', example: 'Rua Augusta, 500' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL do logo da empresa', example: 'https://minhaempresa.com/logo.png' }),
    __metadata("design:type", String)
], SettingsResponseDto.prototype, "logoUrl", void 0);
//# sourceMappingURL=settings-response.dto.js.map