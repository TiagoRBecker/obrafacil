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
exports.CreateSettingsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSettingsDto {
}
exports.CreateSettingsDto = CreateSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da empresa', example: 'Minha Empresa de Serviços' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Especialidade da empresa', example: 'Elétrica e Hidráulica' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone da empresa', example: '(11) 3000-0000' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9()+\-\s]+$/, {
        message: 'phone must contain only numbers, spaces or common phone symbols',
    }),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email da empresa', example: 'contato@minhaempresa.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Endereço da empresa', example: 'Rua Augusta, 500' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL do logo da empresa', example: 'https://minhaempresa.com/logo.png' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "logoUrl", void 0);
//# sourceMappingURL=create-settings-dto.js.map