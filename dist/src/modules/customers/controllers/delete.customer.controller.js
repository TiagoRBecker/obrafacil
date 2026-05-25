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
exports.DeleteCustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const customer_id_param_dto_1 = require("../dto/customer-id-param.dto");
const delete_customer_usecase_1 = require("../usecase/delete-customer.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let DeleteCustomerController = class DeleteCustomerController {
    constructor(deleteCustomerUseCase) {
        this.deleteCustomerUseCase = deleteCustomerUseCase;
    }
    delete(params) {
        return this.deleteCustomerUseCase.execute(params.id);
    }
};
exports.DeleteCustomerController = DeleteCustomerController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('customer:update'),
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Excluir cliente',
        description: 'Remove um cliente do sistema pelo seu ID. Requer permissão `customer:update` e papel ADMIN.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único do cliente a ser excluído', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente excluído com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente não encontrado.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_id_param_dto_1.CustomerIdParamDto]),
    __metadata("design:returntype", Promise)
], DeleteCustomerController.prototype, "delete", null);
exports.DeleteCustomerController = DeleteCustomerController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/customers'),
    __metadata("design:paramtypes", [delete_customer_usecase_1.DeleteCustomerUseCase])
], DeleteCustomerController);
//# sourceMappingURL=delete.customer.controller.js.map