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
exports.PaginatedResponse = exports.PaginationParams = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaginationParams {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.PaginationParams = PaginationParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Número da página', default: 1, example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationParams.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Itens por página (máx. 100)', default: 10, example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], PaginationParams.prototype, "limit", void 0);
class PaginatedResponse {
}
exports.PaginatedResponse = PaginatedResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de registros', example: 50 }),
    __metadata("design:type", Number)
], PaginatedResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Página atual', example: 1 }),
    __metadata("design:type", Number)
], PaginatedResponse.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Itens por página', example: 10 }),
    __metadata("design:type", Number)
], PaginatedResponse.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de páginas', example: 5 }),
    __metadata("design:type", Number)
], PaginatedResponse.prototype, "totalPages", void 0);
//# sourceMappingURL=pagination.dto.js.map