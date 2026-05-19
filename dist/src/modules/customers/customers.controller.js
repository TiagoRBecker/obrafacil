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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const customer_id_param_dto_1 = require("./dto/customer-id-param.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
const customers_service_1 = require("./customers.service");
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    create(body) {
        return this.customersService.create(body);
    }
    update(params, body) {
        return this.customersService.update(params.id, body);
    }
    delete(params) {
        return this.customersService.delete(params.id);
    }
    findAll() {
        return this.customersService.findAll();
    }
    findById(params) {
        return this.customersService.findById(params.id);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_id_param_dto_1.CustomerIdParamDto,
        update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_id_param_dto_1.CustomerIdParamDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_id_param_dto_1.CustomerIdParamDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findById", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('admin/customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map