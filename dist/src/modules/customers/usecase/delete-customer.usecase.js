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
var DeleteCustomerUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_interface_1 = require("../repo/customer-repository.interface");
let DeleteCustomerUseCase = DeleteCustomerUseCase_1 = class DeleteCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.logger = new common_1.Logger(DeleteCustomerUseCase_1.name);
    }
    async execute(id) {
        this.logger.log(`Iniciando exclusão do cliente - ID: ${id}`);
        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer?.id) {
            this.logger.error(`Cliente não encontrado para exclusão - ID: ${id}`);
            throw new common_1.NotFoundException('Customer not found.');
        }
        await this.customerRepository.delete(id);
        this.logger.log(`Cliente excluído com sucesso - ID: ${id}`);
        return {
            id,
            deleted: true,
        };
    }
};
exports.DeleteCustomerUseCase = DeleteCustomerUseCase;
exports.DeleteCustomerUseCase = DeleteCustomerUseCase = DeleteCustomerUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repository_interface_1.CustomerRepositoryInterface])
], DeleteCustomerUseCase);
//# sourceMappingURL=delete-customer.usecase.js.map