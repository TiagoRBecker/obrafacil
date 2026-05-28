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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const id_param_dto_1 = require("../../../common/dto/id-param.dto");
const update_customer_dto_1 = require("../dto/update-customer.dto");
const update_customer_usecase_1 = require("../usecase/update-customer.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let UpdateCustomerController = class UpdateCustomerController {
    constructor(updateCustomerUseCase) {
        this.updateCustomerUseCase = updateCustomerUseCase;
    }
    update(params, body) {
        return this.updateCustomerUseCase.execute(params.id, body);
    }
};
exports.UpdateCustomerController = UpdateCustomerController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('customer:update'),
    (0, common_1.Patch)('update/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar cliente',
        description: 'Atualiza os dados de um cliente existente. Requer permissão `customer:update` e papel ADMIN.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único do cliente a ser atualizado', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiBody)({ type: update_customer_dto_1.UpdateCustomerDto, description: 'Dados atualizados do cliente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente atualizado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente não encontrado.' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_dto_1.IdParamDto,
        update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], UpdateCustomerController.prototype, "update", null);
exports.UpdateCustomerController = UpdateCustomerController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/customers'),
    __metadata("design:paramtypes", [update_customer_usecase_1.UpdateCustomerUseCase])
], UpdateCustomerController);
//# sourceMappingURL=update.customer.controller.js.map