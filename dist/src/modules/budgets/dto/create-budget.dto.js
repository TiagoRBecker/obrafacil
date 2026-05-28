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
exports.CreateOrderDto = exports.TypeCharge = exports.OrderMaterialDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OrderMaterialDto {
}
exports.OrderMaterialDto = OrderMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do material', example: 'Cimento CP-II 50kg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], OrderMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unidade de medida', example: 'saco' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], OrderMaterialDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantidade', example: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderMaterialDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço unitário', example: 32.5 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderMaterialDto.prototype, "unitPrice", void 0);
var TypeCharge;
(function (TypeCharge) {
    TypeCharge["HORA"] = "hora";
    TypeCharge["DIARIA"] = "diaria";
    TypeCharge["SERVICO"] = "servico";
})(TypeCharge || (exports.TypeCharge = TypeCharge = {}));
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID do orçamento (gerado automaticamente se omitido)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do cliente', example: 'Maria Oliveira' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone do cliente', example: '(11) 99999-8888' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Endereço do serviço', example: 'Rua das Flores, 123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observações sobre o cliente ou serviço', example: 'Cliente referenciado pelo João' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor da hora de mão de obra', example: 85.0 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "valueHour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horas estimadas para o serviço', example: 40 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "estimatedHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de funcionários envolvidos', example: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "numberEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Título do orçamento', example: 'Reforma do banheiro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição detalhada do serviço', example: 'Reforma completa incluindo troca de revestimentos...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de cobrança', enum: TypeCharge, example: TypeCharge.SERVICO }),
    (0, class_validator_1.IsEnum)(TypeCharge),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "typeCharge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lista de materiais do orçamento', type: [OrderMaterialDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderMaterialDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "materials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de início do serviço', example: '2026-06-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "initDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de término do serviço', example: '2026-06-30' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do cliente associado', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de validade do orçamento', example: '2026-07-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "validityDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Desconto aplicado', example: 150.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observações finais', example: 'Orçamento válido por 30 dias' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "finalObservations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Valor da mão de obra (calculado automaticamente se não informado)', example: 3400.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "laborValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Valor dos materiais (calculado automaticamente se não informado)', example: 1200.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "materialValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Valor total do orçamento (calculado automaticamente se não informado)', example: 4450.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "totalValue", void 0);
//# sourceMappingURL=create-budget.dto.js.map