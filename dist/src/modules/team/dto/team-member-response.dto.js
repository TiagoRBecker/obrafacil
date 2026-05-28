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
exports.TeamMemberResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TeamMemberResponseDto {
}
exports.TeamMemberResponseDto = TeamMemberResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único do membro', example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], TeamMemberResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do membro', example: 'Pedro Santos' }),
    __metadata("design:type", String)
], TeamMemberResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cargo/função', example: 'Eletricista' }),
    __metadata("design:type", String)
], TeamMemberResponseDto.prototype, "jobTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email', example: 'pedro@exemplo.com' }),
    __metadata("design:type", String)
], TeamMemberResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Telefone', example: '(11) 97777-6666' }),
    __metadata("design:type", String)
], TeamMemberResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status do membro', example: 'active' }),
    __metadata("design:type", String)
], TeamMemberResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação do registro' }),
    __metadata("design:type", Date)
], TeamMemberResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data da última atualização' }),
    __metadata("design:type", Date)
], TeamMemberResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Orçamentos associados ao membro' }),
    __metadata("design:type", Array)
], TeamMemberResponseDto.prototype, "teamOrders", void 0);
//# sourceMappingURL=team-member-response.dto.js.map